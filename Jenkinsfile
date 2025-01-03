pipeline {
    agent none
    stages {
        stage('Check out') {
            when {
                branch "main"
            }
            agent any
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/msssrp/tech-vibe']])
                stash includes: '**', name: 'source'
            }
        }
        stage('Check Eslint'){
            when {
                branch "main"
            }
            agent { label "node-agent"}
            steps{
                unstash 'source'
                sh '''
                    npm i && npm run lint
                '''
            }
        }
        stage('Build image & Push to dockerhub') {
            when {
                branch "main"
            }
            agent {
                kubernetes {
                    yaml """
                        apiVersion: v1
                        kind: Pod
                        spec:
                          containers:
                          - name: kaniko
                            image: gcr.io/kaniko-project/executor:debug
                            command:
                            - sleep
                            args:
                            - 999999
                            tty: true
                            volumeMounts:
                            - name: jenkins-docker-cfg
                              mountPath: /kaniko/.docker
                          volumes:
                          - name: jenkins-docker-cfg
                            secret:
                              secretName: docker-credentials
                              items:
                                - key: .dockerconfigjson
                                  path: config.json
                    """
                }
            }
            environment {
                TechVibe_env = credentials('TECHVIBE-ENV')
                BuildNumber = "${currentBuild.number}"
            }
            steps {
                unstash 'source'
                script {
                    container(name: 'kaniko', shell: '/busybox/sh') {
                        sh '''
                        #!/busybox/sh
                        /kaniko/executor --compressed-caching=false --skip-unused-stages --cache-run-layers=false --single-snapshot --build-arg=ENV_FILE="$(cat $TechVibe_env)" --dockerfile `pwd`/Dockerfile --context `pwd` --destination siripoom/techvibe:main$BuildNumber
                        '''
                    }
                }
            }
        }
        stage('Update TechVibe deployment manifest'){
            when {
                branch "main"
            }
            agent any
            environment {
                GIT_REPO_NAME = "techvibe-k8s-manifests"
                GIT_USER_NAME = "msssrp"
                BuildNumber = "${currentBuild.number}"
            }
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'git_credentials', url: "https://github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git"]]])
                script { 
                    withCredentials([usernamePassword(credentialsId: 'git_credentials', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USERNAME')]) {
                    sh '''
                        #!/bin/bash
                        git config user.email "siripoomcontact@gmail.com"
                        git config user.name "msssrp"
                        sed -i "s/techvibe:main[^ ]*/techvibe:main$BuildNumber/g" techvibe-namespace/techvibe-deployment.yaml
                        git add techvibe-namespace/techvibe-deployment.yaml
                        git commit -m "update: update techvibe image version to $BuildNumber"
                        git push https://${GIT_USER_NAME}:${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                    '''
                    }
                }
            }
        }
    }
}

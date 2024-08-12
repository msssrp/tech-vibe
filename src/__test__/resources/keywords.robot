*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot


*** Keywords ***
Open WebSite
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Login to Blog Site
    Click Element    id=btn-login
    Wait Until Page Contains Element    xpath=/html/body/div[2]/div/div/h1
    Click Element    xpath=/html/body/div[2]/div/div/div/button[1]
    Wait Until Page Contains Element    xpath=//*[@id="identifierId"]
    Input Text    xpath=//*[@id="identifierId"]    ${GOOGLE_USERNAME}    
    Click Element    xpath=//*[@id="identifierNext"]/div/button
    Wait Until Element Is Visible    xpath=//*[@id="password"]/div[1]/div/div[1]/input    
    Input Text    xpath=//*[@id="password"]/div[1]/div/div[1]/input    ${GOOGLE_PASSWORD}    
    Click Element    xpath=//*[@id="passwordNext"]/div/button
    Wait Until Page Contains Element    xpath=//*[@id="yDmH0d"]/c-wiz/div/div[3]/div/div/div[2]/div/div/button
    Click Button    xpath=//*[@id="yDmH0d"]/c-wiz/div/div[3]/div/div/div[2]/div/div/button
    Wait Until Page Contains Element    xpath=/html/body/div[1]/div[2]/div/div[1]/div[1]/div[2]/div[1]/button
    Sleep    5

Write Blog Post 
    [Documentation]    Fill in the blog post form with provided data
    Click Element    id=write-article
    Wait Until Page Contains    ${ALERT_TIPS_1}
    Wait Until Page Contains    ${ALERT_TIPS_2}
    Wait Until Page Contains    ${ALERT_TIPS_3}
    Wait Until Page Contains    ${ALERT_TIPS_4}
    Wait Until Page Contains Element     id=input-title
    Input Text    id=input-title    ${BLOG_TITLE}
    Wait Until Page Contains Element     id=input-description
    Input Text    id=input-description    ${BLOG_DESCRIPTION}
    Click Element    xpath=//*[@id="tinymce"]
    Wait Until Page Contains Element     xpath=//*[@id="tinymce"]
    Input Text    xpath=//*[@id="tinymce"]    ${BLOG_CONTENT}
    Choose File    xpath=//input[@name='image']    ${BLOG_IMAGE_PATH}
    # Input Text    xpath=//textarea[@name='content']    ${BLOG_CONTENT}
    # Input Text    id=input-tag    ${BLOG_TAGS}
    # Wait Until Page Contains    ${BALERT_STATUS}    10s

Blog title
    [Documentation]    Fill out the blog post form in the post title section.
    Wait Until Page Contains Element     id=input-title
    Input Text    id=input-title    ${BLOG_TITLE}

Blog description
    [Documentation]    Fill out the blog post form in the post description section.
    Wait Until Page Contains Element     id=input-description
    Input Text    id=input-description    ${BLOG_DESCRIPTION}


    
# Publish Blog Post
#     [Documentation]    Click the publish button to publish the blog post
#     Click Button    xpath=//button[@type='submit' and text()='Publish']
#     Wait Until Page Contains    ${ALERT_PUBLISH}
#     Wait Until Page Contains    ${BLOG_TITLE}
#     Wait Until Page Contains    Pending articles    

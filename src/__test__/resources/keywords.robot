*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot


*** Keywords ***
Open WebSite
    [Documentation]    Open the specified website and maximize the browser window.
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Login to Blog Site
    [Documentation]    Log in to the blog site using Google credentials.
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

Blog Tags
    [Documentation]    Fill out the blog post form in the post tags section.
    Wait Until Page Contains Element     id=input-tag
    Input Text    id=input-description    ${BLOG_TAGS}

Publish Blog Post
    [Documentation]    Click the publish button to publish the blog post
    Sleep    5
    Wait Until Page Contains    ${ALERT_STATUS}
    Click Button    id=btn-publish
    Wait Until Page Contains    ${ALERT_PUBLISH}

Go To Proflie
    [Documentation]    Navigate to the user profile page.
    Click Element    id=icon-user-profile
    Wait Until Page Contains Element    id=profile
    Click Element    id=profile
    Sleep    2

Go To Blog Post
    [Documentation]    Navigate to the specific blog post by title.
    Wait Until Page Contains Element    id=title-article
    Sleep    10
    Click Element    id=title-article
    Sleep    10

Edit Blog Post
    [Documentation]    Edit the existing blog post and republish it.
    Wait Until Page Contains Element    id=edit-article 
    Click Element    id=edit-article
    Wait Until Page Contains Element    id=input-title
    Clear Element Text    id=input-title
    Input Text    id=input-title    ${BLOG_TITLE_EDTE}


Go To Manage articles
    Click Element    id=icon-user-profile
    Wait Until Page Contains Element    id=profile
    Click Element    id=manage-articles
    Sleep    2

Post inprogress
    Click Element    xpath=/html/body/div[3]/div[1]/div[2]/div/div[2]/div[2]/div/div[2]/div/button[3]


    
# Publish Blog Post
#     [Documentation]    Click the publish button to publish the blog post
#     Click Button    xpath=//button[@type='submit' and text()='Publish']
#     Wait Until Page Contains    ${ALERT_PUBLISH}
#     Wait Until Page Contains    ${BLOG_TITLE}
#     Wait Until Page Contains    Pending articles    

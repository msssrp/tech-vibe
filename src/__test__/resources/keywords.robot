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
    Wait Until Page Contains    ${ALERT_TIPS_1}
    Wait Until Page Contains    ${ALERT_TIPS_2}
    Wait Until Page Contains    ${ALERT_TIPS_3}
    Wait Until Page Contains    ${ALERT_TIPS_4}
    Wait Until Page Contains Element     id=input-title
    Input Text    id=input-title    ${BLOG_TITLE}
    Wait Until Page Contains Element     id=input-description
    Input Text    id=input-description    ${BLOG_DESCRIPTION}
    Sleep    5
    Input Text    xpath=//*[@id="tiny-test"]    test
    Click Element    xpath=//*[@id="tinymce"]
    Wait Until Page Contains Element     xpath=//*[@id="tinymce"]
    # Select Frame    //iframe
    Input Text    xpath=//*[@id=tinymce]    ${BLOG_CONTENT}
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

Go To Manage article
    [Documentation]    
    Click Element    id=icon-user-profile
    Wait Until Page Contains Element    id=manage-article
    Click Element    id=manage-article
    Sleep    5

Go To Blog Post
    Wait Until Page Contains Element    id=title-article
    Sleep    8
    Click Element    id=title-article
    Sleep    8

Edit Blog Post
    Wait Until Page Contains Element    id=edit-article 
    Click Element    id=edit-article
    Sleep    15
    Wait Until Page Contains Element    id=input-title
    Clear Element Text    id=input-title
    Input Text    id=input-title    ${BLOG_TITLE_EDTE}
    Sleep    15
    Click Button    id=btn-publish
    Sleep    2

Failed to edit blog post
    Wait Until Page Contains Element    id=edit-article 
    Click Element    id=edit-article
    Sleep    15
    Wait Until Page Contains Element    id=input-title
    Clear Element Text    id=input-title
    Sleep    15
    Click Button    id=btn-publish
    Sleep    2

Post inprogress
    Click Element    xpath=/html/body/div[3]/div[1]/div[2]/div/div[2]/div[2]/div/div[2]/div/button[3]

Articles to be published
    Click Element    xpath=/html/body/div[2]/div[1]/div[2]/div/div[2]/div[2]/div/div[1]/button
    Click Element    xpath=/html/body/div[3]/div/p/div/button[1]
    Sleep    3
    Click Element    xpath=/html/body/div[2]/div[1]/div[2]/div/div[2]/div[2]/div/table/tbody/tr[1]/td[2]/a
    Sleep    5

Approving the article
    Click Element    id=btn-approve

Confirming the approval of the article
    Wait Until Page Contains Element    id=btn-confirm-approve
    Click Element    id=btn-confirm-approve
    Sleep    3

Cancellation of approval confirmation
    Wait Until Page Contains Element    id=btn-cancel-approve
    Click Element    id=btn-cancel-approve 
    Sleep    2

Article disapproval
    Click Element    id=btn-disapprove

Confirmation of disapproval of article
    Wait Until Page Contains Element    id=btn-confirm-disapprove
    Click Element    id=btn-confirm-disapprove
    Sleep    1
 

Enter the reason for disapproval
    Input Text    id=textarea-disapprove    The article contains inappropriate language.


Cancellation of disapproval
    Wait Until Page Contains Element    id=btn-cancel-disapprove
    Click Element    id=btn-cancel-disapprove
    Sleep    1

Choosing a tag

    Click Element    xpath=/html/body/div[1]/div[2]/div/div[1]/div[1]/div[1]
    Click Element    xpath=/html/body/div[1]/div[2]/div/div[1]/div[1]/div[1]/ul/button[12]/p
    Sleep    5
    Click Element    xpath=/html/body/div[1]/div[2]/div/div[1]/div[1]
    Click Element    id=title-article
    Sleep    5

Input search
    Input Text    id=Input-search    ${BLOG_TITLE2}
    Press Keys    id=Input-search    ENTER
    Sleep    5
    Click Element    xpath=/html/body/div[1]/div[2]/div/div[2]/div/div[2]/a
    Sleep    5

Delete article
    Click Element    id=delete-btn
    Wait Until Page Contains Element    xpath=/html/body/div[4]/div/div/div[2]/section/div/div/button
    Click Element    xpath=/html/body/div[4]/div/div/div[2]/section/div/div/button
    Sleep    2

Fail delete article    
    Click Element    id=delete-btn
    Wait Until Page Contains Element    xpath=/html/body/div[4]/div/div/div[2]/section/div/div/button
    Click Element    xpath=/html/body/div[4]/div/div/div[2]/section/header/button
    Sleep    2
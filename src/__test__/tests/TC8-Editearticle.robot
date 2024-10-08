*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot


*** Test Cases ***
TC8008 Edit Article Successfully
    [Documentation]    This test case verifies that a user can successfully edit and save changes to an article.
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Edit Blog Post
    Check alert post publish
    Capture Page Screenshot    screenshots/Editarticle/TC8008.png

TC8009 Edit Article Failed Due to Incomplete Title
    [Documentation]    This test case verifies that an article cannot be edited and saved if the title is incomplete or missing.
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Failed to edit blog post
    Check alert fails publish
    Capture Page Screenshot    screenshots/Editarticle/TC8009.png


*** Keywords ***
Check alert fails publish
    Page Should Contain    ${ALERT_PERROR}
    Sleep    2
Check alert post publish
    Page Should Contain    ${ALERT_PUBLISHPOST} 
    Sleep    3
    

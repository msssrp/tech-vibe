*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot



*** Test Cases ***
TC2001 View Article on Profile Page
    [Documentation]    Verify that a user can view an article from their profile page.
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2001.png


TC2002 View Article via Search 
    [Documentation]    Verify that a user can view an article by searching for it.
    Open WebSite
    Login to Blog Site
    Input search
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2002.png


TC2003 View Article via Tag
    [Documentation]    Verify that a user can view an article by selecting a tag.
    Open WebSite
    Login to Blog Site
    Choosing a tag
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2003.png


TC2004 View Article via Direct URL
    [Documentation]    Verify that a user can view an article by accessing its direct URL.
    Open Browser    ${URL_POST}    ${BROWSER}
    Maximize Browser Window
    Sleep    5
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2004.png


*** Keywords ***
Check Title blog  
    Page Should Contain    ${BLOG_TITLE2}
    Sleep    2




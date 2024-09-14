*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot

*** Variables ***
${URL_POST}    http://localhost:3000/044-Arpapat-Yipram/The-Role-and-Workflow-of-a-Business-Analyst-647abeb1
${BLOG_TITLE2}    The Role and Workflow of a Business Analyst


*** Test Cases ***
TC2001 Viewsrticle
    [Documentation]    View article on profile page 
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2001.png


TC2002 Viewsrticle
    [Documentation]    View article by direct URL
    Open Browser    ${URL_POST}    ${BROWSER}
    Maximize Browser Window
    Sleep    5
    Check Title blog
    Capture Page Screenshot    screenshots/Viwearticle/TC2002.png



*** Keywords ***
Check Title blog  
    Page Should Contain    ${BLOG_TITLE2}
    Sleep    2




*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot

*** Test Cases ***
TC80010 Successfully deleted article
    [Documentation]    This test case verifies that a user is able to successfully delete an article from their blog by confirming the deletion process.
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Delete article
    Check alert delete
    Capture Page Screenshot    screenshots/Deletearticle/TC80010.png

TC8011 Failed to delete the article due to not confirming.
    [Documentation]  This test case verifies that the deletion process fails if the user does not confirm the deletion action when prompted.  
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Fail delete article  
    Check alert fail delete  
    Capture Page Screenshot    screenshots/Deletearticle/TC80011.png

*** Keywords ***
Check alert delete
    Page Should Contain    ${ALERT_DELETEPOST}
    Sleep    2

Check alert fail delete
    Page Should Not Contain Element    xpath=/html/body/div[4]/div/div/div[2]/section/div/div/button
    Sleep    2
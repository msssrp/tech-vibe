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
    


TC80010 Failed to delete the article due to not confirming.
    [Documentation]  This test case verifies that the deletion process fails if the user does not confirm the deletion action when prompted.  
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
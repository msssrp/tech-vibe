*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot


*** Test Cases ***
TC8008 Edit article success
    [Documentation]    Edit article success 
    Open WebSite
    Login to Blog Site
    Go To Proflie
    Go To Blog Post
    Edit Blog Post
    Publish Blog Post


*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot




*** Test Cases ***
Write and Publish Blog Post
    [Documentation]    Test case for writing and publishing a blog post and verifying it in article pending
    Open WebSite
    Login to Blog Site
    Write Blog Post

*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot



*** Test Cases ***
TC8001 Create Article Successfully
    [Documentation]    This test case verifies that a user can successfully create and publish an article with all required fields.
    Open WebSite
    Login to Blog Site
    Write Blog Post

# TC8002 Create Article Without Title
#     [Documentation]    This test case verifies that an article cannot be created without entering a title.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post

# TC8003 Create Article Without Description
#     [Documentation]    This test case verifies that an article cannot be created without entering a description.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post

# TC8004 Create Article Without Image
#     [Documentation]    This test case verifies that an article can still be created without adding an image, but a warning message may be shown.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post

# TC8005 Create Article Without Content
#     [Documentation]    This test case verifies that an article cannot be created without entering content.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post

# TC8006 Create Article Without Tags
#     [Documentation]    This test case verifies that an article can still be created without tags, but a warning message may be shown.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post

# TC8007 Create Article Without Publishing
#     [Documentation]    This test case verifies that an article can be saved as a draft if the user does not click the "Publish" button.
#     Open WebSite
#     Login to Blog Site
#     Write Blog Post
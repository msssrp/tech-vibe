*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot

*** Test Cases ***
TC14003 Manage Article Disapproval
    [Documentation]    This test case verifies that a user can disapprove an article successfully.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Enter the reason for disapproval
    Confirmation of disapproval of article

TC14004 Manage Article Disapproval Without Reason
    [Documentation]    This test case verifies that the article cannot be disapproved if no reason for disapproval is provided.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Confirmation of disapproval of article
    

TC14005 Manage Article Disapproval Cancelled
    [Documentation]    This test case verifies that the disapproval process is cancelled when the user clicks the "Cancel" button.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Enter the reason for disapproval
    Cancellation of disapproval

*** Keywords ***
check alert
    Sleep    2
    Page Should Contain    Please fill out this field
*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot

*** Test Cases ***


TC14004 Manage Article Disapproval Without Reason
    [Documentation]    This test case verifies that the article cannot be disapproved if no reason for disapproval is provided.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Confirmation of disapproval of article
    check alert Without Reason
    Capture Page Screenshot    screenshots/ArticleDisapproval/TC14002.png
    

TC14005 Manage Article Disapproval Cancelled
    [Documentation]    This test case verifies that the disapproval process is cancelled when the user clicks the "Cancel" button.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Enter the reason for disapproval
    Cancellation of disapproval
    Check the confirmation of the disapproval cancellation
    Capture Page Screenshot    screenshots/ArticleDisapproval/TC14003.png

TC14003 Manage Article Disapproval
    [Documentation]    This test case verifies that a user can disapprove an article successfully.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Article disapproval
    Enter the reason for disapproval
    Confirmation of disapproval of article
    check alert Article Disapproval
    Capture Page Screenshot    screenshots/ArticleDisapproval/TC14001.png

*** Keywords ***
check alert Article Disapproval
    Page Should Contain    ${ALERT_DISAPPROVE}
    Sleep    2
check alert Without Reason
    Page Should Contain    ${ALERT_DISAPPROVE_WithoutReason}

Check the confirmation of the disapproval cancellation
    Page Should Not Contain Element    id=btn-cancel-disapprove
    Sleep    2
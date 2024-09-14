*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Settings ***
Resource    ../resources/variables.robot
Resource    ../resources/keywords.robot
Resource    TC14-ArticleDisapproval.robot

*** Test Cases ***
# TC14001 Approve Article Successfully
#     [Documentation]    This test case verifies that a user can successfully approve an article in the system.
#     Open WebSite
#     Login to Blog Site
#     Go To Manage article
#     Articles to be published
#     Approving the article
#     Confirming the approval of the article
#     Check alert publish
#     Capture Page Screenshot    screenshots/ArticleApproval/TC14001.png

TC14002 Manage Article Approval Cancelled
    [Documentation]    This test case verifies that the approval process is cancelled when the user clicks the "Cancel" button.
    Open WebSite
    Login to Blog Site
    Go To Manage article
    Articles to be published
    Approving the article
    Cancellation of approval confirmation
    Capture Page Screenshot    screenshots/ArticleApproval/TC14002.png


*** Keywords ***
Capture Screenshot with Folder
    Sleep    1
    SeleniumLibrary.Capture Page Screenshot    screenshots/TC14001 Approve.png

Check alert publish
    Page Should Contain    ${ALERT_PUBLISH}
    Sleep    2
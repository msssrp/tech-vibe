*** Settings ***
Library     SeleniumLibrary
Library    XML

*** Variables ***
${BROWSER}          Chrome
${URL}              http://localhost:3000
${GOOGLE_USERNAME}         644259044@webmail.npru.ac.th
${GOOGLE_PASSWORD}         1739902024001
${GITHUB_USERNAME}         Arpapatzamak54321@gmail.com
${GITHUB_PASSWORD}         Aon0972982140

${BLOG_TITLE}    การใช้ Figma ในการออกแบบ UX/UI
${BLOG_TITLE_EDTE}    การใช้ Figma ในการออกแบบ UX/UI V.2
${BLOG_DESCRIPTION}    ในโลกของการออกแบบดิจิทัลที่เติบโตอย่างรวดเร็วในปัจจุบัน การมีเครื่องมือที่สามารถช่วยให้นักออกแบบทำงานได้อย่างมีประสิทธิภาพและรวดเร็วนั้นเป็นสิ่งที่สำคัญ Figma เป็นหนึ่งในเครื่องมือเหล่านั้นที่ได้รับความนิยมอย่างมาก โดยเฉพาะในการออกแบบ UX/UI
${BLOG_IMAGE_PATH}    https://www.brasilcode.com.br/wp-content/uploads/2024/02/figma.jpg
${BLOG_CONTENT}    Figma คืออะไร? Figma เป็นเครื่องมือออกแบบที่ทำงานบนคลาวด์ (cloud-based) ซึ่งช่วยให้นักออกแบบสามารถสร้างและปรับแต่งการออกแบบได้อย่างรวดเร็ว และที่สำคัญยังสามารถทำงานร่วมกับทีมได้แบบเรียลไทม์ ไม่ว่าจะอยู่ที่ไหนในโลกก็ตาม การทำงานแบบร่วมมือกันนี้ช่วยลดข้อผิดพลาดและเพิ่มความสะดวกในการสื่อสารระหว่างนักออกแบบ นักพัฒนา และผู้มีส่วนเกี่ยวข้องอื่น ๆ คุณสมบัติที่สำคัญของ Figma 1.การทำงานร่วมกันแบบเรียลไทม์: Figma ช่วยให้ทีมสามารถทำงานร่วมกันได้แบบเรียลไทม์ ทุกคนสามารถเห็นการเปลี่ยนแปลงที่เกิดขึ้นในขณะเดียวกัน ซึ่งทำให้การทำงานเป็นทีมเป็นไปได้อย่างราบรื่นและมีประสิทธิภาพมากขึ้น 2.การออกแบบบนคลาวด์: เนื่องจาก Figma ทำงานบนคลาวด์ นักออกแบบสามารถเข้าถึงงานออกแบบของตนเองได้ทุกที่ทุกเวลา ไม่ต้องกังวลเกี่ยวกับการบันทึกหรือการส่งไฟล์ไปมา 3.การใช้งานง่าย: อินเตอร์เฟซของ Figma ถูกออกแบบมาให้ใช้งานง่าย แม้กระทั่งผู้ที่เพิ่งเริ่มต้นใช้งานก็สามารถเรียนรู้และใช้งานได้อย่างรวดเร็ว 4.	การสร้างโปรโตไทป์: Figma มีฟีเจอร์การสร้างโปรโตไทป์ที่ช่วยให้นักออกแบบสามารถสร้างและทดสอบอินเตอร์แอคชั่นต่าง ๆ ของเว็บไซต์หรือแอปพลิเคชันได้อย่างง่ายดาย 5.การปรับแต่งและการออกแบบที่มีความยืดหยุ่น: Figma มีเครื่องมือและฟีเจอร์ที่ช่วยให้นักออกแบบสามารถปรับแต่งงานออกแบบได้อย่างหลากหลาย ตั้งแต่การสร้าง UI ไปจนถึงการจัดการกับสไตล์และการตั้งค่าต่าง ๆ
${BLOG_TAGS}    ux/ui

${ALERT_TIPS_1}    Article tips 
${ALERT_TIPS_2}    Article tips 
${ALERT_STATUS}    Article ti
${ALERT_PUBLISH}    Your article is published
${ALERT_PERROR}    Error Title , Description , Image cover , Content , Tags are required please make sure you dont forget any of these



*** Test Cases ***
TC8008 Edit article success
    [Documentation]    Edit article success 
    Open WebSite
    Login to Blog Site
    Go To Blog Post
    Edit Blog Post


*** Keywords ***
Open WebSite
    Open Browser    ${URL}    ${BROWSER}

Login to Blog Site
    Click Element    id=btn-login
    Wait Until Page Contains Element    xpath=/html/body/div[2]/div/div/h1
    Click Element    xpath=/html/body/div[2]/div/div/div/button[1]
    Wait Until Page Contains Element    xpath=//*[@id="identifierId"]
    Input Text    xpath=//*[@id="identifierId"]    ${GOOGLE_USERNAME}    
    Click Element    xpath=//*[@id="identifierNext"]/div/button
    Wait Until Element Is Visible    xpath=//*[@id="password"]/div[1]/div/div[1]/input    
    Input Text    xpath=//*[@id="password"]/div[1]/div/div[1]/input    ${GOOGLE_PASSWORD}    
    Click Element    xpath=//*[@id="passwordNext"]/div/button
    Wait Until Page Contains Element    xpath=//*[@id="yDmH0d"]/c-wiz/div/div[3]/div/div/div[2]/div/div/button
    Click Button    xpath=//*[@id="yDmH0d"]/c-wiz/div/div[3]/div/div/div[2]/div/div/button
    Wait Until Page Contains Element    xpath=/html/body/div[1]/div[2]/div/div[1]/div[1]/div[2]/div[1]/button
    Sleep    5    

Go To Blog Post
    Click Element    id=icon-user-profile
    Wait Until Page Contains Element    id=profile
    Click Element    id=profile
    Sleep    2
    Wait Until Page Contains Element    id=title-article
    Sleep    5
    Click Element    id=title-article
    Sleep    3

Edit Blog Post
    Wait Until Page Contains Element    id=edit-article 
    Click Element    id=edit-article
    Wait Until Page Contains Element    id=input-title
    Input Text    id=input-title    ${BLOG_TITLE_EDTE}
    Sleep    3
    Wait Until Page Contains    ${ALERT_STATUS}
    Sleep    10
    
    Click Element    id=btn-publish

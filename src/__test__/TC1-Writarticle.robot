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
${BLOG_DESCRIPTION}    ในโลกของการออกแบบดิจิทัลที่เติบโตอย่างรวดเร็วในปัจจุบัน การมีเครื่องมือที่สามารถช่วยให้นักออกแบบทำงานได้อย่างมีประสิทธิภาพและรวดเร็วนั้นเป็นสิ่งที่สำคัญ Figma เป็นหนึ่งในเครื่องมือเหล่านั้นที่ได้รับความนิยมอย่างมาก โดยเฉพาะในการออกแบบ UX/UI
${BLOG_IMAGE_PATH}    https://www.brasilcode.com.br/wp-content/uploads/2024/02/figma.jpg
${BLOG_CONTENT}    Figma คืออะไร? Figma เป็นเครื่องมือออกแบบที่ทำงานบนคลาวด์ (cloud-based) ซึ่งช่วยให้นักออกแบบสามารถสร้างและปรับแต่งการออกแบบได้อย่างรวดเร็ว และที่สำคัญยังสามารถทำงานร่วมกับทีมได้แบบเรียลไทม์ ไม่ว่าจะอยู่ที่ไหนในโลกก็ตาม การทำงานแบบร่วมมือกันนี้ช่วยลดข้อผิดพลาดและเพิ่มความสะดวกในการสื่อสารระหว่างนักออกแบบ นักพัฒนา และผู้มีส่วนเกี่ยวข้องอื่น ๆ คุณสมบัติที่สำคัญของ Figma 1.การทำงานร่วมกันแบบเรียลไทม์: Figma ช่วยให้ทีมสามารถทำงานร่วมกันได้แบบเรียลไทม์ ทุกคนสามารถเห็นการเปลี่ยนแปลงที่เกิดขึ้นในขณะเดียวกัน ซึ่งทำให้การทำงานเป็นทีมเป็นไปได้อย่างราบรื่นและมีประสิทธิภาพมากขึ้น 2.การออกแบบบนคลาวด์: เนื่องจาก Figma ทำงานบนคลาวด์ นักออกแบบสามารถเข้าถึงงานออกแบบของตนเองได้ทุกที่ทุกเวลา ไม่ต้องกังวลเกี่ยวกับการบันทึกหรือการส่งไฟล์ไปมา 3.การใช้งานง่าย: อินเตอร์เฟซของ Figma ถูกออกแบบมาให้ใช้งานง่าย แม้กระทั่งผู้ที่เพิ่งเริ่มต้นใช้งานก็สามารถเรียนรู้และใช้งานได้อย่างรวดเร็ว 4.	การสร้างโปรโตไทป์: Figma มีฟีเจอร์การสร้างโปรโตไทป์ที่ช่วยให้นักออกแบบสามารถสร้างและทดสอบอินเตอร์แอคชั่นต่าง ๆ ของเว็บไซต์หรือแอปพลิเคชันได้อย่างง่ายดาย 5.การปรับแต่งและการออกแบบที่มีความยืดหยุ่น: Figma มีเครื่องมือและฟีเจอร์ที่ช่วยให้นักออกแบบสามารถปรับแต่งงานออกแบบได้อย่างหลากหลาย ตั้งแต่การสร้าง UI ไปจนถึงการจัดการกับสไตล์และการตั้งค่าต่าง ๆ
${BLOG_TAGS}    ux/ui

${ALERT_TIPS_1}    Article tips 
${ALERT_TIPS_2}    Article tips Every 5 second When you stop typing the article will automatically saved whether on draft or saved status
${BALERT_STATUS}    Article Status Your article 8 เทคนิค ใช้ Figma ทำ UI Design ให้ง่ายขึ้น has been saved as draft 
${ALERT_PUBLISH}    Your article is published
${ALERT_PERROR}    Error Title , Description , Image cover , Content , Tags are required please make sure you dont forget any of these



*** Test Cases ***
Write and Publish Blog Post
    [Documentation]    Test case for writing and publishing a blog post and verifying it in article pending
    Open WebSite
    Login to Blog Site
    Write Blog Post

    
# *** Test Cases ***
#  Search Google and Verify Results
#     [Documentation]    Test case for SignIn Github
#     Open WebSite
#     Verify SignIn Github


*** Keywords ***
Open WebSite
    Open Browser    ${URL}    ${BROWSER}

Login to Blog Site
    Click Element    id=btn_login
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
    Click Element    id=write-article
    

Write Blog Post
    [Documentation]    Fill in the blog post form with provided data
    Wait Until Page Contains    ${ALERT_TIPS_1}
    # Wait Until Page Contains    ${ALERT_TIPS_2}
    Sleep    5
    Wait Until Page Contains Element    id=
    # Input Text    id=input-title    ${BLOG_TITLE}
    # Input Text    xpath=//textarea[@name='description']    ${BLOG_DESCRIPTION}
    # Choose File    xpath=//input[@name='image']    ${BLOG_IMAGE_PATH}
    # Input Text    xpath=//textarea[@name='content']    ${BLOG_CONTENT}
    # Input Text    xpath=//input[@name='tags']    ${BLOG_TAGS}

Publish Blog Post
    [Documentation]    Click the publish button to publish the blog post
    Click Button    xpath=//button[@type='submit' and text()='Publish']
    Wait Until Page Contains    ${ALERT_PUBLISH}
    Wait Until Page Contains    ${BLOG_TITLE}
    Wait Until Page Contains    Pending articles    

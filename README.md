## Tech Vibe

#### Folder Structure

##### app

    * ไว้สำหรับการจัดการ route ต่างๆของ nextjs อย่างเช่น app/SignIn/page.tsx = http://localhost:3000/SignIn
        * ถ้า folder ไหนมี () ครอบอยู่อย่างเช่น (main) nextjs จะ ignore folder นั้นและจะไม่ route folder นั้นไปที่ url ช่วยในการจัดการไฟล์ของส่วนต่าง

##### componenets

    * จัดการกับ components ต่างๆ แยกหมวดหมู่ด้วย

##### libs [supabase](https://supabase.com/)

    * ใช้สำหรับการจัดการ api ต่างๆและจัดเก็บ supabase api ไว้เรียกใช้ query api ต่างๆ

##### store [Zustand](https://zustand-demo.pmnd.rs/)

    * จะใช้ Zustand ในการจัดการ State Management สำรหับส่วนๆ่างๆ

##### types

    * ไว้เก็บ type Props ต่างๆของแต่ละ componets หรือแต่ละ function

'use client'
import React, { useEffect, useState } from "react";
interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
}
// Mockup data for tags
const tags = [
  { tag_id: 1, tag_name: "database", tag_color: "bg-pink-300" },
  { tag_id: 2, tag_name: "UX/UI", tag_color: "bg-yellow-400" },
  { tag_id: 3, tag_name: "Tester", tag_color: "bg-blue-400" },
  { tag_id: 4, tag_name: "Development", tag_color: "bg-green-400" },
];

const PopularArticles = () => {
  // ใช้ Type Assertion <Article[]> เพื่อระบุชนิดของข้อมูลใน state articles ว่าเป็น array ของ object ประเภท Article
  const [articles, setArticles] = useState<Article[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  // ฟังก์ชัน fetchData เป็นการดึงข้อมูลด้วยการใช้ FetchAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        // โดยตอนนี้จะดึงมาจากไฟล์ Mokup Data ที่เตรียมไว้
        const response = await fetch("/articleslist.json");
        // แปลงข้อมูลจาก JSON เป็น obj || Article[] คือประเภทของตัวแปร data 
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.log("Error fetching data : ", error);
      }
    };
    fetchData();
  }, []);

   // totalPages เป็นฟังก์ชันที่จะคำนวณจำนวนหน้าทั้งหมด โดยใช้ method ceil จะปัดเศษเลขทศนิยมขึ้นไปเป็นจำนวนเต็ม
   const totalPages = Math.ceil(articles.length / itemsPerPage);

  // sliceArticles เป็นฟังก์ชันที่แบ่ง articles ออกเป็นส่วนๆ
  const sliceArticles = () => {
    // startIndex เป็นการคำนวณจาก currentPage - 1 * itemsPerPage
    // ทำไมต้อง -1 เพราะเป็นการปรับค่าเริ่มต้นให้เริ่มที่ 0
    // ทำไมต้อง * itemsPerPage เพราะเป็นการคำนวณค่าเริ่มต้นของ articles บนหน้าปัจจุบัน
    const startIndex = (currentPage - 1) * itemsPerPage;
    // endIndex เป็นการคำนวณค่า minimum ของ startIndex + itemsPerPage และ articles.length
    const endIndex = Math.min(startIndex + itemsPerPage, articles.length);
    // และ return เป็น array articles ที่ใช้ method slice ที่ใช้สำหรับแบ่ง array ออกเป็นส่วนย่อย โดยเริ่มจาก startIndex จนถึง endIndex
    return articles.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto">
      <div className="sm:mt-8 py-10">
        <div className="sm:ml-5 lg:ml-20">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left">
            Popular articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 sm:px-12 lg:px-40 xl:px-72 drop-shadow-md">
          {sliceArticles().map((article, index) => (
            <div key={index} className="flex justify-center cursor-pointer">
              <div className="card card-compact w-80 sm:w-[30rem] h-96 bg-base-100 drop-shadow-sm rounded-t-[50px] rounded-md border">
                <figure>
                  <img
                    src={article.image}
                    alt="Article"
                    className="w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <span className="space-x-1 line-clamp-1">
                    {tags.map((tag) => (
                      <div
                        key={tag.tag_id}
                        className={`badge ${tag.tag_color} text-white py-3`}
                      >
                        {tag.tag_name}
                      </div>
                    ))}
                  </span>
                  <h2 className="card-title">{article.title}</h2>
                  <p className="line-clamp-2">{article.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="avatar items-center">
                      <div className="w-8 rounded-full">
                        <img
                          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          alt="Author"
                        />
                      </div>
                      <p className="ml-2">{article.author}</p>
                    </div>
                    <a className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 stroke-blue-500"
                      >
                        <path d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
           {/* ใช้ Array.from เพื่อสร้าง array ของปุ่มตามจำนวนหน้าทั้งหมด และทำการวนลูป array ของปุ่ม */}
           {Array.from({ length: totalPages }, (_, index) => (
            <button
              // ทำไมถึงกำหนด key เป็น index + 1 เพราะช่วยให้ React อัปเดต UI ได้อย่างมีประสิทธิภาพและปุ่มแต่ละปุ่มมี key ที่ไม่ซ้ำกัน
              key={index + 1}
              className={`mr-2 w-12 h-[5px] rounded-full ${
                index + 1 === currentPage ? "bg-red" : "bg-[#C8C2C2]"
              }`}
              // เมื่อกดปุ่มฟังก์ชัน setCurrentPage(index + 1) จะถูกเรียกและจะอัพเดท state currentPage เป็นหมายเลขหน้า
              onClick={() => setCurrentPage(index + 1)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularArticles;

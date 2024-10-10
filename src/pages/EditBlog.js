import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams(); // ดึง id จาก URL parameter
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true); // state สำหรับสถานะการดึงข้อมูล


    const listCategory = [
        { id:1, cateName: "ความรู้"},
        { id:2, cateName: "บันเทิง"},
        { id:3, cateName: "กีฬา"},
        { id:4, cateName: "ศิลปะ"},
        { id:5, cateName: "วิทยาศาสตร์"},
        { id:6, cateName: "สุขภาพ"},
        { id:7, cateName: "อื่นๆ"},        
    ];
    // ฟังก์ชันดึงข้อมูลบล็อกตาม id
    const getBlogById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/post/${id}`);
            const { title, detail, category } = response.data;
            setTitle(title);
            setDetail(detail);
            setCategory(category);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blog data: ", error);
            setLoading(false);
        }
    };

    // ดึงข้อมูลบล็อกเมื่อโหลดหน้า Component
    useEffect(() => {
        getBlogById();
    }, []);

    // ฟังก์ชันสำหรับการบันทึกการแก้ไขบล็อก
    const handleSave = async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า

        try {
            await axios.put(`http://localhost:4000/post/${id}`, {
                title,
                detail,
                category,
            });
            alert("บันทึกการแก้ไขเรียบร้อย");
            navigate('/myblog');
        } catch (error) {
            console.error("Error updating blog: ", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    if (loading) return <div>กำลังโหลดข้อมูล...</div>;

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">แก้ไขโพสต์</h2>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        ชื่อเรื่อง
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        หมวดหมู่
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} // อัปเดตค่าของ category เมื่อเลือก option ใหม่
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {/* สร้าง option จาก listCategory */}
                        {listCategory.map((cate) => (
                            <option key={cate.id} value={cate.cateName}>
                                {cate.cateName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
                        รายละเอียด
                    </label>
                    <textarea
                        id="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="5"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        บันทึก
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)} // กลับไปหน้าก่อนหน้า
                        className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        ยกเลิก
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditBlog;
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { Link, useNavigate } from "react-router-dom";


function MyBlog() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const getBlogs = () => {
        axios.get("http://localhost:4000/read-post", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(res => {
            console.log("Blogs updated: ", res.data); // ตรวจสอบข้อมูลที่ถูกดึงมาว่าอัปเดตหรือไม่
            setBlogs(res.data);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        console.log("Component mounted, fetching blogs...");
        getBlogs();
    }, []);

    // ฟังก์ชันสำหรับการลบบล็อก
    const handleDelete = (blogid) => {
        if (window.confirm("คุณต้องการลบโพสนี้หรือไม่?")) {
            axios.delete(`http://localhost:4000/post/${blogid}`)
                .then((res) => {
                     alert("ลบโพสสำเร็จ");
                    getBlogs(); // เรียกข้อมูลใหม่หลังจากลบเสร็จ
                })
                .catch((error) => {
                    console.error("Error deleting post: ", error); // ตรวจสอบ error หากการลบมีปัญหา
                    alert("เกิดข้อผิดพลาดในการลบโพส");
                });
        }
    };
    const handleEdit = (blogid) => {
        navigate(`/edit-post/${blogid}`);
    };
    const listBlog = blogs.map((blog) => (
        <tr key={blog.blogid} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.blogid}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.category}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(blog.update_at).toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
            <button
                    onClick={() => handleEdit(blog.blogid)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                    แก้ไข
                </button>
                <button
                    onClick={() => handleDelete(blog.blogid)}
                    className="text-red-600 hover:text-red-900"
                >
                    ลบ
                </button>
            </td>
        </tr>
    ));


    return (
        <>
            <div className="mx-auto p-4">

                <h2 className="text-2xl text-teal-700 mb-10 ">แสดงรายการโพสทั้งหมด</h2>
                <div className="flex justify-end mb-4">
                    <Link to={'/new-post'}>
                        <button className="p-2 bg-blue-500 hover:bg-blue-400 text-white rounded">สร้างใหม่</button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อเรื่อง</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หมวดหมู่</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อัพเดทล่าสุด</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listBlog}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyBlog;
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
    const {user} = useAuth()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [detial, setDetail] = useState("")
    const [category, setCategory] = useState("")

    const listCategory = [
        { id:1, cateName: "ความรู้"},
        { id:2, cateName: "บันเทิง"},
        { id:3, cateName: "กีฬา"},
        { id:4, cateName: "ศิลปะ"},
        { id:5, cateName: "วิทยาศาสตร์"},
        { id:6, cateName: "สุขภาพ"},
        { id:7, cateName: "อื่นๆ"},
    ]
     const handleAddPost = async (event) => {
        event.preventDefault();
        const blogpost = {
            title : title,
            detail : detial,
            category : category
        };
        try {
            const response = await axios.post("http://localhost:4000/create-post", blogpost, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            alert( response.data.message )
            navigate('/myblog')
            console.log(response.data);
        } catch (error) {
            console.error('Error', error)
        }
    }


    return (
    <>
        <div  >
            <form onSubmit={handleAddPost}>
                <div className="mb-4">
                    <label className="block">ชื่อเรื่อง</label>
                    <input className="w-full p-2 border" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block">รายละเอียด</label>
                    <textarea className="w-full h-24 border border-gray-300 p-2" value={detial} onChange={e => setDetail(e.target.value)}></textarea>
                </div>
                <div className="mb-4">
                    <label className="block">ประเภท</label>
                    <select className="w-full p-2 border" value={category} onChange={e => setCategory(e.target.value)}>
                        <option>--เลือกประเภท--</option>
                        { listCategory.map( cate => (
                            <option key={cate.id} value={cate.cateName}> {cate.cateName} </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <button type="submit" className="p-2 rounded bg-blue-500 hover:bg-blue-400 text-white">บันทึก</button>
                </div>

            </form>

        </div>
    </> );
}

export default AddBlog;
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import axios from "axios";

function Account() {
    const { user } = useAuth();
    const [account, setAccount] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPicture, setEditedPicture] = useState(null);
    
    const getAccount = async () => {
        try {
            const res = await axios.get("http://localhost:4000/account", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (res.data.length > 0) {
                setAccount(res.data[0]);
                setEditedName(res.data[0]?.name || '');
                setEditedEmail(res.data[0]?.email || '');
            } else {
                console.error("No account data found.");
            }
        } catch (err) {
            console.error("Error fetching account data:", err);
        }
    };

    useEffect(() => {
        if (user.token) {
            getAccount();
        }
    }, [user.token]);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", editedName);
        formData.append("email", editedEmail);
        if (editedPicture) {
            formData.append("picture", editedPicture);
        }

        try {
            await axios.put("http://localhost:4000/update-account", formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            await getAccount();
            setShowModal(false);
        } catch (err) {
            console.error("Error updating account:", err.response ? err.response.data : err);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center my-8 text-gray-800">ข้อมูลบัญชี</h1>
            <div className="p-8 bg-white rounded-lg shadow-md max-w-md mx-auto border border-gray-300">
                <div className="text-center mb-6">
                    {account.picture ? (
                        <img
                            src={`http://localhost:4000/${account.picture}`}
                            alt="โปรไฟล์"
                            className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border border-gray-300"
                        />
                    ) : (
                        <div className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-full mx-auto mb-4 border border-gray-300">
                            <span className="text-gray-500 text-lg">ไม่มีรูปภาพ</span>
                        </div>
                    )}
                    <h2 className="text-2xl font-semibold text-gray-700">ชื่อ: {account.name}</h2>
                    <h3 className="text-lg text-gray-600">อีเมล: {account.email}</h3>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-150 ease-in-out text-lg"
                >
                    แก้ไขข้อมูล
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">แก้ไขโปรไฟล์</h2>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg">ชื่อ</label>
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg">อีเมล</label>
                            <input
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg">รูปโปรไฟล์</label>
                            <input
                                type="file"
                                onChange={(e) => setEditedPicture(e.target.files[0])}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-lg mr-2"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-lg"
                            >
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Account;

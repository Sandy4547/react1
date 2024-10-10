import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('กรุณากรอกอีเมลให้ถูกต้อง');
            return;
        }

        if (password.length < 6) {
            setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
            return;
        }

        if (password !== confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/register', {
                email,
                password,
                name
            });

            console.log('สมัครสมาชิกสำเร็จ:', response.data);
            alert('สมัครสมาชิกสำเร็จ');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');

            navigate('/login');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการสมัครสมาชิก:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'เกิดข้อผิดพลาดบางอย่าง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">สมัครสมาชิก</div>
                <div className="p-8 bg-white mt-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}
                        
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">อีเมล</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">รหัสผ่าน</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-600">ยืนยันรหัสผ่าน</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">ชื่อ</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full p-3 mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                            disabled={loading}
                        >
                            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
                        </button>

                        <p className="mt-5 text-center">
                            <Link to="/login" className="text-blue-800">เข้าสู่ระบบ</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

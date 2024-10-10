// src/components/About.js
import React from 'react';

function About() {
    return (
        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center">
                <div className="w-64 h-64 bg-gray-300 flex items-center justify-center rounded-lg">
                    <img
                        src="sai.jpg"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="ml-8">
                    <h2 className="text-2xl font-bold mb-4">เกี่ยวกับฉัน</h2>
                    <p className="text-gray-700 mb-4">
                        ใส่ชื่อ : 
                    </p>
                    <p className="text-gray-700 mb-4">
                        รหัสนักศึกษา : 
                    </p>
                    <p className="text-gray-700 mb-4">
                        สถานที่ศึกษา : มหาวิทยาลัยกาฬสินธุ์ 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
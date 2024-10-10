// src/components/Header.js
import React from 'react';
import LogoutButton from '../pages/Logout';

function Header() {
    return (
        <header className="bg-purple-500 shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">กู้เงินดอทคอม</h1>
            <div className="flex flex-grow justify-center space-x-4">
                <button className="text-gray-200 hover:text-white">หน้าแรก</button>
                <button className="text-gray-200 hover:text-white">เกี่ยวกับ</button>
                <button className="text-gray-200 hover:text-white">ติดต่อเรา</button>
            </div>
            <div>
                <LogoutButton/>
            </div>  
        </header>
    );
}

export default Header;

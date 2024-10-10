import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-purple-300 text-gray-800">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            </div>
            <nav className="mt-10">
                <Link to="/Dashboard" className="block py-3 px-4 hover:bg-purple-500">
                    Dashboard
                </Link>
                <Link to="/users" className="block py-3 px-4 hover:bg-purple-500">
                    Users
                </Link>
                <Link to="/myblog" className="block py-3 px-4 hover:bg-purple-500">
                    จัดการโพสต์
                </Link>
                <Link to="/account" className="block py-3 px-4 hover:bg-purple-500">
                    จัดการบัญชี
                </Link>
                <Link to="/About" className="block py-3 px-4 hover:bg-purple-500">
                    About
                </Link>
                <Link to="/Contact" className="block py-3 px-4 hover:bg-purple-500">
                    Contact
                </Link>
            </nav>
        </div>
    );
}

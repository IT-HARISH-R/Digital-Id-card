import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data";

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleUserClick = (id) => {
        navigate(`/verify/${id}`);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4">
            {/* Header */}
            <div className="flex flex-col items-center w-full pt-8">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                        Employee Identity Portal
                    </h1>
                    <p className="text-gray-600 max-w-2xl pb-4 text-sm md:text-lg">
                        Verify employee identities with our secure verification system. Select an employee below to begin the verification process.
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, ID, or Role..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-blue-600">{users.length}</div>
                    <div className="text-gray-600">Total Employees</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-green-600">{users.filter(u => u.partner).length}</div>
                    <div className="text-gray-600">With Partners</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md text-center">
                    <div className="text-3xl font-bold text-purple-600">100%</div>
                    <div className="text-gray-600">Verification Rate</div>
                </div>
            </div>

            {/* User list */}
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    Employee Directory
                </h2>

                {filteredUsers.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center shadow-md">
                        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No employees found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search term or check the spelling.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleUserClick(user.id)}
                                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 transform hover:-translate-y-1 flex items-start"
                            >
                                <div className="flex-shrink-0 mr-4">
                                    {user.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {user.name
                                            ? user.name
                                                .split(" ")
                                                .map(
                                                    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                                )
                                                .join(" ")
                                            : "N/A"}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">{user.Role}</p>
                                    <div className="flex items-center mt-1 text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="truncate">{user.Phone_number}</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>ID: {user.id}</span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center text-sm text-gray-500 flex flex-col items-center">
                <p>Secure Employee Verification System • {new Date().getFullYear()}</p>
                <p className="text-xs mt-1 pb-4">Powered by Couples Tech</p>
            </div>
        </div>
    );
};

export default Home;
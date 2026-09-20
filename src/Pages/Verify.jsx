import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import users from "../data";

const Verify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const foundUser = users.find((u) => u.id === id);

        const timer = setTimeout(() => {
            setLoading(false);
            if (foundUser) {
                setUser(foundUser);
                setIsVerified(true);
            } else {
                navigate("/not-verified");
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [id, navigate]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const openImageModal = () => {
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mt-4 text-lg font-medium text-gray-700"
                    >
                        Verifying ID credentials...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="mt-2 text-sm text-gray-500"
                    >
                        This may take a moment
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 md:p-4 md:py-8">
                <div className="container max-w-md mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white md:rounded-2xl shadow-xl w-full overflow-hidden"
                    >

                        {/* Header Section with Company Logo and Name */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>

                            <div className="relative z-10 flex flex-col items-center">

                                <h2
                                    className="text-center text-sm md:text-base font-semibold tracking-[0.15em] mb-3 uppercase bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent"
                                >
                                    Secure Identity by <br />
                                    <span
                                        className="font-[Open_Sans,sans-serif]   text-[oklch(0.85_0.35_147.02)] text-2xl md:text-4xl bg-clip-text drop-shadow-lg tracking-wide"
                                    >
                                        Couples Tech
                                    </span>


                                </h2>

                                {/* Large Profile Picture */}
                                <div
                                    className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden shadow-lg cursor-pointer"
                                    onClick={openImageModal}
                                >
                                    {user.profileImage ? (
                                        <>
                                            <img
                                                src={user.profileImage}
                                                alt={user.name || "Profile"}
                                                className={`w-40 h-32 rounded-full object-cover transition-opacity duration-500 shadow-md ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                                                onLoad={handleImageLoad}
                                            />

                                            {!imageLoaded && (
                                                <div className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                                                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                                            {user.name ? user.name.charAt(0) : "?"}
                                        </div>
                                    )}
                                </div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="text-2xl font-bold mt-2 [color:oklch(0.95_0.22_107.85)]"
                                >
                                    {user.name
                                        ? user.name
                                            .split(" ")
                                            .map(
                                                (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                            )
                                            .join(" ")
                                        : "N/A"}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.35 }}
                                    className="text-blue-100 mt-1"
                                >
                                    {user.Role || "N/A"}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="flex items-center mt-3 bg-white/20 rounded-full px-4 py-1 backdrop-blur-sm"
                                >
                                    <span className="text-white text-sm font-medium">Employee ID: {user.id}</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Validation Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                            className="bg-green-50 border-b border-green-200 px-6 py-3"
                        >
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-green-600 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="text-green-800 text-sm font-medium">Identity validated successfully</span>
                            </div>
                        </motion.div>

                        {/* User Details Section */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                {/* Company Name */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                    className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-md"
                                >
                                    <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Company Name</div>
                                    <div className="text-sm md:text-lg font-medium text-gray-900">{user.companyName || "N/A"}</div>
                                </motion.div>

                                {/* Personal Info Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.55 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md"
                                    >
                                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Date of Birth</div>
                                        <div className="text-sm md:text-lg font-medium text-gray-900">{user.dob || "N/A"}</div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md"
                                    >
                                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Gender</div>
                                        <div className="text-sm flex items-center md:text-lg font-medium text-gray-900">
                                            {user.gender === "female" ? (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 text-pink-500 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 4a1 1 0 100 2h2a1 1 0 100-2H9z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    Female
                                                </>
                                            ) : user.gender === "male" ? (
                                                <>
                                                    <svg
                                                        className="w-5 h-5 text-blue-500 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 4a1 1 0 100 2h1a1 1 0 100-2h-1z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    Male
                                                </>
                                            ) : (
                                                "N/A"
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Contact Info Row */}
                                <div className="grid grid-cols-1 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.65 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md hover:bg-blue-100"
                                    >
                                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Email</div>
                                        <a
                                            href={`mailto:${user.Mail_Id}`}
                                            className="text-sm md:text-lg font-medium text-gray-900 hover:text-blue-700 hover:underline cursor-pointer transition-colors duration-200 block whitespace-normal break-words"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {user.Mail_Id || "N/A"}
                                        </a>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md hover:bg-blue-100"
                                    >
                                        <div className="font-semibold text-blue-700 uppercase tracking-wider mb-1">Phone</div>
                                        <a
                                            href={`tel:${user.Phone_number}`}
                                            className="text-sm md:text-lg font-medium text-gray-900 hover:text-blue-700 cursor-pointer transition-colors duration-200 block"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {user.Phone_number || "N/A"}
                                        </a>
                                    </motion.div>
                                </div>

                                {/* Address */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.75 }}
                                    className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md"
                                >
                                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Address</div>
                                    <div className="text-sm md:text-lg font-medium text-gray-900 whitespace-normal break-words">{user.Address || "N/A"}</div>
                                </motion.div>

                                {/* Medical Info Row */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.8 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md"
                                    >
                                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Blood Group</div>
                                        <div className="text-sm md:text-lg font-medium text-gray-900">{user.Blood_group || "N/A"}</div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.85 }}
                                        className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md"
                                    >
                                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Status</div>
                                        <div className="text-sm md:text-lg font-medium text-green-600 flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            Verified
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Verification Timestamp */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                                className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center"
                            >
                                <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification Date</div>
                                    <div className="text-sm font-medium text-gray-700">{user.Verification_Date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Number</div>
                                    <div className="text-sm font-medium text-gray-700">{user.id}</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Footer Section with Company Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.95 }}
                            className="bg-gray-50 px-6 py-4 text-center"
                        >
                            <p className="text-xs text-gray-500 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 mr-1 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                SecureID by Couples Tech | Secured with advanced encryption
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Image Modal */}
            {isImageModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={closeImageModal}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white rounded-lg shadow-lg p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeImageModal}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                        <div className="w-72 h-72 sm:w-96 sm:h-96">
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user.name || "Profile"}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold rounded-lg">
                                    {user.name ? user.name.charAt(0) : "?"}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Verify;
import React from 'react';
import { motion } from 'framer-motion';

const EditCustomerModal = ({
    isOpen,
    customer,
    formData,
    onChange,
    onClose,
    onSave
}) => {
    if (!isOpen || !customer) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced pink/white gradient backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#ffffff10] to-[#ffffff20] backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Premium modal container */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                className="relative z-50 w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-white/20"
            >
                {/* Pink gradient header */}
                <div className="bg-gradient-to-r from-[#B72765] to-[#e83a7d] p-6">
                    <h2 className="text-xl font-semibold text-pink-200 text-center">Edit Customer Details</h2>
                </div>

                {/* Form content */}
                <div className="p-6 space-y-5">
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                className="peer w-full px-4 py-2.5 text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-0 transition-colors"
                                placeholder=" "
                            />
                            <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-focus:text-xs peer-focus:-top-3.5 peer-focus:text-pink-600 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all pointer-events-none">
                                Full Name
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                className="peer w-full px-4 py-2.5 text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-0 transition-colors"
                                placeholder=" "
                            />
                            <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-focus:text-xs peer-focus:-top-3.5 peer-focus:text-pink-600 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all pointer-events-none">
                                Email Address
                            </label>
                        </div>

                        {/* Mobile Field */}
                        <div className="relative">
                            <input
                                type="tel"
                                name="mobile_number"
                                value={formData.mobile_number}
                                onChange={onChange}
                                className="peer w-full px-4 py-2.5 text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-0 transition-colors"
                                placeholder=" "
                            />
                            <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-focus:text-xs peer-focus:-top-3.5 peer-focus:text-pink-600 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all pointer-events-none">
                                Mobile Number
                            </label>
                        </div>

                        {/* Customer Type Field (as input) */}
                        <div className="relative">
                            <input
                                type="text"
                                name="customer_type"
                                value={formData.customer_type}
                                onChange={onChange}
                                className="peer w-full px-4 py-2.5 text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-0 transition-colors"
                                placeholder=" "
                            />
                            <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-focus:text-xs peer-focus:-top-3.5 peer-focus:text-pink-600 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all pointer-events-none">
                                Customer Type
                            </label>
                        </div>

                        {/* Address Field */}
                        <div className="relative">
                            <textarea
                                name="addresses"
                                value={formData.addresses}
                                onChange={onChange}
                                rows="3"
                                className="peer w-full px-4 py-2.5 text-sm bg-transparent border-0 border-b-2 border-gray-200 focus:border-pink-500 focus:outline-none focus:ring-0 transition-colors resize-none"
                                placeholder=" "
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-xs text-gray-500 peer-focus:text-xs peer-focus:-top-3.5 peer-focus:text-pink-600 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all pointer-events-none">
                                Addresses
                            </label>
                        </div>
                    </div>
                </div>

                {/* Modal footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSave}
                        className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#B72765] to-[#e83a7d] rounded-lg hover:from-[#A02055] hover:to-[#d12f6d] shadow-md transition-all"
                    >
                        Save Changes
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditCustomerModal;
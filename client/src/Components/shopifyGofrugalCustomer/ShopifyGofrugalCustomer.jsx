import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import EditCustomerModal from '../EditShopifyCustomer/EditCustomerModel';

const ShopifyGofrugalCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFiltering, setIsFiltering] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [showFloatingSearch, setShowFloatingSearch] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const ShopifyGofrugalCustomersdetails = import.meta.env.VITE_ADMIN_SHOPIFY_GOFRUGAL_CUSTOMER;
    const itemsPerPage = 50;
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        mobile_number: '',
        customer_type: '',
        addresses: ''
    });

    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setEditForm({
            name: customer.name || '',
            email: customer.email || '',
            mobile_number: customer.mobile_number || '',
            customer_type: customer.customer_type || '',
            addresses: customer.addresses || ''
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateCustomer = async () => {
        try {
            const response = await axios.patch(
                `${ShopifyGofrugalCustomersdetails}/${editingCustomer.id}`,
                editForm
            );
            const updated = customers.map((cust) =>
                cust.id === editingCustomer.id ? { ...cust, ...editForm } : cust
            );
            setCustomers(updated);
            setFilteredCustomers(updated);

            setShowEditModal(false);
            setEditingCustomer(null);
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Update failed");
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowFloatingSearch(true);
            } else {
                setShowFloatingSearch(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${ShopifyGofrugalCustomersdetails}`);
                setCustomers(response.data.data);
                setFilteredCustomers(response.data.data);
            } catch (error) {
                console.error('Error fetching Customers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        setIsFiltering(true);

        const delayDebounce = setTimeout(() => {
            const term = searchTerm.toLowerCase();
            const filtered = customers.filter((item) => {
                const createdAt = new Date(item.created_at).toLocaleDateString().toLowerCase();
                const name = (item.name || '').toLowerCase();
                const email = (item.email || '').toLowerCase();
                const mobile = (item.mobile_number || '').toLowerCase();

                return (
                    name.includes(term) ||
                    email.includes(term) ||
                    mobile.includes(term) ||
                    createdAt.includes(term)
                );
            });

            setFilteredCustomers(filtered);
            setCurrentPage(1);
            setIsFiltering(false);
        }, 1000);

        return () => {
            clearTimeout(delayDebounce);
            setIsFiltering(false);
        };
    }, [searchTerm, customers]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            if (debounceTimer) clearTimeout(debounceTimer);

            setIsFiltering(true);
            const timer = setTimeout(() => {
                setCurrentPage(page);
                setIsFiltering(false);
                setDebounceTimer(null);
            }, 800);

            setDebounceTimer(timer);
        }
    };

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedData = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="animate-pulse py-4 text-center pt-20">Loading Customers...</div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-4 md:ml-64 pt-20">
            {/* Heading + Search */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 max-w-auto w-full mx-auto gap-4">
                <h2 className="text-2xl font-semibold text-[#B72765]">Customers Details</h2>
                <div className="w-full md:max-w-md border border-gray-300 rounded bg-white shadow-sm">
                    <div className="flex items-center px-3 py-2 gap-2">
                        <FaSearch className="text-gray-500 h-4 w-4" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by name, email, mobile, date..."
                            className="flex-1 rounded bg-white focus:outline-none placeholder-gray-500 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Loader during filter */}
            {isFiltering && (
                <div className="text-center text-[#B72765] text-lg mb-2 animate-pulse">Processing...</div>
            )}

            {!loading && paginatedData.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-10">No Customers Found</div>
            ) : (
                <>
                    <div className={`transition duration-200 ${isFiltering ? 'blur-sm opacity-60 pointer-events-none' : ''}`}>
                        {/* Desktop View */}
                        <div className="hidden md:block w-full max-w-auto bg-white shadow-lg text-center rounded-lg mx-auto">
                            <div className="bg-[#B72765] grid grid-cols-6 font-semibold text-sm px-6 py-4 text-white rounded-t-lg">
                                <div>Customer Name</div>
                                <div>Mobile</div>
                                <div>Email</div>
                                <div>Address</div>
                                <div>Customer Type</div>
                                <div>Date</div>
                            </div>

                            <div className="divide-y max-h-auto overflow-y-auto">
                                {paginatedData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-6 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 relative">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="text-[#B72765] hover:text-[#8a1f4e] md:absolute md:left-0"
                                                title="Edit"
                                            >
                                                <FaEdit className="w-4 h-4 mx-auto md:mx-0" />
                                            </button>
                                            <span className="text-center md:mx-auto">{item.name}</span>
                                        </div>

                                        <div className="break-words">{item.mobile_number}</div>
                                        <div className="break-words">{item.email}</div>
                                        <div className="break-words">{item.addresses}</div>
                                        <div className="break-words">{item.customer_type}</div>
                                        <div>
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden w-full max-w-6xl mx-auto">
                            {paginatedData.map((item) => (
                                <div
                                    key={item.id}
                                    className="mb-4 bg-white shadow-md p-4 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-[#B72765]">Customer Details</h3>
                                        <button
                                            onClick={() => openEditModal(item)} // you must define this function
                                            className="text-[#B72765] hover:text-[#8a1f4e]"
                                            title="Edit"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 break-words">
                                        <div><strong>Name:</strong><div>{item.name}</div></div>
                                        <div><strong>Mobile:</strong><div>{item.mobile_number}</div></div>
                                        <div><strong>Email:</strong><div>{item.email}</div></div>
                                        <div><strong>Customer Type:</strong><div>{item.customer_type}</div></div>
                                        <div><strong>Date:</strong><div>{new Date(item.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'short', day: '2-digit',
                                        })}</div></div>
                                        <div><strong>Address:</strong><div>{item.addresses}</div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex justify-center gap-2 flex-wrap">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1 || isFiltering}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((page) => {
                                return (
                                    page === 1 ||
                                    page === 2 ||
                                    page === totalPages ||
                                    page === totalPages - 1 ||
                                    page === currentPage ||
                                    page === currentPage - 1 ||
                                    page === currentPage + 1
                                );
                            })
                            .reduce((acc, page, idx, arr) => {
                                if (idx > 0 && page - arr[idx - 1] > 1) {
                                    acc.push('ellipsis');
                                }
                                acc.push(page);
                                return acc;
                            }, [])
                            .map((item, index) =>
                                item === 'ellipsis' ? (
                                    <span key={index} className="px-2 py-1 text-gray-500">...</span>
                                ) : (
                                    <button
                                        key={item}
                                        onClick={() => goToPage(item)}
                                        className={`px-3 py-1 rounded ${currentPage === item ? 'bg-[#B72765] text-white' : 'bg-gray-200'}`}
                                        disabled={isFiltering}
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages || isFiltering}
                        >
                            Next
                        </button>
                    </div>
                    {showFloatingSearch && (
                        <div className="fixed top-[100px] right-10 z-50 bg-white border border-gray-300 shadow-lg rounded-lg p-2 w-70 animate-slide-in">
                            <div className="flex items-center gap-2">
                                <FaSearch className="text-gray-500 h-4 w-4" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search..."
                                    className="flex-1 text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                    )}
                    <EditCustomerModal
                        isOpen={showEditModal}
                        customer={editingCustomer}
                        formData={editForm}
                        onChange={handleEditChange}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleUpdateCustomer}
                    />
                </>
            )}
        </div>
    );
};

export default ShopifyGofrugalCustomers;

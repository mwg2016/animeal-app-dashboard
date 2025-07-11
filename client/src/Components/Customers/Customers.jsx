import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const customersdetails = import.meta.env.VITE_GET_CUSTOMERS;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${customersdetails}`);
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
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = customers.filter((item) => {
      const createdAt = new Date(item.created_at).toLocaleDateString().toLowerCase();
      const vetfullname = `${item.first_name} ${item.last_name}`.toLowerCase();
      return (
        item.client_name.toLowerCase().includes(term) ||
        item.client_email.toLowerCase().includes(term) ||
        createdAt.includes(term) ||
        item.first_name.toLowerCase().includes(term) ||
        item.last_name.toLowerCase().includes(term) ||
        vetfullname.includes(term)
      );
    });
    setFilteredCustomers(filtered);
  };

  if (loading) {
    return (
      <div className="animate-pulse py-4 text-center pt-20">Loading Customers...</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-4 lg:ml-64 pt-20">
      {/* Heading + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 max-w-6xl w-full mx-auto gap-4">
        <h2 className="text-2xl font-semibold text-[#B72765]">Customers Details</h2>
        <div className="w-full md:max-w-md border border-gray-300 rounded bg-white shadow-sm">
          <div className="flex items-center px-3 py-2 gap-2">
            <FaSearch className="text-gray-500 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email, Linked Vet, date..."
              className="flex-1 rounded bg-white focus:outline-none placeholder-gray-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* No Data */}
      {!loading && filteredCustomers.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">No Customers Found</div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:block w-full max-w-6xl bg-white shadow-lg rounded-lg mx-auto">
            <div className="bg-[#B72765] grid grid-cols-4 font-semibold text-sm px-6 py-4 text-white rounded-t-lg">
              <div>Client Name</div>
              <div>Email</div>
              <div>Linked Vet</div>
              <div>Date</div>
            </div>

            <div className="max-h-[400px] overflow-y-auto divide-y">
              {filteredCustomers.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="truncate">{item.client_name}</div>
                  <div className="truncate">{item.client_email}</div>
                  <div className="truncate">{item.first_name} {item.last_name}</div>
                  <div className="truncate">{new Date(item.created_at).toLocaleString(
                    'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }
                  )}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden w-full max-w-6xl mx-auto">
            {filteredCustomers.map((item) => (
              <div
                key={item.id}
                className="mb-4 bg-white shadow-md p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-[#B72765] mb-2">Customers Details :</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Client:</strong> {item.client_name}</div>
                  <div><strong>Email:</strong> {item.client_email}</div>
                  <div><strong>Linked Vet:</strong> {item.first_name} {item.last_name}</div>
                  <div><strong>Date:</strong> {new Date(item.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }
                  )}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;

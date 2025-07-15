import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const ActiveVets = () => {
  const [activeVets, setActiveVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [qrPath, setQrPath]=useState('');
  const [vetId, setVetId] = useState(null);
  const vetList = import.meta.env.VITE_VET_LIST;
  const rootUrl = import.meta.env.VITE_ROOT_URL;
  const getQrCodeUrl = import.meta.env.VITE_GET_QR;

  const getQrCode = async (vetid) => {
    try {
      const req = await axios.get(getQrCodeUrl + `?id=${vetid}`);
      const res = req.data;
      const path = rootUrl + '/uploads/' + req.data.vetQrcode;
      setQrPath(path);
      console.log(path, 'ldmfoiam')
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${vetList}`)
      .then((response) => {
        const active = response.data.filter((vet) => vet.approved === 'true');
        setActiveVets(active);
        if (active.length > 0) setSelectedVet(active[0]);
        setVetId(active[0].id);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleQr = () => {
    setShowQR(!showQR);
    getQrCode(vetId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectedVet = (vet) => {
    setSelectedVet(vet);
    setVetId(vet.id);
    getQrCode(vet.id);
  };

  // Filter data based on search term (name or phone number)
  const filteredVets = activeVets.filter(
    (vet) =>
      vet.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.phone_number.includes(searchTerm) // Match phone number
  );

  if (loading) return <div className="text-orange-500 text-xl text-center pt-20">Loading active vets...</div>;
  if (error) return <div className="text-red-500 text-xl text-center pt-20">{error.message} Error fetching data</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20 px-4 lg:px-12 md:ml-64 overflow-hidden">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-2 lg:p-4 lg:mr-6 flex flex-col max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#B72765] mb-4 text-center lg:text-left">Active Veterinarians</h2>

        {/* Search Bar */}
        <div className='mb-4 border border-gray-300 rounded bg-gray-50 w-full'>
          <div className='flex items-center px-3 py-2 gap-2'>
            <FaSearch className='text-gray-500 h-4 w-4' />
            <input
              className="flex-1 rounded bg-gray-50 focus:outline-none placeholder-gray-500 placeholder-opacity-50 px-2 text-sm"
              placeholder="Search By Name And Phone Number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-[#B72765]">
                <th className="p-2 border border-gray-500 text-white">ID</th>
                <th className="p-2 border border-gray-500 text-white">Name</th>
                <th className="p-2 border border-gray-500 text-white">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredVets.slice().map((vet) => (
                <tr
                  key={vet.id}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectedVet(vet)}
                >
                  <td className="p-2 border text-center">{vet.id}</td>
                  <td className="p-2 border text-center">{vet.first_name} {vet.last_name}</td>
                  <td className="p-2 border text-center">{vet.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full lg:w-1/2 p-2 lg:p-4 mb-4 border border-gray-200 bg-gray-50 rounded-md shadow-md mt-8 lg:mt-0 flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {selectedVet ? (
          <div className="space-y-4">
            {/* QR Code Toggle Button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                className="bg-[#B72765] text-xs px-3 py-1 rounded text-white"
                onClick={handleQr}
              >
                {showQR ? 'Hide QR' : 'Show QR'}
              </button>

              {showQR && (
                <div className="mt-2 p-2 bg-white shadow-md rounded w-28">
                  <img
                    src={selectedVet.qr_code || qrPath}
                    alt="QR Code"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex justify-center mt-10">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-gray-400 flex items-center justify-center bg-[#B72765] text-white text-2xl font-bold overflow-hidden">
                {selectedVet.clinic_img ? (
                  <img
                    src={selectedVet.clinic_img}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>
                    {(selectedVet.first_name?.[0] || '').toUpperCase()}
                    {(selectedVet.last_name?.[0] || '').toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="text-center mt-2">
              <h2 className="text-xl lg:text-2xl font-bold underline text-[#B72765]">Veterinarian Details</h2>
              <p className="text-gray-700 text-sm">Vet ID: {selectedVet.id}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Name:</span> {selectedVet.first_name} {selectedVet.last_name}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Email:</span> {selectedVet.email}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Phone:</span> +91 {selectedVet.phone_number}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Clinic:</span> {selectedVet.clinic_name}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">License No:</span> {selectedVet.vet_license_number}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Vet Card:</span> {selectedVet.vet_card_path}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Clinic Photo:</span> {selectedVet.clinic_photo_path}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Prescription Pad:</span> {selectedVet.prescription_pad_path}</p>
              <p className='bg-gray-100 px-3 py-1 rounded'><span className="font-semibold">Approved:</span> {selectedVet.approved}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">Select a vet to view details</p>
        )}
      </motion.div>
    </div>
  );
};

export default ActiveVets;

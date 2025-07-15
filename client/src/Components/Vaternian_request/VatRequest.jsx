// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const VetRequests = () => {
//   const [records, setRecords] = useState([]);
//   const vetRequestPending = import.meta.env.VITE_REQUEST_PENDING;
//   const vetRequestPendingStatus = import.meta.env.VITE_REQUEST_PENDING_STATUS;

//   const fetchPendingRecords = async () => {
//     try {
//       const res = await axios.get(`${vetRequestPending}`);
//       setRecords(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.error("Error fetching pending records:", err);
//       toast.error("Failed to fetch pending records");
//     }
//   };

//   useEffect(() => {
//     fetchPendingRecords();
//   }, []);

//   const updateStatus = async (id, isApproved) => {
//     try {
//       await axios.patch(`${vetRequestPendingStatus}` + "?id=" + id, {
//         approved: isApproved ? "true" : "false",
//       });

//       if (isApproved) {
//         toast.success("Request Approved Successfully!");
//       } else {
//         toast.error("Request Rejected!"); 
//       }

//       fetchPendingRecords();
//     } catch (err) {
//       console.error(`${isApproved ? "Approve" : "Reject"} error:`, err);
//       toast.error(`Failed to ${isApproved ? "approve" : "reject"} request`);
//     }
//   };

//   return (
//     <div className="pt-24 px-4 sm:px-6 lg:px-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
//         Pending Vet Requests
//       </h2>

//       {records.length === 0 ? (
//         <p className="text-center text-gray-500">No pending requests.</p>
//       ) : (
//         records.map((record) => (
//           <div
//             key={record.id}
//             className="bg-white shadow rounded-lg p-4 mb-3 border border-gray-200"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-md font-semibold text-gray-800">
//                   {record.first_name} {record.last_name}
//                 </p>
//                 <p className="text-gray-600 text-sm">{record.email}</p>
//               </div>

//               <div className="space-x-2">
//                 <button
//                   onClick={() => updateStatus(record.id, true)}
//                   className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => updateStatus(record.id, false)}
//                   className="bg-[#B72765] hover:bg-[#B72780] text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
//                 >
//                   Reject
//                 </button>
//                 <button
//                   className="bg-[#0e0e0e] hover:bg-gray-600  text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
//                 >
//                   Review
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default VetRequests;



import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VetRequests = () => {
  const rootUrl = import.meta.env.VITE_ROOT_URL;
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const vetRequestPending = import.meta.env.VITE_REQUEST_PENDING;
  const vetRequestPendingStatus = import.meta.env.VITE_REQUEST_PENDING_STATUS;

  const fetchPendingRecords = async () => {
    try {
      const res = await axios.get(`${vetRequestPending}`);
      setRecords(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching pending records:", err);
      toast.error("Failed to fetch pending records");
    }
  };

  useEffect(() => {
    fetchPendingRecords();
  }, []);

  const updateStatus = async (id, isApproved) => {
    try {
      await axios.patch(`${vetRequestPendingStatus}?id=${id}`, {
        approved: isApproved ? "true" : "false",
      });

      if (isApproved) {
        toast.success("Request Approved Successfully!");
      } else {
        toast.error("Request Rejected!");
      }

      fetchPendingRecords();
    } catch (err) {
      console.error(`${isApproved ? "Approve" : "Reject"} error:`, err);
      toast.error(`Failed to ${isApproved ? "approve" : "reject"} request`);
    }
  };

  const openModalReview = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Pending Vet Requests
      </h2>

      {records.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        records.map((record) => (
          <div
            key={record.id}
            className="bg-white shadow rounded-lg p-4 mb-3 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-md font-semibold text-gray-800">
                  {record.first_name} {record.last_name}
                </p>
                <p className="text-gray-600 text-sm">{record.email}</p>
              </div>

              <div className="md:space-x-2 md:block space-y-2 flex flex-col">
                <button
                  onClick={() => updateStatus(record.id, true)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(record.id, false)}
                  className="bg-[#B72765] hover:bg-[#B72780] text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Reject
                </button>
                <button
                  onClick={() => openModalReview(record)}
                  className="bg-[#0e0e0e] hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {isModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]">

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-black text-xl font-bold focus:outline-none"
              aria-label="Close"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Review Vet Request</h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedRecord.first_name} {selectedRecord.last_name}</p>
              <p><strong>Email:</strong> {selectedRecord.email}</p>
              <p><strong>Phone Number:</strong> {selectedRecord.phone_number}</p>
              <p><strong>Clinic Name:</strong> {selectedRecord.clinic_name}</p>
              <p><strong>Vet License Number:</strong> {selectedRecord.vet_license_number}</p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-semibold mb-1">Clinic Photo:</p>
                  <img
                    src={rootUrl + '/uploads/' + selectedRecord.vet_card_path}
                    alt="Clinic"
                    className="w-full max-h-60 object-contain rounded"
                  />
                </div>

                <div>
                  <p className="font-semibold mb-1">Vet Card:</p>
                  <img
                    src={rootUrl + '/uploads/' + selectedRecord.vet_card_path}
                    alt="Vet Card"
                    className="w-full max-h-60 object-contain rounded"
                  />
                </div>

                <div>
                  <p className="font-semibold mb-1">Prescription Pad:</p>
                  <img
                    src={rootUrl + '/uploads/' + selectedRecord.prescription_pad_path}
                    alt="Prescription Pad"
                    className="w-full max-h-60 object-contain rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VetRequests;

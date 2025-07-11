import { useEffect, useState } from "react";
import axios from "axios";

const VetReport = () => {
  const rootUrl = import.meta.env.VITE_ROOT_URL;
  const [records, setRecords] = useState([]);
  const vetRequestPending = import.meta.env.VITE_REQUEST_PENDING;

  const fetchPendingRecords = async () => {
    try {
      const res = await axios.get(vetRequestPending);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching pending records:", err);
    }
  };

  useEffect(() => {
    fetchPendingRecords();
  }, []);

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Pending Vet Reports
      </h2>

      {records.length === 0 ? (
        <p className="text-center text-gray-500">No pending reports.</p>
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
                <p className="text-gray-600 text-sm">Phone: {record.phone}</p>
                <p className="text-gray-600 text-sm">Status: {record.status}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Date Requested:</p>
                <p className="text-sm text-gray-700">{record.request_date}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VetReport;

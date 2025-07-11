// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from "../../assets/Animeal-logo2.png";
// import {
//   FaFileAlt, FaHome, FaPoll, FaCaretDown, FaUsers,
//   FaIdBadge, FaClipboardList, FaEye, FaTrash
// } from 'react-icons/fa';
// import { FaChartSimple } from 'react-icons/fa6';

// function Sidebar() {
//   const location = useLocation();
//   const [isVetsOpen, setIsVetsOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleVetsMenu = () => setIsVetsOpen(!isVetsOpen);
//   const handleLinkClick = () => setIsSidebarOpen(false);
//   const isActive = (path) => location.pathname === path;

//   const linkClass = (path) =>
//     `px-3 flex items-center transition-colors duration-200 hover:text-[#B72765] hover:shadow py-2 rounded ${
//       isActive(path) ? 'text-[#B72765] font-semibold shadow' : 'text-gray-600'
//     }`;

//   const subLinkClass = (path) =>
//     `px-3 flex items-center transition-colors duration-200 hover:text-[#B72765] hover:shadow py-2 rounded ${
//       isActive(path) ? 'text-[#B72765] font-semibold shadow' : 'text-gray-600'
//     }`;

//   return (
//     <>
//       {/* Hamburger Menu Button for Mobile */}
//       <button
//         className="md:hidden fixed top-3 left-4 z-[9999] bg-white p-2 rounded shadow"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Overlay for mobile when sidebar open */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-white bg-opacity-40 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         md:translate-x-0
//         fixed md:static top-14 md:top-0 left-0
//         w-64 h-full bg-white z-40 transition-transform duration-300 ease-in-out
//         px-4 py-2 overflow-y-auto max-h-screen custom-scrollbar
//       `}>
//         <div className="my-1 mb-3">
//           <img src={logo} alt="animeal-logo" className="w-50 h-10 object-contain" />
//         </div>
//         <hr />
//         <ul className="mt-3 text-gray">
//           <li>
//             <Link to="/dashboard" className={linkClass('/dashboard')} onClick={handleLinkClick}>
//               <FaHome className="w-6 h-6 mr-2" />
//               Dashboard
//             </Link>
//           </li>

//           <li>
//             <button
//               className="px-3 flex justify-between items-center w-full text-left text-gray-600 hover:text-[#B72765] py-2 rounded hover:shadow"
//               onClick={toggleVetsMenu}
//             >
//               <span className="flex items-center">
//                 <FaClipboardList className="w-6 h-6 mr-2" />
//                 Vets
//               </span>
//               <FaCaretDown className={`transition-transform ${isVetsOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {isVetsOpen && (
//               <ul className="pl-8 mt-2">
//                 <li>
//                   <Link to="/dashboard/veterinary-list" className={subLinkClass('/dashboard/veterinary-list')} onClick={handleLinkClick}>
//                     <FaFileAlt className="w-5 h-5 ml-2 mr-2" />
//                     Vets List
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/dashboard/veterinary-request" className={subLinkClass('/dashboard/veterinary-request')} onClick={handleLinkClick}>
//                     <FaEye className="w-5 h-5 ml-2 mr-2" />
//                     Vets Requests
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/dashboard/rejected-request" className={subLinkClass('/dashboard/rejected-request')} onClick={handleLinkClick}>
//                     <FaTrash className="w-5 h-5 ml-2 mr-2" />
//                     Rejected Requests
//                   </Link>
//                 </li>
//                 <li>
//                   {/* <Link to="/dashboard/vets-documents" className={subLinkClass('/dashboard/vets-documents')} onClick={handleLinkClick}>
//                     <FaIdBadge className="w-5 h-5 ml-2 mr-2" />
//                     Vets Docs
//                   </Link> */}
//                   <Link to="/dashboard/paymentsRequest" className={subLinkClass('/dashboard/paymentsRequest')} onClick={handleLinkClick}>
//                     <FaIdBadge className="w-5 h-5 ml-2 mr-2" />
//                     Payment requests
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link to="/dashboard/orders" className={linkClass('/dashboard/orders')} onClick={handleLinkClick}>
//               <FaPoll className="w-6 h-6 mr-2" />
//               Orders
//             </Link>
//           </li>

//           <li>
//             <Link to="/dashboard/customers" className={linkClass('/dashboard/customers')} onClick={handleLinkClick}>
//               <FaUsers className="w-6 h-6 mr-2" />
//               Customers
//             </Link>
//           </li>

//           <li>
//             <Link to="/dashboard/reports" className={linkClass('/dashboard/reports')} onClick={handleLinkClick}>
//               <FaChartSimple className="w-6 h-6 mr-2" />
//               Reports
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/Animeal-logo2.png";
import {
  FaFileAlt, FaHome, FaPoll, FaCaretDown, FaUsers,
  FaIdBadge, FaClipboardList, FaEye, FaTrash
} from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';

function Sidebar() {
  const location = useLocation();
  const [isVetsOpen, setIsVetsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false); // State for Reports dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleVetsMenu = () => setIsVetsOpen(!isVetsOpen);
  const toggleReportsMenu = () => setIsReportsOpen(!isReportsOpen); // Toggle for Reports dropdown
  const handleLinkClick = () => setIsSidebarOpen(false);
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 flex items-center transition-colors duration-200 hover:text-[#B72765] hover:shadow py-2 rounded ${
      isActive(path) ? 'text-[#B72765] font-semibold shadow' : 'text-gray-600'
    }`;

  const subLinkClass = (path) =>
    `px-3 flex items-center transition-colors duration-200 hover:text-[#B72765] hover:shadow py-2 rounded ${
      isActive(path) ? 'text-[#B72765] font-semibold shadow' : 'text-gray-600'
    }`;

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden fixed top-3 left-4 z-[9999] bg-white p-2 rounded shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={` 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 
        fixed md:static top-14 md:top-0 left-0 
        w-64 h-full bg-white z-40 transition-transform duration-300 ease-in-out 
        px-4 py-2 overflow-y-auto max-h-screen custom-scrollbar
      `}>
        <div className="my-1 mb-3">
          <img src={logo} alt="animeal-logo" className="w-50 h-10 object-contain" />
        </div>
        <hr />
        <ul className="mt-3 text-gray">
          <li>
            <Link to="/dashboard" className={linkClass('/dashboard')} onClick={handleLinkClick}>
              <FaHome className="w-6 h-6 mr-2" />
              Dashboard
            </Link>
          </li>

          <li>
            <button
              className="px-3 flex justify-between items-center w-full text-left text-gray-600 hover:text-[#B72765] py-2 rounded hover:shadow"
              onClick={toggleVetsMenu}
            >
              <span className="flex items-center">
                <FaClipboardList className="w-6 h-6 mr-2" />
                Vets
              </span>
              <FaCaretDown className={`transition-transform ${isVetsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isVetsOpen && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link to="/dashboard/veterinary-list" className={subLinkClass('/dashboard/veterinary-list')} onClick={handleLinkClick}>
                    <FaFileAlt className="w-5 h-5 ml-2 mr-2" />
                    Vets List
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/veterinary-request" className={subLinkClass('/dashboard/veterinary-request')} onClick={handleLinkClick}>
                    <FaEye className="w-5 h-5 ml-2 mr-2" />
                    Vets Requests
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/rejected-request" className={subLinkClass('/dashboard/rejected-request')} onClick={handleLinkClick}>
                    <FaTrash className="w-5 h-5 ml-2 mr-2" />
                    Rejected Requests
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/paymentsRequest" className={subLinkClass('/dashboard/paymentsRequest')} onClick={handleLinkClick}>
                    <FaIdBadge className="w-5 h-5 ml-2 mr-2" />
                    Payment requests
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Reports Dropdown */}
          

          <li>
            <Link to="/dashboard/orders" className={linkClass('/dashboard/orders')} onClick={handleLinkClick}>
              <FaPoll className="w-6 h-6 mr-2" />
              Orders
            </Link>
          </li>

          <li>
            <Link to="/dashboard/customers" className={linkClass('/dashboard/customers')} onClick={handleLinkClick}>
              <FaUsers className="w-6 h-6 mr-2" />
              Customers
            </Link>
          </li>


          <li>
            <button
              className="px-3 flex justify-between items-center w-full text-left text-gray-600 hover:text-[#B72765] py-2 rounded hover:shadow"
              onClick={toggleReportsMenu}
            >
              <span className="flex items-center">
                <FaChartSimple className="w-6 h-6 mr-2" />
                Reports
              </span>
              <FaCaretDown className={`transition-transform ${isReportsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isReportsOpen && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link to="/dashboard/pending-vet-reports" className={subLinkClass('/dashboard/pending-vet-reports')} onClick={handleLinkClick}>
                    Vet Reports
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/total-orders" className={subLinkClass('/dashboard/total-orders')} onClick={handleLinkClick}>
                    Total Orders Report
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/monthly-sales" className={subLinkClass('/dashboard/monthly-sales')} onClick={handleLinkClick}>
                    Monthly Sales Report
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/customers-report" className={subLinkClass('/dashboard/customers-report')} onClick={handleLinkClick}>
                    Customers Report
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;




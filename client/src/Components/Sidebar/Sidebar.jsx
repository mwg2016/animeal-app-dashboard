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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // toggle submenus
  const [isVetDataOpen, setIsVetDataOpen] = useState(false);
  const [isVetsOpen, setIsVetsOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);

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

  // Dropdown config arrays
  const vetDataDropdownItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="w-6 h-6 mr-2" />
    },
    {
      label: "Vets",
      icon: <FaClipboardList className="w-6 h-6 mr-2" />,
      children: [
        {
          label: "Vets List",
          path: "/dashboard/veterinary-list",
          icon: <FaFileAlt className="w-5 h-5 ml-2 mr-2" />
        },
        {
          label: "Vets Requests",
          path: "/dashboard/veterinary-request",
          icon: <FaEye className="w-5 h-5 ml-2 mr-2" />
        },
        {
          label: "Rejected Requests",
          path: "/dashboard/rejected-request",
          icon: <FaTrash className="w-5 h-5 ml-2 mr-2" />
        },
        {
          label: "Payment Requests",
          path: "/dashboard/paymentsRequest",
          icon: <FaIdBadge className="w-5 h-5 ml-2 mr-2" />
        }
      ]
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <FaPoll className="w-6 h-6 mr-2" />
    },
    {
      label: "Customers",
      path: "/dashboard/customers",
      icon: <FaUsers className="w-6 h-6 mr-2" />
    },
    {
      label: "Reports",
      icon: <FaChartSimple className="w-6 h-6 mr-2" />,
      children: [
        {
          label: "Vet Reports",
          path: "/dashboard/pending-vet-reports"
        },
        {
          label: "Total Orders Report",
          path: "/dashboard/total-orders"
        },
        {
          label: "Monthly Sales Report",
          path: "/dashboard/monthly-sales"
        },
        {
          label: "Customers Report",
          path: "/dashboard/customers-report"
        }
      ]
    }
  ];

  const customerDropdownItems = [
    { label: "Customer List", path: "/dashboard/customer-list" }
  ];

  const productsDropdownItems = [
    { label: "Product List", path: "/dashboard/product-list" },
    { label: "Add Product", path: "/dashboard/add-product" }
  ];

  const salesDropdownItems = [
    { label: "All Sales", path: "/dashboard/sales" },
    { label: "Refund Requests", path: "/dashboard/refund-requests" }
  ];

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-3 left-4 z-[9999] bg-white p-2 rounded shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-40 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={` 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 
        fixed md:static top-14 md:top-0 left-0 
        w-64 h-full bg-white z-40 transition-transform duration-300 ease-in-out 
        px-4 py-2 overflow-y-auto max-h-screen
      `}>
        <div className="my-1 mb-3">
          <img src={logo} alt="animeal-logo" className="w-50 h-10 object-contain" />
        </div>
        <hr />
        <ul className="mt-3 text-gray">

          {/* VETERINARIAN DATA DROPDOWN */}
          <li>
            <button
              className="px-3 flex justify-between items-center w-full text-left text-gray-600 hover:text-[#B72765] py-2 rounded hover:shadow"
              onClick={() => setIsVetDataOpen(!isVetDataOpen)}
            >
              <span className="flex items-center">
                <FaClipboardList className="w-6 h-6 mr-2" />
                Veterinarian Data
              </span>
              <FaCaretDown className={`transition-transform ${isVetDataOpen ? 'rotate-180' : ''}`} />
            </button>

            {isVetDataOpen && (
              <ul className="pl-4 mt-2 space-y-1">
                {vetDataDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    {item.children ? (
                      <>
                        <button
                          className="px-3 flex justify-between items-center w-full text-left text-gray-600 hover:text-[#B72765] py-2 rounded hover:shadow"
                          onClick={() => {
                            if (item.label === "Vets") setIsVetsOpen(!isVetsOpen);
                            else if (item.label === "Reports") setIsReportsOpen(!isReportsOpen);
                          }}
                        >
                          <span className="flex items-center">
                            {item.icon}
                            {item.label}
                          </span>
                          <FaCaretDown
                            className={`transition-transform ${
                              (item.label === "Vets" && isVetsOpen) || (item.label === "Reports" && isReportsOpen)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {(item.label === "Vets" && isVetsOpen) || (item.label === "Reports" && isReportsOpen) ? (
                          <ul className="pl-8 mt-2 space-y-1">
                            {item.children.map((child, i) => (
                              <li key={i}>
                                <Link to={child.path} className={subLinkClass(child.path)} onClick={handleLinkClick}>
                                  {child.icon}
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link to={item.path} className={linkClass(item.path)} onClick={handleLinkClick}>
                        {item.icon}
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* CUSTOMERS DROPDOWN */}
          <li>
            <button
              className="flex justify-between items-center w-full px-3 py-2 text-gray-600 hover:text-[#B72765] hover:shadow rounded"
              onClick={() => setIsCustomersOpen(!isCustomersOpen)}
            >
              <span className="flex items-center">
                <FaUsers className="w-6 h-6 mr-2" />
                Customers
              </span>
              <FaCaretDown className={`transition-transform ${isCustomersOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCustomersOpen && (
              <ul className="pl-8 mt-2 space-y-1">
                {customerDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} className={subLinkClass(item.path)} onClick={handleLinkClick}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* PRODUCTS DROPDOWN */}
          <li>
            <button
              className="flex justify-between items-center w-full px-3 py-2 text-gray-600 hover:text-[#B72765] hover:shadow rounded"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              <span className="flex items-center">
                <FaFileAlt className="w-6 h-6 mr-2" />
                Products
              </span>
              <FaCaretDown className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isProductsOpen && (
              <ul className="pl-8 mt-2 space-y-1">
                {productsDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} className={subLinkClass(item.path)} onClick={handleLinkClick}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* SALES DROPDOWN */}
          <li>
            <button
              className="flex justify-between items-center w-full px-3 py-2 text-gray-600 hover:text-[#B72765] hover:shadow rounded"
              onClick={() => setIsSalesOpen(!isSalesOpen)}
            >
              <span className="flex items-center">
                <FaChartSimple className="w-6 h-6 mr-2" />
                Sales
              </span>
              <FaCaretDown className={`transition-transform ${isSalesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSalesOpen && (
              <ul className="pl-8 mt-2 space-y-1">
                {salesDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} className={subLinkClass(item.path)} onClick={handleLinkClick}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;

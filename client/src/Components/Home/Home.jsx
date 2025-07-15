import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

function Home() {
  return (
    <div className="flex">
      {/* Sidebar always visible */}
      <div className="h-screen fixed top-0 left-0 bg-white shadow-md z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Navbar */}
        <Navbar />
      </div>
    </div>
  );
}

export default Home;

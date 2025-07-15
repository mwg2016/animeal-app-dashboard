import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActiveVets = () => {
    const [data, setData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const vetList = import.meta.env.VITE_VET_LIST; 

    useEffect(() => {
        axios
            .get(`${vetList}`)
            .then((response) => {
                const allVets = response.data;

                const activeVets = allVets.filter(vet => vet.approved === 'true');
                const inactiveVets = allVets.filter(vet =>
                    vet.approved === 'false' || vet.approved === 'pending'
                );
                
                const activeInactiveData = [
                    { name: 'Active Vets', value: activeVets.length },
                    { name: 'Inactive Vets', value: inactiveVets.length }
                ];

                const pendingData = [
                    { name: 'Pending Approve', value: inactiveVets.filter(vet => vet.approved === 'false').length },
                    { name: 'Rejected', value: allVets.filter(vet => vet.approved === 'pending').length }
                ];

                setData(activeInactiveData);
                setPendingData(pendingData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-orange-500 text-xl text-center">Loading chart...</div>;
    if (error) return <div className="text-red-500 text-xl text-center">{error.message} Error fetching data</div>;

    return (
        <div className="min-h-screen md:ml-64 pt-20 bg-gray-50 overflow-x-hidden">
            <div className="max-w-7xl mx-auto pt-2 px-3 py-2">
                <div className="flex flex-wrap justify-between gap-4">
                    {/* First Card */}
                    <div className="bg-white shadow-md rounded-xl p-6 w-full sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[48%] 2xl:w-[48%] mx-auto">
                        <h2 className="text-2xl font-semibold text-[#B72765] mb-4">Active Veterinarians</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? ' #B72765' : ' #BBBBBB'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Second Card */}
                    <div className="bg-white shadow-md rounded-xl p-6 w-full sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[48%] 2xl:w-[48%] mx-auto">
                        <h2 className="text-2xl font-semibold text-[#B72765] mb-4">Pending & Rejected Veterinarians</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pendingData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={90}
                                    innerRadius={60}
                                    dataKey="value"
                                >
                                    {pendingData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? ' #BBBBBB' : ' #B72765'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveVets;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const adminLogin = import.meta.env.VITE_ADMIN_LOGIN;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${adminLogin}`, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data) {
                toast.success('Login Successful!');
                dispatch(login(response.data.user));
                navigate('/dashboard');

            } else {

                toast.error('Invalid Credentials!');
            }
        } catch (error) {
            toast.error('Something went wrong, please try again later!');
            console.error("error", error.message);
        }
    };

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-50'>
            <form
                className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-300 p-8 px-8'
                onSubmit={handleSubmit}
            >
                <h2 className='text-4xl text-[#B72765] font-bold text-center'>SIGN IN</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input
                        className='rounded-lg bg-gray-100 mt-2 p-2 focus:bg-white focus:outline-none'
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input
                        className='p-2 rounded-lg bg-gray-100 mt-2 focus:bg-white focus:outline-none'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-between py-2 text-sm'>
                    <p className='cursor-pointer'>Forgot Password?</p>
                </div>
                <button
                    type='submit'
                    className='w-full my-5 py-2 bg-[#B72765] shadow-lg shadow-red-600/50 text-white font-semibold rounded-lg cursor-pointer'
                >
                    Login
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;

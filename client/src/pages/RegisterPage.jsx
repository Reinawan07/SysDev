import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function RegisterPage() {
    const [input, setInput] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        age: "",
    });

    const navigate = useNavigate();

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords do not match",
            });
            return;
        }
        try {
            const { data } = await axios({
                method: "post",
                url: "http://localhost:3000/register",
                data: input,
            });

            localStorage.access_token = data.access_token;

            Swal.fire({
                title: "SUCCESS",
                icon: "success",
                text: "REGISTER SUCCESS",
            });

            navigate("/login");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Form Register</h2>

                    <form onSubmit={handleSubmitForm} className="mt-10 space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    required
                                    onChange={handleChangeInput}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChangeInput}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    onChange={handleChangeInput}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                            <div className="mt-2">
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    required
                                    onChange={handleChangeInput}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
                    </p>
                </div>
            </div>
        </>

    )

}

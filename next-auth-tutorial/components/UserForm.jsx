'use client';

import { useRouter } from "next/navigation";
import React, { useState }  from "react";

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "Content-Type": "application/json",
        })

        if (res.ok) {
            router.refresh();
            router.push("/");
            return;    
        }

        const response = await res.json();
        setErrorMessage(response.message);
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
                <h1>Create New User</h1>
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" onChange={handleChange} value={formData.name} className="m-2 bg-slate-400 rounded" required />
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="text" onChange={handleChange} value={formData.email} className="m-2 bg-slate-400 rounded" required />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={handleChange} value={formData.password} className="m-2 bg-slate-400 rounded" required />
                <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100"/>
            </form>
            {errorMessage && (<p className="text-red-500">${errorMessage}</p>)}
        </>
    )
}

export default UserForm;
import React, { useState, ChangeEvent } from "react";
import { Credentials } from "../utils/types";
import { loginApi } from "../utils/apiCalls";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState<Credentials>({
        email: "abc12@mail.com",
        password: "abcd12",
    });
    const { email, password } = credentials;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await loginApi(credentials);
        localStorage.setItem("token", data.token);
        setTimeout(() => localStorage.removeItem("token"), 60 * 60 * 1000);
        dispatch(login(email));
        navigate("/home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 bg-base-100 rounded-xl shadow-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Login Form
                </h1>

                <div className="form-control mb-4">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input input-bordered"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control mb-6">
                    <label className="label" htmlFor="password">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="input input-bordered"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary w-full" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

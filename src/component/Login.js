import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import "../css/Login.css"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loader from './Loader';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleAction = async () => {
        setLoading(true);

        const apiUrl = isLogin ? '/login' : '/signup';
        const requestData = {
            email,
            password,
            username: isLogin ? undefined : username
        };

        try {
            const response = await axios.post(apiUrl, requestData);
            const user = response.data.user;
            dispatch({
                type: "set-user",
                payload: user
            })
            toast.success('Login Successful', {
                position: toast.POSITION.TOP_CENTER,
            }, { autoClose: 2000 });
            navigate(`/${user._id}`);
            if (response.data.token) {
                localStorage.setItem("authToken", true);
            }

        } catch (error) {
            toast.error('Invalid Email and Password', {
                position: toast.POSITION.TOP_CENTER,
            }, { autoClose: 2000 });
            console.error('An unexpected error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (

                <div className="login-container">

                    <div className="toggle-container">
                        <button className={isLogin ? 'active' : ''} onClick={handleToggle}>
                            Login
                        </button>
                        <button className={!isLogin ? 'active' : ''} onClick={handleToggle}>
                            Signup
                        </button>
                    </div>
                    <form className={`login-form ${isLogin ? 'login' : 'signup'}`}>
                        {isLogin || (
                            <>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </>
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="button" onClick={handleAction}>
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                    </form>
                </div>)}
        </>
    );
}

export default Login;

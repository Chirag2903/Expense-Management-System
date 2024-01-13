import React from 'react';
import "../css/Header.css";
import { useNavigate } from 'react-router';
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            toast.success('Logout Successful', {
                position: toast.POSITION.TOP_CENTER,
            }, { autoClose: 2000 });
            navigate('/');
            dispatch({ type: 'LOGOUT' });

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='header'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Header;

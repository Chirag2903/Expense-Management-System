import React, { useEffect } from 'react'
import "../css/Intro.css"
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Intro = () => {

    useEffect(() => {

        const options = {
            strings: ["Track Your Expenses", "Manage Your Finances", "Budget Wisely"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
        };

        const typed = new Typed(".typed-text", options);

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <div className='intro'>
                <div className='container-1'>
                    <span className="typed-text"></span>
                    <br></br>
                    <h1>IMPROVE YOUR CASH FLOW WITH THE BEST MONEY MANAGEMENT SOFTWARE</h1>
                    <Link to={'/login'}><button>Let's Get started →</button></Link>
                </div>
                <div className='container-2'>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Intro
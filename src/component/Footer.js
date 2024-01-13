import React from 'react'
import "../css/Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftfooter">
                <h4><img width="40" height="40" src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" />Contact Me</h4>
                <a href='mailto:chiragshukla135@gmail.com'><p>chiragshukla135@gmail.com</p></a>

            </div>

            <div className="midfooter">
                <h1>Chirag Shukla</h1>
                <p>Copyrights 2023 &copy; cS_Chirag </p>
            </div>

            <div className="rightfooter">
                <h4>
                    Explore My Work
                </h4>
                <a href='https://github.com/Chirag2903'><img width="60" height="60" src="https://img.icons8.com/nolan/64/github.png" alt="github" />Github</a>
                <a href='https://www.linkedin.com/in/cschirag2903/'><img width="48" height="48" src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin" />LinkedIn</a>
            </div>

        </footer>
    )
}

export default Footer
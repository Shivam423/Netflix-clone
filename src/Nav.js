import React, { useEffect, useState } from 'react';
import avatarlogo from "./images/Netflix-avatar.png";

const Nav = () => {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);
    return (
        <>
            <div className={`nav ${show && "nav_black"}`}>
                <img className="nav_logo" src="http://pngimg.com/uploads/netflix/small/netflix_PNG12.png" alt="" />

                <img className="nav_avatar" src={avatarlogo} alt="" />
            </div>
        </>
    )
}

export default Nav

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to PropertyQR</h1>
            <p>Manage your property listings and access information easily with QR codes.</p>
            <div className="home-actions">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/create-account">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

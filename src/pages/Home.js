import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to PropertyQR</h1>
            <p>Manage your property listings and access information easily with QR codes.</p>
            <div className="home-actions">
                <Link to="/login">
                    <button>Let's get started</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListingForm from "./ListingForm";
import ListingDetails from "./ListingDetails";
import { deleteListing } from "../../redux/listingsSlice";
import { useNavigate } from "react-router-dom";
import QRCodeGenerator from "./QRCodeGenerator";

const DeveloperDashboard = () => {
    const listings = useSelector((state) => state.listings.listings);
    const [isEditing, setIsEditing] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setCurrentUser(user);
       // console.log("User Info:", user); // Log user info to console
    }, []);

    const currentUrl = window.location.origin;
   // console.log(window.location.origin);

    const handleDelete = (id) => {
        dispatch(deleteListing(id));
    };

    return (
        <div>
            <h1>Welcome, {currentUser.brandName}.</h1>
            <h2>Your Listings</h2>
            <button onClick={() => setIsEditing({})}>Add New Listing</button>

            {isEditing && (
                <ListingForm
                    initialData={isEditing}
                    onClose={() => setIsEditing(null)}
                />
            )}

            {listings.map((listing) => (
                <div key={listing.id}>
                    <h3>{listing.name}</h3>
                    <p>Price: {listing.price}</p>
                    <p>Contact: {listing.contact}</p>
                    <button onClick={() => navigate(`/listing/${listing.id}`)}>
                        View
                    </button>
                    <button onClick={() => setIsEditing(listing)}>Edit</button>
                    <button onClick={() => handleDelete(listing.id)}>Delete</button>

                    <div>
                        <QRCodeGenerator
                            url={`${currentUrl}/${currentUser.brandName}/${listing.id}`} // Change to localhost for local testing
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeveloperDashboard;

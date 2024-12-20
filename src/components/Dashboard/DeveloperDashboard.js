import React, { useEffect, useState } from "react";
import ListingForm from "./ListingForm";
import QRCodeGenerator from "./QRCodeGenerator";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const DeveloperDashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [isAddingListing, setIsAddingListing] = useState(false); // Track form visibility
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const currentUrl = window.location.origin;



    useEffect(() => {
        const fetchCurrentUser = async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser({
                        userId: user.uid,
                        email: user.email,
                        brandName: userDoc.data().brandName || "DefaultBrand",
                    });
                } else {
                    console.error("User document not found in Firestore");
                }
            }
        };

        const fetchListings = async (user) => {
            if (user) {
                const q = query(
                    collection(db, "listings"),
                    where("ownerId", "==", user.uid)
                );
                const snapshot = await getDocs(q);
                const userListings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setListings(userListings);
            }
        };

        const listenToAuthChanges = () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setIsLoading(true);
                    await fetchCurrentUser(user);
                    await fetchListings(user);
                } else {
                    navigate("/login");
                }
                setIsLoading(false);
            });
        };

        listenToAuthChanges();
    }, [navigate]);

    const handleAddListing = () => {
        setIsAddingListing(true);
    };

    const handleFormClose = () => {
        setIsAddingListing(false);
    };

    const refreshListings = async () => {
        if (currentUser) {
            const q = query(
                collection(db, "listings"),
                where("ownerId", "==", currentUser.userId)
            );
            const snapshot = await getDocs(q);
            const listingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setListings(listingsData);
        }
    };

    const logout = async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.error(err);
        }
      };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <button type="button" onClick={logout}>log out</button>
            <h1>Welcome, {currentUser?.brandName}.</h1>
            <h2>Your Listings</h2>
            <button onClick={handleAddListing}>Add New Listing</button>

            {/* Conditionally render the ListingForm */}
            {isAddingListing && (
                <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
                    <h3>Add a New Listing</h3>
                    <ListingForm onClose={handleFormClose} id={currentUser.uid} refreshListings={refreshListings} />
                </div>
            )}

            {listings.length === 0 ? (
                <p>No listings found. Add a new listing to get started!</p>
            ) : (
                listings.map((listing) => (
                    <div key={listing.id}>
                        <h3>{listing.name}</h3>
                        <p>Price: {listing.price}</p>
                        <p>Contact: {listing.contact}</p>
                        <button onClick={() => navigate(`/listing/${listing.id}`)}>View</button>

                        <div>
                            <QRCodeGenerator
                                url={`${currentUrl}/${currentUser?.brandName.replace(/\s+/g, '')}/${listing.id}`}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DeveloperDashboard;

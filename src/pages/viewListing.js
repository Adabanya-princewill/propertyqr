import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ViewListing = () => {
    const { brandName, listingId } = useParams(); // Get brandName and listingId from URL params
    const [listing, setListing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listingDocRef = doc(db, 'listings', listingId);
                const listingDoc = await getDoc(listingDocRef);
                if (listingDoc.exists()) {
                    setListing({ id: listingDoc.id, ...listingDoc.data() });
                } else {
                    setError("Listing not found");
                }
            } catch (err) {
                console.error("Error fetching listing:", err);
                setError("Error fetching listing");
            } finally {
                setIsLoading(false);
            }
        };

        fetchListing();
    }, [listingId]);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    if (!listing) {
        return <p>Listing not found.</p>;
    }

    return (
        <div>
            <h2>Property Details for {listing.name}</h2>
            <p><strong>Brand Name:</strong> {brandName.replace(/([A-Z])/g, ' $1').trim()}</p> {/* Format brand name */}
            <p><strong>Price:</strong> {listing.price}</p>
            <p><strong>Location:</strong> {listing.location}</p>
            <p><strong>Contact:</strong> {listing.contact}</p>
            <p><strong>Description:</strong> {listing.description}</p>
        </div>
    );
};

export default ViewListing;
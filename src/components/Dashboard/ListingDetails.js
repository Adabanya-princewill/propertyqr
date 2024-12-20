import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ListingDetails = () => {
    const { listingId } = useParams(); // Get listingId from URL params
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

    return (
        <div>
            <h2>Listing Details</h2>
            <p>Listing ID: {listing.id}</p>
            <p>Price: {listing.price}</p>
            <p>Contact: {listing.contact}</p>
            <p>Description: {listing.description}</p>
            {/* Add other listing details here */}
        </div>
    );
};

export default ListingDetails;
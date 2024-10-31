import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ListingDetails = () => {
    const { listingId } = useParams();
    const listing = useSelector((state) =>
        state.listings.listings.find((item) => item.id.toString() === listingId)
    );

    if (!listing) {
        return <p>Listing not found</p>;
    }

    return (
        <div>
            <h2>Listing Details</h2>
            <p>Listing ID: {listingId}</p>
            <p>Price: {listing.price}</p>
            <p>Contact: {listing.contact}</p>
            <p>Description: {listing.description}</p>
            {/* Add other listing details here */}
        </div>
    );
};

export default ListingDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewListing = () => {
  const { brandName, listingId } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const listingsData = JSON.parse(localStorage.getItem('listings')) || [];
    console.log("Retrieved listings data:", listingsData);

    // Find the matching listing by brandName and listingId
    const matchedListing = listingsData.find(
      (item) => item.brandName === brandName && item.id === parseInt(listingId)
    );

    console.log("Matched Listing:", matchedListing);
    setListing(matchedListing);
  }, [brandName, listingId]);

  if (!listing) {
    return <p>Listing not found. </p>;
  }

  return (
    <div>
      <h2>Property Details for {listing.name}</h2>
      <p><strong>Brand Name:</strong> {listing.brandName}</p>
      <p><strong>Price:</strong> {listing.price}</p>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Contact:</strong> {listing.contact}</p>
      <p><strong>Description:</strong> {listing.description}</p>
    </div>
  );
};

export default ViewListing;

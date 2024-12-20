import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { saveListing } from "../../redux/realtorSlice";

const RealtorDashboard = () => {
  // const savedListings = useSelector((state) => state.realtor.savedListings);
  // const dispatch = useDispatch();

  // const handleScan = () => {
  //   const listing = { id: "1234", name: "Sample Property", url: "propertyqr.com/sample/1234" };
  //   dispatch(saveListing(listing));
  // };

  return (
    <div>
      <h2>Realtor Dashboard</h2>
      <button>Scan QR Code</button>
      <div>
        {/* {savedListings.map((listing) => (
          <div key={listing.id}>
            <h3>{listing.name}</h3>
            <p>URL: {listing.url}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default RealtorDashboard;

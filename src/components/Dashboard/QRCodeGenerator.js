import React from "react";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({url}) => {
  //const listing = useSelector((state) => state.listings.currentListing);

  return (
    <div>
      <h3>QR Code for Listing</h3>
       <QRCodeCanvas value={url} size={128} style={{ marginTop: "10px" }} />
    </div>
  );
};

export default QRCodeGenerator;

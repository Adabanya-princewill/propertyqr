import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({url}) => {

  return (
    <div>
      <h3>QR Code for Listing</h3>
       <QRCodeCanvas value={url} size={128} style={{ marginTop: "10px" }} />
    </div>
  );
};

export default QRCodeGenerator;

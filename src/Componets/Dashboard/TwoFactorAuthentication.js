import React, { useState } from 'react';
import QRCodeReader from 'react-qrcode-reader';
import QRCode from 'qrcode.react';
function TwoFactorAuthentication() {
  const [qrCodeData, setQRCodeData] = useState('');
  
  const [enteredCode, setEnteredCode] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQRCodeData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleEnable2FA = () => {
    // Logic to enable 2FA
    setIs2FAEnabled(true);
    
    // Send qrCodeData to server for verification
    fetch('/enable-2fa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qrCodeData }),
    })
    .then(response => {
      if (response.ok) {
        // Handle successful response (e.g., show success message)
        console.log('2FA enabled successfully');
      } else {
        // Handle error response (e.g., show error message)
        console.error('Error enabling 2FA');
      }
    })
    .catch(error => {
      console.error('Error enabling 2FA:', error);
    });
  };
  

  return (
<div className="two-factor-authentication-container ">
      {!is2FAEnabled ? (
        <div className="install-authenticator-container bg-secondary">
          <h2 className='text-white'>Install Google Authenticator</h2>
          <QRCodeReader onScan={handleScan} onError={handleError} />
          <button onClick={handleEnable2FA} className="enable-2fa-button">Enable 2FA</button>

        </div>
      ) : (
        <div className="enter-2fa-code-container bg-secondary">
          <h2 className='text-white'>Enter 2-FA Code from App</h2>
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            className="fa-input"
          />
          <button className="verify-button tex-white">Verify</button>
          <div className="qr-code-container">
            <h2>Scan QR or Enter Code</h2>
            <QRCode value={qrCodeData} />
            <p>Scan this QR code using Google Authenticator app.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TwoFactorAuthentication;

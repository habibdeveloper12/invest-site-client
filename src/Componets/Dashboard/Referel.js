import React, { useState } from 'react';

const Referel = () => {
  const [referralLink, setReferralLink] = useState('https://NexGenInvest.net/?ref=1710521762');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => alert('Referral link copied to clipboard'))
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <div className="row row-cols-1 row-cols-md-1 g-3">
      <div className="col">
        <div className="card h-75 bg-secondary">
          <div className="card-body">
            <h5 className="card-title text-white">Total Referral Commission</h5>
            <h2 className='text-white'>$0.00</h2>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-75 bg-secondary">
          <div className="card-body">
            <h5 className="card-title text-white">Referral Link</h5>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={referralLink} readOnly />
              <button className="btn btn-warning" type="button" onClick={copyToClipboard}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                  <path d="M5.5 1a.5.5 0 0 0-.5.5V2h-2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2V1.5a.5.5 0 0 0-.5-.5h-3zM4 3h8v1H4V3zm8 1V4H4v1h8z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referel;

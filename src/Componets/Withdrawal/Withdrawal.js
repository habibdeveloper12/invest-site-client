import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import Swal from 'sweetalert2';

const WithdrawalPage = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState(''); // Corrected typo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userWallet, setUserWallet] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);

    if (user) {
      const userEmail = user.email;
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5003/api/v1/user/singleByEmail/${userEmail}`);
          if (response.data.success) {
            setUserWallet(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5003/api/v1/order/withdraw', {
        userEmail: user.email,
        withdrawalAmount: parseFloat(withdrawalAmount),
        withdrawalMethod:withdrawalMethod,
        withdrawalAddress: withdrawalAddress
      });

      console.log('Response:', response);

      if (response.data.success) {
        setUserWallet(prevWallet => ({
          ...prevWallet,
          wallet: (prevWallet.wallet || 0) - parseFloat(withdrawalAmount)
        }));
        setWithdrawalAmount('');
        setWithdrawalMethod('');
        setWithdrawalAddress('');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Withdrawal request submitted successfully!'
        });
      } else {
        setError(response.data.message || 'Failed to submit withdrawal request.');
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      setError('Failed to submit withdrawal request. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Withdrawal</h2>
              <div className="mb-3">
                <h4 className="text-center">Current Balance:</h4>
                <h5 className="text-center">${userWallet.wallet || "0.00"}</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="withdrawalAmount">Withdrawal Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdrawalAmount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    required
                  />
                  <label htmlFor="withdrawalMethod ">Enter Your Withdrawal Method:</label>
                  <input
                  placeholder="Supported: BTC, USDT, TRON, ETH, DOGE, SOL"
                    type="text"
                    className="form-control"
                    id="withdrawalAddress"
                    value={withdrawalMethod}
                    onChange={(e) => setWithdrawalMethod(e.target.value)}
                    required
                  />
                  <label htmlFor="withdrawalAddress">Enter Your Withdrawal Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="withdrawalAddress"
                    value={withdrawalAddress}
                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Submit</button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;

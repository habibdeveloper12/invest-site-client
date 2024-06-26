import React, { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const ReinvestBalance = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [depositOrders, setDepositOrders] = useState({});
  const [depositTotalAmount, setAllDepositTotalAmount] = useState([]);
  const [depositEarning, setDepositEarning] = useState([]);
  const [depositTotalEarning, setDepositTotalEarning] = useState([]);

  const [depositTotalAmoun, setDepositTotalAmount] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/v1/user/singleByEmail/${userEmail}`
        );
        if (response.data.success) {
          setDepositOrders(response.data.user);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <div class="row row-cols-1 row-cols-md-1 g-3">
      <div class="col">
        <div class="card h-75 bg-secondary">
          <div class="card-body">
            <h3 class="card-title text-white">Your balance is empty.</h3>
            <p className="text-white">
              You do not have any coins on your balance available for
              withdrawal. They will appear after the first accruals on your
              deposits.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-75 bg-secondary">
          <div class="card-body">
            <div className="row ">
              <div className="col-2">
                <img
                  src="../calculator.svg"
                  alt="Logo"
                  style={{
                    width: "20%",
                    height: "auto",
                    marginRight: "-130px",
                  }}
                />
              </div>
              <div className="col-4 text">
                <h3 className="">Reinvestment Calculator</h3>
              </div>
            </div>
            <div class="container text-center">
              <div class="row row-cols-4">
                <div class="card-body">
                  <h5 class="card-title text-white">Investment</h5>
                  <h2 className="text-white">
                    ${depositOrders.plan?.planPrice | "0.00"}
                  </h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-white">Daily Earnings</h5>
                  <h2 className="text-white">
                    ${depositOrders.plan?.profit | "0.00"}
                  </h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-white">Total Earnings</h5>
                  <h2 className="text-white">
                    ${depositOrders?.wallet | "0.00"}
                  </h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-white">Total Return</h5>
                  <h2 className="text-white">
                    ${depositOrders?.return | "0.00"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReinvestBalance;

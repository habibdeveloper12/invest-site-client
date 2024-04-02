import React, { useState, useEffect } from 'react';
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [depositOrders, setDepositOrders] = useState([]);
  const [depositTotalAmount, setAllDepositTotalAmount] = useState([]);
  const [depositTotalSum, setAllDepositTotalSum] = useState([]);
  const [user] = useAuthState(auth);
  const [userBalance, setUserBalance] = useState(0);
  const [userWallet, setUserWallet] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      
      const userEmail = user.email;
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5003/api/v1/user/singleByEmail/${userEmail}`);
          if (response.data.success) {
            setUserWallet(response.data.user);
            console.log(response.data)
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }

      const fetchDepositOrders = async () => {
          try {
              if (!user) return;
              const response = await axios.get(`http://localhost:5003/api/v1/order/deposit-orders/${user.email}/`);
              console.log('response', response.data.deposits);
              setDepositOrders(response.data.deposits);
              response.data.deposits.forEach(deposit => {
                console.log(deposit.depositAmount);
                setAllDepositTotalAmount(deposit.depositAmount);
                
              });
              
              let sum = 0;
      response.data.deposits.forEach(deposit => {
        console.log(deposit.depositAmount);
        if (deposit.status === 'Complete') {
          sum += deposit.depositAmount;
        }
      });
      console.log('Total sum of deposit amounts for completed deposits:', sum);
      setAllDepositTotalSum(sum);
         setIsLoading(false);
          } catch (error) {
              console.error('Error fetching deposit orders:', error);
              setIsLoading(false);
          }
      };

      fetchDepositOrders();
  },[user]);

  



  return (
<div>
  
<div class="row row-cols-1 row-cols-md-4 g-3">
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Account Balance</h5>
        <h2 className='text-white'>${userWallet?.wallet ||"0.00"}</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Active Deposits</h5>
        <h2 className='text-white'>$ {depositTotalAmount |"0.00"}</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Latest Deposit</h5>
        <h2 className='text-white'>${depositTotalAmount |"0.00"}</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Deposited Total</h5>
        <h2 className='text-white'>${depositTotalSum ||"0.00"}</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Total Earned</h5>
        <h2 className='text-white'>$0.00</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Pending Withdrawals</h5>
        <h2 className='text-white'>$0.00</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Total Withdrawn</h5>
        <h2 className='text-white'>$0.00</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-75 bg-secondary">
      <div class="card-body">
        <h5 class="card-title text-white">Latest Withdrawal</h5>
        <h2 className='text-white'>$0.00</h2>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</div>
<div class="col">
    <div class="" >
      <div class="card-body">
      <div className='col-8 bg-secondary' style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '18px' }}>
      <h3 className=' pb-3 text-warning'>Accepted Payments</h3>
      <div class="container text-center">
  <div class="row">
  <div class="col">
<div className='d-flex'>
<div>
<img
                src="../btc.svg"
                alt="Logo"
                style={{ width: "40%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">Bitcoin</p>
      </div>
</div>
    </div>
    <div class="col">
      <div className='d-flex'>
<div>
<img
                src="../ltc.svg"
                alt="Logo"
                style={{ width: "40%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">Litecoin</p>
      </div>
</div>
</div>
    <div class="col">      
     <div className='d-flex'>
<div>
<img
                src="../bnb.svg"
                alt="Logo"
                style={{ width: "35%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">BNB Ethereum</p>
      </div>
</div>
</div>
    <div class="col">
    <div className='d-flex'>
<div>
<img
                src="../eth.svg"
                alt="Logo"
                style={{ width: "35%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">Ethereum</p>
      </div>
</div>
    </div>
  </div>
  <div class="row">
  <div class="col">
    
     <div className='d-flex'>
<div>
<img
                src="../doge.svg"
                alt="Logo"
                style={{ width: "35%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white"> Dogecoin</p>
      </div>
</div></div>
    <div class="col">
     <div className='d-flex'>
<div>
<img
                src="../trx.svg"
                alt="Logo"
                style={{ width: "35%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white"> Tron </p>
      </div>
</div>
       </div>
    <div class="col">
 
      <div className='d-flex'>
<div>
<img
                src="../sol.svg"
                alt="Logo"
                style={{ width: "35%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">      Solana </p>
      </div>
</div></div>
    <div class="col">
<div className='d-flex'>
<div>
<img
                src="../usdt.svg"
                alt="Logo"
                style={{ width: "40%", height: "auto" }}
              />
</div>
      <div>
      <p className="text-white">Tether USDT</p>
      </div>
</div>
    </div>
  </div>
</div>

    </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default DashboardDetailPage;

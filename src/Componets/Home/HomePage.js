import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import RequireAuth from "../hooks/RequireAuth";
import axios from "axios";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";

function Homepage({
  overallProfit,
  totalProfit,
  dailyProfit,
  roi,
  earlyReturnFee,
  qrCode,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupa, setShowPopupa] = useState(false);
  const [showPopupb, setShowPopupb] = useState(false);
  const [showPopupc, setShowPopupc] = useState(false);
  const [copied, setCopied] = useState(false);
  const [depositMethod, setDepositMethod] = useState("");
  const [address, setAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [exactAmount, setExactAmount] = useState("");
  const [user] = useAuthState(auth);
  const [exactAmount200, setExactAmount200] = useState("");
  const [exactAmount500, setExactAmount500] = useState("");
  const [exactAmount1000, setExactAmount1000] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [totalProfitt, setTotalProfitt] = useState(0);
  const [id, setId] = useState(null);
  const [loading, seLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [planMembership, setPlanMembership] = useState({});
  const handleInvestmentChange = (e) => {
    const amount = parseFloat(e.target.value);

    // Calculate profit based on the selected investment amount
    const profitPercentage = 0.85; // 85%
    const profit = amount * profitPercentage;
    const total = amount + profit;
    setTotalProfitt(total);
    setInvestmentAmount(amount);
  };
  const plan = [
    {
      planName: "plan1",
      planPrice: 50,
      duration: 7,
      profit: 2,
    },
    {
      planName: "plan2",
      planPrice: 200,
      duration: 14,
      profit: 20,
    },
    {
      planName: "plan3",
      planPrice: 500,
      duration: 20,
      profit: 50,
    },
    {
      planName: "plan4",
      planPrice: 1000,
      duration: 30,
      profit: 100,
    },
  ];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleShowPopup = (price) => {
    setShowPopup(true);
    setAmount(price);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setDepositMethod("");
    setAddress("");
  };

  const handleShowPopupa = (price) => {
    setShowPopupa(true);
    setAmount(price);
  };

  const handleClosePopupa = () => {
    setShowPopupa(false);
  };
  const handleShowPopupb = (price) => {
    setShowPopupb(true);
    setAmount(price);
  };

  const handleClosePopupb = () => {
    setShowPopupb(false);
  };
  const handleShowPopupc = (price) => {
    setShowPopupc(true);
    setAmount(price);
  };

  const handleClosePopupc = () => {
    setShowPopupc(false);
  };
  const fetchAddressOF = async (depositMethod, amount) => {
    try {
      seLoading(true);
      const response = await axios.post(
        `http://localhost:5003/api/v1/order/request-orders/${user?.email}`,
        { depositMethod, amount }
      );
      if (response.data.success) {
        setId(response.data.data.payment_id);
        console.log(response.data.data.pay_address);
        setAddress(response.data.data.pay_address);
        setExactAmount200(response.data.data.pay_amount);
        setExactAmount(response.data.data.pay_amount);
        setExactAmount500(response.data.data.pay_amount);
        setExactAmount1000(response.data.data.pay_amount);
        seLoading(false);
      }
    } catch (error) {
      seLoading(false);
      console.error("Error fetching user profile:", error);
    }
  };
  console.log(depositMethod);

  const fetchAddress = async () => {
    if (depositMethod) {
      fetchAddressOF(depositMethod, amount);
    }
  };
  useEffect(() => {
    if (depositMethod) {
      fetchAddress();
    }
  }, [depositMethod]);

  const handleDepositMethodChange = (event) => {
    setDepositMethod(event.target.value);
    setAddress("");
  };

  const handleSubmit = async (plan) => {
    try {
      const depositData = {
        plan,
        depositAmount: amount,
        depositMethod,

        email: user?.email,
      };
      const responsePayment = await axios.post(
        `http://localhost:5003/api/v1/order/payment-status/${id}/`
      );
      console.log(responsePayment);
      if (responsePayment.data) {
        const response = await axios.post(
          "http://localhost:5003/api/v1/order/deposit-create",
          depositData
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Deposit request submitted successfully!",
        });
      }
      // console.log("Deposit order created:", response.data);
      handleClosePopup();
    } catch (error) {
      console.error("Error creating deposit order:", error);
    }
    setTransactionId("");
  };
  const handleSubmita = async () => {
    try {
      const depositData = {
        planName: "Dynamic Surge", // Replace with the actual plan name
        depositAmount: 200, // Replace with the actual deposit amount
        depositMethod, // Assuming depositMethod is already set in state
        transactionId,
        email: user?.email,
      };
      console.log(depositData);
      const response = await axios.post(
        "http://localhost:5003/api/v1/order/deposit-create",
        depositData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Deposit request submitted successfully!",
      });
      handleClosePopupa();
    } catch (error) {
      console.error("Error creating deposit order:", error);
    }
    setTransactionId("");
  };
  const handleSubmitb = async () => {
    try {
      const depositData = {
        planName: "Expansion DeFi", // Replace with the actual plan name
        depositAmount: 500, // Replace with the actual deposit amount
        depositMethod, // Assuming depositMethod is already set in state
        transactionId,
        email: user?.email,
      };
      console.log(depositData);
      const response = await axios.post(
        "http://localhost:5003/api/v1/order/deposit-create",
        depositData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Deposit request submitted successfully!",
      });
      console.log("Deposit order created:", response.data);
      handleClosePopupb();
    } catch (error) {
      console.error("Error creating deposit order:", error);
    }
    setTransactionId("");
  };
  const handleSubmitc = async () => {
    try {
      const depositData = {
        planName: "ICO Innovator",
        depositAmount: 1000,
        depositMethod,
        transactionId,
        email: user?.email,
      };
      console.log(depositData);
      const response = await axios.post(
        "http://localhost:5003/api/v1/order/deposit-create",
        depositData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Deposit request submitted successfully!",
      });
      console.log("Deposit order created:", response.data);
      handleClosePopupc();
    } catch (error) {
      console.error("Error creating deposit order:", error);
    }
    setTransactionId("");
  };
  return (
    <>
      <div class="navcolor">
        <div class="row  navcolor">
          <div className="dflex">
            <div class="col-md-6  boxshadow">
              <div class="px-4 mt-5 pt-5">
                <h2 class="welcome-message text">
                  <span class="text-warning">Welcome to NexGen Invest</span>:
                  The Future of Crypto Investment Awaits
                </h2>
                <p class="text">
                  Dive into the next generation of cryptocurrency investment
                  with NexGen Invest. Our innovative platform unlocks the door
                  to strategic, high-return investment opportunities in the
                  dynamic world of crypto. Whether you're a seasoned investor or
                  new to the crypto scene, we're here to guide you to financial
                  success.
                </p>
                <ul class="text">
                  <li>
                    Strategic Investment Plans tailored for every level of risk
                    and reward.
                  </li>
                  <li>
                    Real-Time Transparency for effortless portfolio management.
                  </li>
                  <li>
                    Flexible Withdrawals to keep you in control of your
                    earnings.
                  </li>
                  <li>
                    State-of-the-Art Security protecting your investment every
                    step of the way.
                  </li>
                </ul>
                <p class="text pb-3">
                  Join us and shape your financial future with investments that
                  transcend traditional boundaries. Your journey with NexGen
                  Invest starts now.
                </p>
                {/* <button class='btn btn-warning my-5 float-left'>Company Presentation</button> */}
              </div>
            </div>
            <div className="container mt-5 pt-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="card bg-dark text-white">
                    <div className="card-body">
                      <h3 className="card-title">Investment Calculator</h3>
                      <p className="card-text">Choose your investment plan:</p>
                      <select
                        className="form-select mb-3"
                        onChange={handleInvestmentChange}
                      >
                        <option value="50">$50</option>
                        <option value="200">$200</option>
                        <option value="500">$500</option>
                        <option value="1000">$1000</option>
                      </select>
                      <label
                        htmlFor="investmentAmount"
                        className="form-label text-white"
                      >
                        Enter the amount of your investment:
                      </label>
                      <input
                        id="investmentAmount"
                        type="number"
                        className="form-control mb-3"
                        placeholder="Enter amount"
                        onChange={handleInvestmentChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card bg-dark text-white">
                    <div className="card-body">
                      <h5 className="card-title">Your total profit:</h5>
                      <h2 className="card-text text-warning">
                        ${totalProfitt.toFixed(2)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* plan list start */}

        <div className="container ">
          <h2 className="text-warning mt-3">Investment Plans</h2>
          <div class="col-md-12 mt-5">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card bg-warning mb-3 custom-card">
                  <div class="card ">
                    <div class="card-body planc">
                      <h5 class="card-title custom-card-title">
                        Sprint Crypto
                      </h5>
                      <p class="card-text custom-card-text">
                        <strong>Global Profit:</strong> 20-30%
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Investment Plan Duration:</strong> 7 days
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Minimum investment amount:</strong>
                      </p>
                      <span className="fw-bold fs-2 text-success">$50</span>
                      <p class="card-text custom-card-text text">
                        <strong>Description:</strong> Sprint Crypto offers an
                        immersion into the world of arbitrage and high-frequency
                        trading, targeting the high volatility phases of the
                        cryptocurrency market. By entrusting our team with your
                        capital, you benefit from an agile strategy aimed at
                        rapid returns. Our expertise works for you, maximizing
                        opportunities without you having to follow the markets
                        minute by minute.
                      </p>

                      <Button
                        href="#"
                        className="btn btn-warning"
                        onClick={() => handleShowPopup(50)}
                      >
                        Deposit Now
                      </Button>

                      {showPopup && (
                        <div className="popup-container">
                          <div className="popup">
                            <span className="close" onClick={handleClosePopup}>
                              &times;
                            </span>

                            <div className="deposit-summary">
                              <h3 className="text-secondary">
                                Deposit Summary
                              </h3>
                              <p>
                                <strong>Plan Selected:</strong> Sprint Crypto
                              </p>
                              <p>
                                <strong>Overall Profit:</strong> {overallProfit}
                                20% (Plan Duration: 7 days)
                              </p>
                              <p>
                                <strong>Total Profit:</strong> $15
                              </p>
                              <p>
                                <strong>Profit Calculation:</strong>{" "}
                                {dailyProfit} (Daily)
                              </p>
                              <p>
                                <strong>Return on Investment:</strong> $65
                              </p>
                              <p>
                                <strong>Early Return of Investment:</strong>{" "}
                                Possible at any time for a {earlyReturnFee}% fee
                              </p>
                              <p>
                                <strong>Amount Deposited:</strong> $50
                              </p>
                              <p>
                                <strong>Deposit Method:</strong>{" "}
                                <select
                                  value={depositMethod}
                                  onChange={handleDepositMethodChange}
                                >
                                  <option value="">
                                    Select Deposit Method
                                  </option>
                                  <option value="btc">Bitcoin (BTC)</option>
                                  <option value="tusd">Tether (USDT)</option>
                                  <option value="eth">Etheriam (ETH)</option>
                                </select>
                              </p>
                              <div className="deposit-address">
                                <p>
                                  <strong className="pe-2">
                                    Deposit Address:
                                  </strong>
                                  <span className="highlighted-address text-white">
                                    {address}
                                  </span>
                                  <span
                                    className="copy-address-btn"
                                    onClick={copyToClipboard}
                                  >
                                    {copied ? "Copied!" : "Copy Address"}
                                  </span>
                                </p>
                              </div>
                              <p>
                                <strong>Exact Amount:</strong> {exactAmount}
                              </p>
                              <img src={qrCode} alt="QR Code" />
                              <p>
                                <strong>Warning:</strong>{" "}
                                <span className="text-danger">
                                  The amount must be exactly as shown
                                </span>
                              </p>
                              <p>
                                <RequireAuth>
                                  <button
                                    style={{ cursor: "pointer" }}
                                    className="btn btn-outline-success cursor-pointer "
                                    onClick={() => handleSubmit(plan[0])}
                                    // disabled={!transactionId.trim()}
                                  >
                                    Confirm Payment
                                  </button>
                                </RequireAuth>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card bg-warning mb-3 custom-card">
                  <div class="card ">
                    <div class="card-body planc">
                      <h5 class="card-title custom-card-title">
                        Dynamic Surge
                      </h5>
                      <p class="card-text custom-card-text">
                        <strong>Global Profit:</strong> 80-100%
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Investment Plan Duration:</strong> 14 days
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Minimum investment amount:</strong>
                      </p>
                      <span className="fw-bold fs-2 text-success">$200</span>
                      <p class="card-text custom-card-text text">
                        <strong>Description:</strong> Dynamic Surge is designed
                        to ride the waves of cryptocurrency volatility. By
                        investing with us, you place your capital into a
                        proactive trading strategy that exploits price movements
                        to generate significant gains. Your commitment is
                        limited to your initial investment; we take care of the
                        rest, ensuring optimised management and potentially high
                        returns..
                      </p>
                      <Button
                        href="#"
                        className="btn btn-warning"
                        onClick={() => handleShowPopupa(200)}
                      >
                        Deposit Now
                      </Button>
                      {showPopupa && (
                        <div className="popup-container">
                          <div className="popup">
                            <span className="close" onClick={handleClosePopupa}>
                              &times;
                            </span>

                            <div className="deposit-summary">
                              <h3>Deposit Summary</h3>
                              <p>
                                <strong>Plan Selected:</strong> Dynamic Surge
                              </p>
                              <p>
                                <strong>Overall Profit:</strong> {overallProfit}
                                % (Plan Duration: 14 days)
                              </p>
                              <p>
                                <strong>Total Profit:</strong> $200
                              </p>
                              <p>
                                <strong>Profit Calculation:</strong>{" "}
                                {dailyProfit} (Daily)
                              </p>
                              <p>
                                <strong>Return on Investment:</strong>$400
                              </p>
                              <p>
                                <strong>Early Return of Investment:</strong>{" "}
                                Possible at any time for a {earlyReturnFee}% fee
                              </p>
                              <p>
                                <strong>Amount Deposited:</strong> $200
                              </p>
                              <p>
                                <strong>Deposit Method:</strong>{" "}
                                <select
                                  value={depositMethod}
                                  onChange={handleDepositMethodChange}
                                >
                                  <option value="">
                                    Select Deposit Method
                                  </option>

                                  <option value="btc">Bitcoin (BTC)</option>
                                  <option value="tusd">Tether (USDT)</option>
                                  <option value="eth">Etheriam (ETH)</option>

                                  {/* Add more options for other deposit methods as needed */}
                                </select>
                              </p>
                              <div className="deposit-address">
                                <p>
                                  <strong className="pe-2">
                                    Deposit Address:
                                  </strong>
                                  <span className="highlighted-address text-white">
                                    {address}
                                  </span>
                                  <span
                                    className="copy-address-btn"
                                    onClick={copyToClipboard}
                                  >
                                    {copied ? "Copied!" : "Copy Address"}
                                  </span>
                                </p>
                              </div>
                              <p>
                                <strong>Exact Amount:</strong> {exactAmount200}
                              </p>
                              <img src={qrCode} alt="QR Code" />
                              <p>
                                <strong>Warning:</strong>{" "}
                                <span className="text-danger">
                                  The amount must be exactly as shown
                                </span>
                              </p>
                              <p>
                                <RequireAuth>
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleSubmit[1]}
                                    // disabled={!transactionId.trim()}
                                  >
                                    Submit
                                  </button>
                                </RequireAuth>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card bg-warning mb-3 custom-card">
                  <div class="card ">
                    <div class="card-body planc">
                      <h5 class="card-title custom-card-title">
                        Expansion DeFi
                      </h5>
                      <p class="card-text custom-card-text">
                        <strong>Global Profit:</strong> 180-220%
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Investment Plan Duration:</strong> 20 days
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Minimum investment amount:</strong>
                      </p>
                      <span className="fw-bold fs-2 text-success">$500</span>
                      <p class="card-text custom-card-text text">
                        <strong>Description:</strong> With Expansion DeFi,
                        immerse yourself in financial innovation without the
                        complexity of day-to-day management. This plan targets
                        the unique opportunities for staking and yield farming
                        at the heart of decentralised finance. Your investment
                        is actively managed by our specialists, seeking to
                        maximise the return on your investment by exploiting
                        DeFi projects with high....
                      </p>
                      <Button
                        href="#"
                        className="btn btn-warning"
                        onClick={() => handleShowPopupb(500)}
                      >
                        Deposit Now
                      </Button>
                      {showPopupb && (
                        <div className="popup-container">
                          <div className="popup">
                            <span className="close" onClick={handleClosePopupb}>
                              &times;
                            </span>

                            <div className="deposit-summary">
                              <h3>Deposit Summary</h3>
                              <p>
                                <strong>Plan Selected:</strong>Expansion DeFi
                              </p>
                              <p>
                                <strong>Overall Profit:</strong> {overallProfit}
                                % (Plan Duration: 20 days)
                              </p>
                              <p>
                                <strong>Total Profit:</strong> $1,100
                              </p>
                              <p>
                                <strong>Profit Calculation:</strong>{" "}
                                {dailyProfit} (Daily)
                              </p>
                              <p>
                                <strong>Return on Investment:</strong>$1,600
                              </p>
                              <p>
                                <strong>Early Return of Investment:</strong>{" "}
                                Possible at any time for a {earlyReturnFee}% fee
                              </p>
                              <p>
                                <strong>Amount Deposited:</strong> $500
                              </p>
                              <p>
                                <strong>Deposit Method:</strong>{" "}
                                <select
                                  value={depositMethod}
                                  onChange={handleDepositMethodChange}
                                >
                                  <option value="">
                                    Select Deposit Method
                                  </option>
                                  <option value="btc">Bitcoin (BTC)</option>
                                  <option value="tusd">Tether (USDT)</option>
                                  <option value="eth">Etheriam (ETH)</option>
                                </select>
                              </p>
                              <div className="deposit-address">
                                <p>
                                  <strong className="pe-2">
                                    Deposit Address:
                                  </strong>
                                  <span className="highlighted-address text-white">
                                    {address}
                                  </span>
                                  <span
                                    className="copy-address-btn"
                                    onClick={copyToClipboard}
                                  >
                                    {copied ? "Copied!" : "Copy Address"}
                                  </span>
                                </p>
                              </div>
                              <p>
                                <strong>Exact Amount:</strong> {exactAmount500}
                              </p>
                              <img src={qrCode} alt="QR Code" />
                              <p>
                                <strong>Warning:</strong>
                                <span className="text-danger">
                                  The amount must be exactly as shown
                                </span>
                              </p>
                              <p>
                                <RequireAuth>
                                  <button
                                    style={{ cursor: "pointer" }}
                                    className="btn btn-outline-success cursor-pointer "
                                    onClick={() => handleSubmit(2)}
                                    // disabled={!transactionId.trim()}
                                  >
                                    Confirm Payment
                                  </button>
                                </RequireAuth>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="card bg-warning mb-3 custom-card">
                  <div class="card ">
                    <div class="card-body planc">
                      <h5 class="card-title custom-card-title">
                        ICO Innovator
                      </h5>
                      <p class="card-text custom-card-text">
                        <strong>Global Profit:</strong> 400-450%
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Investment Plan Duration:</strong> 30 days
                      </p>
                      <p class="card-text custom-card-text">
                        <strong>Minimum investment amount:</strong>
                      </p>
                      <span className="fw-bold fs-2 text-success">$1000</span>
                      <p class="card-text custom-card-text text">
                        <strong>Description:</strong> ICO Innovator opens the
                        door to cutting-edge investments in select ICOs, without
                        you having to navigate the complexities of these
                        markets. We manage your investment by selecting
                        promising blockchain startups with the potential for
                        exponential growth. Your role is limited to providing
                        the capital; we grow that investment nsuring you a share
                        in the future of technology...
                      </p>
                      <Button
                        href="#"
                        className="btn btn-warning"
                        onClick={() => handleShowPopupc(1000)}
                      >
                        Deposit Now
                      </Button>
                      {showPopupc && (
                        <div className="popup-container">
                          <div className="popup">
                            <span className="close" onClick={handleClosePopupc}>
                              &times;
                            </span>

                            <div className="deposit-summary">
                              <h3>Deposit Summary</h3>
                              <p>
                                <strong>Plan Selected:</strong> ICO Innovator
                              </p>
                              <p>
                                <strong>Overall Profit:</strong> {overallProfit}
                                % (Plan Duration: 30 days)
                              </p>
                              <p>
                                <strong>Total Profit:</strong> $4,500
                              </p>
                              <p>
                                <strong>Profit Calculation:</strong>{" "}
                                {dailyProfit} (Daily)
                              </p>
                              <p>
                                <strong>Return on Investment:</strong>$5,500
                              </p>
                              <p>
                                <strong>Early Return of Investment:</strong>{" "}
                                Possible at any time for a {earlyReturnFee}% fee
                              </p>
                              <p>
                                <strong>Amount Deposited:</strong> $1000
                              </p>
                              <p>
                                <strong>Deposit Method:</strong>{" "}
                                <select
                                  value={depositMethod}
                                  onChange={handleDepositMethodChange}
                                >
                                  <option value="">
                                    Select Deposit Method
                                  </option>
                                  <option value="btc">Bitcoin (BTC)</option>
                                  <option value="tusd">Tether (USDT)</option>
                                  <option value="eth">Etheriam (ETH)</option>

                                  {/* Add more options for other deposit methods as needed */}
                                </select>
                              </p>
                              <div className="deposit-address">
                                <p>
                                  <strong className="pe-2">
                                    Deposit Address:
                                  </strong>
                                  <span className="highlighted-address text-white">
                                    {address}
                                  </span>
                                  <span
                                    className="copy-address-btn"
                                    onClick={copyToClipboard}
                                  >
                                    {copied ? "Copied!" : "Copy Address"}
                                  </span>
                                </p>
                              </div>
                              <p>
                                <strong>Exact Amount:</strong>
                                {exactAmount1000}
                              </p>
                              <img src={qrCode} alt="QR Code" />
                              <p>
                                <strong>Warning:</strong>
                                <span className="text-danger">
                                  The amount must be exactly as shown
                                </span>
                              </p>
                              <p>
                                <RequireAuth>
                                  <button
                                    style={{ cursor: "pointer" }}
                                    className="btn btn-outline-success cursor-pointer "
                                    onClick={() => handleSubmit(plan[3])}
                                    // disabled={!transactionId.trim()}
                                  >
                                    Confirm Payment
                                  </button>
                                </RequireAuth>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* plan list  end*/}
      </div>

      <div className="navcolor">
        <div className="container ">
          <div className="dflex pt-4">
            <div
              className="col-sm-12 col-md-6 col-lg-6 me-3 mt-2 ref"
              style={{
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "18px",
              }}
            >
              <p className="texta text-white fs-5">Referral Program</p>
              <div className="dflex">
                <div>
                  <img
                    src="mega.svg"
                    style={{ width: "70%", height: "auto" }}
                    alt="mega"
                  ></img>
                </div>
                <div>
                  <p className="texta fw-semibold text-white">
                    Discover an avenue of online income with our Referral
                    Program. By simply sharing the opportunities we offer, you
                    can benefit from a three-tiered earning structure of 5%, 2%,
                    and 1%. Dive into this lucrative venture even without an
                    active deposit.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-sm-12 col-md-6 col-lg-6 ref mt-2"
              style={{
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "18px",
              }}
            >
              <h3 className=" pb-3 text-warning">Accepted Payments</h3>
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <div className="d-flex">
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
                    <div className="d-flex">
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
                    <div className="d-flex">
                      <div>
                        <img
                          src="../bnb.svg"
                          alt="Logo"
                          style={{ width: "35%", height: "auto" }}
                        />
                      </div>
                      <div>
                        <p className="text-white">BNB</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div className="d-flex">
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
                    <div className="d-flex">
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
                    </div>
                  </div>
                  <div class="col">
                    <div className="d-flex">
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
                    <div className="d-flex">
                      <div>
                        <img
                          src="../sol.svg"
                          alt="Logo"
                          style={{ width: "35%", height: "auto" }}
                        />
                      </div>
                      <div>
                        <p className="text-white"> Solana </p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div className="d-flex">
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

          <div class="bottom-banner mt-5">
            <div class="bottom-banner-content ">
              <h3>About Us</h3>
              <p class="presentation">
                Welcome to NexGen Invest, Your Pathway to Revolutionary
                Cryptocurrency Investments. Embark on an unparalleled journey
                with NexGen Invest. We present a groundbreaking platform
                tailored to unlock access to the foremost innovative investment
                opportunities within the cryptocurrency realm. Regardless of
                your experience level in the crypto domain, NexGen Invest is
                dedicated to navigating you through smart, profitable investment
                ventures.
              </p>
              <h4>Why NexGen Invest Stands Out?</h4>
              <ul>
                <li>
                  Maximized Returns: Leverage our distinctive investment
                  strategies, including arbitrage opportunities, high-frequency
                  trading, and strategic stakes in emergent DeFi projects and
                  ICOs, all crafted to enhance your profit margins.
                </li>
                <li>
                  Clarity and Directness: NexGen Invest transforms crypto
                  investment into an accessible venture for everyone. Our
                  intuitive platform demystifies the investment process,
                  ensuring complete transparency and instantaneous portfolio
                  updates.
                </li>
                <li>
                  Withdrawal Flexibility: Revel in the liberty to withdraw your
                  accrued earnings regularly, whilst your initial investment
                  continues to compound until the culmination of your chosen
                  investment plan.
                </li>
                <li>
                  Unsurpassed Security Measures: At NexGen Invest, safeguarding
                  your investments is paramount. We employ the latest in
                  security technology to guard your capital and guarantee your
                  personal details remain confidential.
                </li>
              </ul>
              <h4>Diverse Investment Plans</h4>
              <p>
                Understanding that each investor's needs and goals are distinct,
                NexGen Invest provides an array of investment plans to cater to
                various risk appetites and financial aspirations. From Dynamic
                Surge, harnessing the power of market volatility, to Expansion
                DeFi, delving into the cutting-edge of financial innovation, and
                ICO Innovator, offering early-stage entry into the most
                promising ventures, NexGen Invest is your strategic partner for
                enduring financial growth.
              </p>
            </div>
          </div>
        </div>
        <footer class="footer my-4">
          <div class="footer-container">
            <div class="footer-section">
              <h4>Our Team</h4>
            </div>
            <div class="footer-section">
              <h4>Official Registration</h4>
            </div>
            <div class="footer-section">
              <h4>Address and Contact Information</h4>
            </div>
            <div class="footer-section">
              <h4>How It Works</h4>
            </div>
            <div class="footer-section">
              <h4>FAQ</h4>
            </div>
            <div class="footer-section">
              <h4>Privacy</h4>
            </div>
            <div class="footer-section">
              <h4>Terms of Use</h4>
            </div>
          </div>
        </footer>
        <div className="texta mt-3 fs-5 fw-semibold text-white">
          Copyright © 2024
          <span className="text-warning">NexGen Invest</span> LTD
        </div>
      </div>
    </>
  );
}

export default Homepage;

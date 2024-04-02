import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Componets/Home/Home";
import Login from "./Componets/Auth/Login";
import Register from "./Componets/Auth/Register";
import Dashboard from "./Componets/Dashboard/Dashboard";
import RequireAuth from "./Componets/hooks/RequireAuth";
import DashboardDetail from "./Componets/Dashboard/DashboardDetail";
import MyProfile from "./Componets/Dashboard/Myprofile";
import Withdrawal from "./Componets/Withdrawal/Withdrawal";
import ReinvestBalance from "./Componets/Dashboard/ReinvestBalance";
import MyDeposit from "./Componets/Dashboard/MyDeposit";
import History from "./Componets/Dashboard/History";
import Referel from "./Componets/Dashboard/Referel";
import TwoFactorAuthentication from "./Componets/Dashboard/TwoFactorAuthentication";
import TransactionHistory from "./Componets/Dashboard/TransactionHistory";
import DepositAll from "./Componets/Dashboard/admin/DepositAll";
import WithdrawalAll from "./Componets/Dashboard/admin/WithdrawalAll";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route
              path="/dashboard/dashboarddetail"
              element={<DashboardDetail />}
            />
            <Route path="/dashboard/myProfile" element={<MyProfile />} />
            <Route path="/dashboard/withdrawal" element={<Withdrawal />} />
            <Route path="/dashboard/reinvest" element={<ReinvestBalance />} />
            <Route path="/dashboard/mydeposits" element={<MyDeposit />} />
            <Route path="/dashboard/history" element={<History />} />
            <Route path="/dashboard/referrals" element={<Referel />} />
            <Route
              path="/dashboard/2fa"
              element={<TwoFactorAuthentication />}
            />
            <Route
              path="/dashboard/user-live"
              element={<TransactionHistory />}
            />
            <Route path="/dashboard/deposit-all" element={<DepositAll />} />
            <Route
              path="/dashboard/withdrawal-all"
              element={<WithdrawalAll />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

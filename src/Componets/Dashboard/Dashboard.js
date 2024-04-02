import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, Outlet, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import Loading from "../Home/Loading/Loading";

const userRole = {
  user: "user",
  admin: "admin",
};

const Dashboard = () => {
  const [role, setRole] = useState(userRole.user);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (user) {
      
      const userEmail = user.email;
      const fetchUser= async () => {
        try {
          const response = await axios.get(`http://localhost:5003/api/v1/user/singleByEmail/${userEmail}`);
          if (response.data.success) {
            setRole(response.data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="mt-5 pt-5 bglight h-100">
      <div className="d-flex" id="wrapper">
        {/* Sidebar */}
        <div className="bg-white" id="sidebar-wrapper">
          <Navbar />

          <div className="list-group list-group-flush my-3">
            {role === userRole.user && (
              <>
                <Link
                  to="dashboarddetail"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fw-bold  fa-chart-line me-2 "></i>Dashboard
                </Link>
                <Link
                  to="reinvest"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">Reinvest Balance</button>
    
                </Link>
                <Link
                  to="withdrawal"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">Withdrawal</button>
    
                </Link>
                <Link
                  to="mydeposits"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">My Deposit</button>
    
                </Link>
                <Link
                  to="history "
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">History</button>
    
                </Link>
                <Link
                  to="referrals"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">Referrals</button>
    
                </Link>
                <Link
                  to="myProfile "
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">My Profile</button>
    
                </Link>
                <Link
                  to="2fa"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">2F-A Setting</button>
    
                </Link>
                <Link
                  to="user-live"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i><button className="btn btn-outlate">Live Statistice</button>
    
                </Link>
              </>
            )}

            {role === userRole.admin && (
              <>
                <Link
                  to="deposit-all"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>All Deposit Order
                </Link>
                <Link
                  to="withdrawal-all"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>All Withdrawal Order
                </Link>
                <Link
                  to="myProfile"
                  class="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i class="fas fa-chart-line me-2"></i>My Profile
                </Link>
              </>
            )}

            <span
              href="#"
              className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
            >
              <i className="fas fa-power-off me-2"></i>Logout
            </span>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

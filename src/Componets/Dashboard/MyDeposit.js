import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const MyDeposit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [depositOrders, setDepositOrders] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        const fetchDepositOrders = async () => {
            try {
                if (!user) return;
                const response = await axios.get(`http://localhost:5003/api/v1/order/deposit-orders/${user.email}/`);
                console.log('response', response.data);
                setDepositOrders(response.data.deposits);
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
            <h2>Deposit Requests</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : !Array.isArray(depositOrders) || depositOrders.length === 0 ? (
                <div>
                    <div class="col">
                        <div class="card h-75 bg-secondary">
                            <div class="card-body">
                                <h3 class="card-title text-white">No active deposits.</h3>
                                Make a deposit and start earning
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead className="bg-success text-white">
                        <tr className="bg-success text-white">
                            <th className="bg-success text-white">Deposit Date</th>
                            <th className="bg-success text-white">Transaction ID</th>
                            <th className="bg-success text-white">Deposit Amount</th>
                            <th className="bg-success text-white">Investment Plans</th>
                            <th className="bg-success text-white">Deposit Method</th>
                            <th className="bg-success text-white">Deposit Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {depositOrders.map((deposit) => (
    <tr key={deposit._id}>
        <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
        <td>{deposit.transactionId}</td>
        <td>{deposit.depositAmount}</td>
        <td>{deposit.planName}</td>
        <td>{deposit.depositMethod}</td>
        {/* Assuming deposit status is available in deposit.status */}
        <td>{deposit.status}</td>
    </tr>
))}

                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default MyDeposit;

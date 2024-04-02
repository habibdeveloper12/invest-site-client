import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import axios from "axios";

const DepositAll = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [depositOrders, setDepositOrders] = useState([]);
    const [withdrawOrders, setWithdrawOrders] = useState([]);

    useEffect(() => {
        const fetchDepositOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/v1/order/deposit-orders');
                console.log('response', response.data);
                console.log('deposits', response.data.deposits);
                setDepositOrders(response.data.deposits);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching deposit orders:', error);
                setIsLoading(false);
            }
        };
        

        fetchDepositOrders();
    },[]);

    useEffect(() => {
        const fetchWithdrawOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/v1/order/withdraw-orders');
                console.log('response', response.data);
                console.log('withdraw', response.data.withdraw);
                setWithdrawOrders(response.data.withdraw);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching deposit orders:', error);
                setIsLoading(false);
            }
        };


        fetchWithdrawOrders();
    },[]);
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : !Array.isArray(depositOrders) || depositOrders.length === 0 ? (
                <div>
                    <div class="col">
                        <div class="card h-75 bg-secondary">
                            <div class="card-body">
                                <h3 class="card-title text-white">No History.</h3>
                                Make a deposit and start earning
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Table striped bordered hover>
<h2 className='text-center'>Live Data</h2>
                    <tbody>
                    {depositOrders.map((deposit) => (
    <tr key={deposit._id}>
        <td>Deposit</td>
        <td>{deposit.depositAmount}</td>
        <td>{deposit.depositMethod}</td>
        {/* Assuming deposit status is available in deposit.status */}
    </tr>
    
))}
                    </tbody>
                    <tbody>
            {withdrawOrders.map((withdraw) => (
                <tr key={withdraw._id}>
                    <td>Withdraw</td>
                    <td>{withdraw.withdrawalAmount}</td>
                    <td>{withdraw.withdrawalMethod}</td>
                </tr>
            ))}
        </tbody>
                </Table>
            )}
        </div>
    );
}

export default DepositAll;

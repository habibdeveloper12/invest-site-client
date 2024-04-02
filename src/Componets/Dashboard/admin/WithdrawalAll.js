import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const DepositAll = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [withdrawOrders, setWithdrawOrders] = useState([]);

    const handleSelectChange = (id, selectedValue) => {
        switch (selectedValue) {
          case 'Rejected':
            break;
          case 'Complete':
            handleComplete(id);
            break;
          default:
            // Handle other cases if needed
            break;
        }
      };
  
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

    const handleComplete = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5003/api/v1/order/update-orderc/${id}/`,{
                depositId: id
                
            });
            toast.success('Successfully Updated!', {
                // position: toast.POSITION.TOP_CENTER,
            });
            
            console.log("patch response",response.data);
        } catch (error) {
            console.error('Error updating deposit order:', error); // Handle error
        }
    };
    return (
        <div>
            <h2>Withdrawal Requests</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : !Array.isArray(withdrawOrders) || withdrawOrders.length === 0 ? (
                <div>
                    <div class="col">
                        <div class="card h-75 bg-secondary">
                            <div class="card-body">

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead className="bg-success text-white">
                        <tr className="bg-success text-white">
                            <th className="bg-success text-white">Withdraw Date</th>
                            <th className="bg-success text-white">Withdraw Amount</th>
                            <th className="bg-success text-white">Withdraw Method</th>
                            <th className="bg-success text-white">User Withdraw Address</th>
                            <th className="bg-success text-white">User Email</th>
                            <th className="bg-success text-white">Withdraw Status</th>
                            <th className="bg-success text-white">Admin action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {withdrawOrders.map((withdraw) => (
    <tr key={withdraw._id}>
        <td>{new Date(withdraw.createdAt).toLocaleDateString()}</td>
        <td>{withdraw.withdrawalAmount}</td>
        <td>{withdraw.withdrawalMethod}</td>
        <td>{withdraw.withdrawalAddress}</td>
        <td>{withdraw.userEmail}</td>
        <td>{withdraw.status}</td>
        <td>
            {withdraw.status === 'Rejected' || withdraw.status === 'Complete' ? (
                <>{withdraw.status}</>
            ) : (
                <>
<select className="form-select" aria-label="Default select example" onChange={(e) => handleSelectChange(withdraw._id, e.target.value)}>
<option value="Rejected">Pending</option>
  <option value="Complete">Approved</option>
</select>

    </>
            )}
        </td>
    </tr>
))}


                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default DepositAll;

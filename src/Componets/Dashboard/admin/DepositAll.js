import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const DepositAll = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [depositOrders, setDepositOrders] = useState([]);

    const handleSelectChange = (id, selectedValue) => {
        switch (selectedValue) {
          case 'Rejected':
            handleRejected(id);
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
        const fetchDepositOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5003/api/v1/order/deposit-orders');
                // console.log('response', response.data);
                // console.log('deposits', response.data.deposits);
                setDepositOrders(response.data.deposits);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching deposit orders:', error);
                setIsLoading(false);
            }
        };


        fetchDepositOrders();
    },[]);

    const handleRejected = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5003/api/v1/order/update-order/${id}/`,{
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
                            <th className="bg-success text-white">Deposit ID</th>
                            <th className="bg-success text-white">Deposit Amount</th>
                            <th className="bg-success text-white">Investment Plans</th>
                            <th className="bg-success text-white">Deposit Method</th>
                            <th className="bg-success text-white">Deposit Status</th>
                            <th className="bg-success text-white">Admin action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {depositOrders.map((deposit) => (
    <tr key={deposit._id}>
        <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
        <td>{deposit.transactionId}</td>
        {/* <td>{deposit.status}</td> */}
        <td>{deposit.depositAmount}</td>
        <td>{deposit.planName}</td>
        <td>{deposit.depositMethod}</td>
        <td>{deposit.status}</td>
        {/* Assuming deposit status is available in deposit.status */}
        <td>
            {deposit.status === 'Rejected' || deposit.status === 'Complete' ? (
                <>{deposit.status}</>
            ) : (
                <>
<select className="form-select" aria-label="Default select example" onChange={(e) => handleSelectChange(deposit._id, e.target.value)}>
<option value="Rejected">Pending</option>
  <option value="Rejected">Rejected</option>
  <option value="Complete">Complete</option>
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

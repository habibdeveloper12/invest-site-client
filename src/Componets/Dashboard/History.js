import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch history data from the backend
        fetchHistoryData();
    }, []); // Empty dependency array to ensure this effect runs only once on component mount

    const fetchHistoryData = async () => {
        try {
            // Make a request to fetch history data from the backend
            const response = await fetch('your-backend-endpoint-for-history-data');
            if (!response.ok) {
                throw new Error('Failed to fetch history data');
            }
            const data = await response.json();
            setHistoryData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching history data:', error.message);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2>Transaction History</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : historyData.length === 0 ? (
                <div class="col">
                <div class="card h-75 bg-secondary">
                  <div class="card-body">
                    <h3 class="card-title text-white">History is empty.</h3>
                    Make your first deposit to see it in history
                  </div>
                </div>
              </div>
            ) : (
                <Table striped bordered hover>
                    <thead className="bg-success text-white">
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default History;

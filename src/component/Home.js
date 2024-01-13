import axios from "axios";
import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Bargraph from "../component/Bargraph.js";
import DoughnutGraph from "./DoughnutGraph.js";
import { toast } from 'react-toastify';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Loader from "./Loader.js";

const Home = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('income');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/${id}`);
                const userData = response.data.user;

                dispatch({
                    type: "set-user",
                    payload: userData
                });
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, dispatch]);




    const handleAddTransaction = async (e) => {
        e.preventDefault();

        if (!title || !amount) {
            alert('Please enter both title and amount.');
            return;
        }

        try {
            const response = await axios.post(`/add-transaction/${id}`, {
                title,
                amount: parseFloat(amount),
                transactionType,
            });
            const updatedUser = response.data.user;


            toast.success('Transaction Added', {
                position: toast.POSITION.TOP_CENTER,
            }, { autoClose: 1000 });
            dispatch({
                type: "ADD_TRANSACTION",
                payload: {
                    title,
                    amount: parseFloat(amount),
                    transactionType,
                }
            });
            dispatch({
                type: "set-user",
                payload: updatedUser
            });


            setTitle('');
            setAmount('');
            setTransactionType('income');
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteTransaction = async (transactionId) => {
        try {
            const response = await axios.delete(`/delete-transaction/${id}/${transactionId}`);
            const updatedUser = response.data.user;

            toast.success('Transaction Deleted', {
                position: toast.POSITION.TOP_CENTER,
            }, { autoClose: 1000 });

            dispatch({
                type: "set-user",
                payload: updatedUser
            });
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="home-container">
                    <Header />
                    <div className="user-info">
                        <h1>Hi, {user.username}!</h1>
                        <h3>Welcome to Money Tracker</h3>
                    </div>
                    <div className="financial-summary">
                        <div className='financial-summary-container-1'>
                            <img width="80" height="80" src="https://img.icons8.com/matisse/100/wallet.png" alt="wallet" />
                            <div>
                                <h2>Your Balance</h2>
                                <h3>₹{user.balance}</h3>
                            </div>

                        </div>
                        <div className='financial-summary-container-2'>
                            <img width="80" height="80" src="https://img.icons8.com/color/48/request-money.png" alt="request-money" />
                            <div>
                                <h2>Your Income</h2>
                                <h3>₹{user.income}</h3>
                            </div>
                        </div>
                        <div className='financial-summary-container-3'>
                            <img width="80" height="80" src="https://img.icons8.com/color/48/tax.png" alt="tax" />
                            <div>
                                <h2>Your Expenses</h2>
                                <h3>₹{user.expense}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="graph">
                        <Bargraph income={user.income} expense={user.expense} />
                        <DoughnutGraph income={user.income} expense={user.expense} />
                    </div>
                    <div className="transaction-form">
                        <h2>Transaction</h2>
                        <form onSubmit={handleAddTransaction}>
                            <label htmlFor="title">Category:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <label htmlFor="type">Type:</label>
                            <select
                                id="type"
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                    <div className="transaction-history">
                        <h2>Transaction History</h2>
                        {user.transactions && user.transactions.length === 0 ? (
                            <>
                                <p>Add a transaction to see the history.</p>
                            </>
                        ) : (
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.transactions && user.transactions.map((transaction) => (
                                        <Transaction
                                            key={transaction._id}
                                            id={transaction._id}
                                            title={transaction.title}
                                            amount={transaction.amount}
                                            type={transaction.type}
                                            onDelete={handleDeleteTransaction}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
            < Footer />
        </>
    );
};

const Transaction = ({ id, title, amount, type, onDelete }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{title.toUpperCase()}</td>
            <td>₹{amount}</td>
            <td>{type.toUpperCase()}</td>
            <td><button onClick={() => onDelete(id)}>Delete</button></td>
        </tr>
    );
}

export default Home;

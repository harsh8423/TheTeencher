import React,{useContext, useEffect, useState} from 'react'
import ContextApi from "../components/ContextApi";
import "./StudentHomeCss.css";
import {loadStripe} from '@stripe/stripe-js';

export default function FeesStructure() {
    const a = useContext(ContextApi);
    const [receipts, setreceipts] = useState([])

    const getTransactions = async()=>{
        const response = await fetch("http://localhost:5000/api/getTransactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: a.user._id,
            }),
          });
          const json = await response.json();
          const transactions = json.transactions
          
          if (json.success) {
            console.log(transactions)
            setreceipts(transactions.receipt)
        }
          if (!json.success) {
            console.log("Something went wrong");
          }
    }

    const makePayment = async()=>{
        const stripe = await loadStripe("pk_test_51Nr5KGSJ5d6Cj4qWOWtqd6oHSCH3wq1lcCL73Hx3nz0GR7QZ9JMtD5S4EjRRjI3CwdQXAKS2BMm5QPP2BKQmjnNA00JWDoP1jC")

            const response = await fetch("http://localhost:5000/api/crerate-checkout-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: a.user._id,
                amount:1200,
                qty:1
              }),
            });
            const json = await response.json();
            console.log("json", json);

            const result = stripe.redirectToCheckout({
                sessionId: json.id
            })
        
            if (json.success) {
              console.log("payment successfull")
            }
            if (!json.success) {
              console.log("Something went wrong");
            }
    }

    useEffect(() => {
        getTransactions()
    }, [])
    

  return (
    <div className='container'>
        <div className="row mt-5">
            <h1 style={{color:"green"}}>Fees Payment/Reciept</h1>
            <div className="col-12 mt-5">
                <p style={{fontWeight:"bold", fontSize:"20px"}}>Per Month Fees: 1200</p>

            </div>
            <div className="col-12 text-center">
                <button className='button-07' onClick={makePayment}>Pay Fees</button>
            </div>
        </div>
        <div className="row">
            {receipts.map((receipt)=>{
                return(
                <div className="col-12 normal-box">
                    {receipt.amount}
                    <p>{receipt.status}</p>
                    <p>{receipt.dateStamp}</p>
                </div>
                )
            })}
        </div>
      
    </div>
  )
}

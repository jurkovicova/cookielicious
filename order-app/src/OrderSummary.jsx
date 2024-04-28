import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";




const OrderSummary = () => {


    const location = useLocation();
    const { orderData } = location.state;
    const deliveryDate = orderData.delivery_at ? orderData.delivery_at.toLocaleDateString() : '';


    return (
        <div className="home-container">
        <div className="summary-card">
            <center>
                <h2>Thank you for your order!</h2>
                <p>Your <span className="bold">{orderData.item_name}</span> coookie box will be delivered on <span className="bold">{deliveryDate}</span></p>
                <Link to="/home">
                    <button className="button-home">Back Home</button>
                </Link>
            </center>
        </div>
        </div>
    );
};

export default OrderSummary;




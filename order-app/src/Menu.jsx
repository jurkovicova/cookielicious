import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Menu = () => {

    const [items, setItems] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [orderData, setOrder] = useState({

        delivery_at: selectedDate,
        item_name: "",
        city: "",
        post_code: "",
        adress: "",
        item_quant: 2,
        cust_firstname: "",
        cust_lastname: "",
        email: ""

    });

    useEffect(() => {

        const fetchAllItems = async () => {
            try {
                const res = await axios.get("http://localhost:8800/order");
                setItems(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllItems()

    }, [])


    const handleChange = (e) => {
        setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const navigate = useNavigate();

    const handleClick = async e => {
        e.preventDefault();
        try {
            const orderDataWithDate = {
                ...orderData,
                delivery_at: selectedDate // Include selected date in orderData
            };
            const res = await axios.post("http://localhost:8800/order", orderDataWithDate);
            if (res.data && res.data.message) {
                // If a message is received from the backend, do something with it
                console.log("Message from backend:", res.data.message);
                // Redirect to home page or display a success message to the user
                alert("Thank you for your order!")
                // navigate('/success');
                navigate('/success', { state: { orderData: orderDataWithDate } });
            } else {
                // Handle the scenario where no message is received
                console.log("No message received from backend");
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred while placing the order. Please try again later.");
            navigate('/order')
        }
    };


    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const validateForm = () => {
        const {
            cust_firstname,
            cust_lastname,
            email,
            city,
            post_code,
            adress,
            item_name,
        } = orderData;
        if (
            cust_firstname &&
            cust_lastname &&
            email &&
            city &&
            post_code &&
            adress &&
            item_name &&
            selectedDate
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    useEffect(() => {
        validateForm();
    }, [orderData, selectedDate]);

    return (
        <div className="container-main">
            <div className="menu-field">
                <center>
                    <h1>Our cookie box selection</h1>
                </center>
                <div className="items">
                    {items.map(item => (
                        <div className="card">
                            <img src={require("./images/" + item.pic_source)} alt="cookie" width={120} />
                            <div className="container">
                                <h4>{item.item_name} - {item.item_price}$</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="order-field">
                <h1>Place your order here</h1>
                <div className="card-order">
                    <center>
                        <form className="order-form" onSubmit={handleClick}>
                            <label>First Name</label>
                            <input className="order-form-input" type="text" name="cust_firstname" onChange={handleChange}/>
                            <label>Last Name</label>
                            <input className="order-form-input" type="text" name="cust_lastname" onChange={handleChange}/>
                            <label>Email</label>
                            <input className="order-form-input" type="email" name="email" onChange={handleChange}/>
                            <label>Adress</label>
                            <input className="order-form-input" type="text" name="adress" onChange={handleChange}/>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <label>City</label>
                                    <input className="order-form-input" type="text" id="city" name="city" onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Post Code</label>
                                    <input className="order-form-input" type="text" id="post_code" name="post_code" onChange={handleChange} />  
                                </div>
                            </div>
                            <label> Pick your flavour</label>
                            <select name="item_name" onChange={handleChange}>
                                <option value="">Select a flavor</option> {/* Default option */}
                                {items.map(item => (
                                    <option key={item.item_name} value={item.item_name}>{item.item_name}</option>
                                ))}
                            </select>
                            <label> Select delivery date </label>
                            <DatePicker selected={selectedDate} wrapperClassName="date-picker" dateFormat="dd/MM/yyyy" onChange={handleDateChange} />
                            <input style={{ width: '50%' }} className="form-submit-button" type="submit" value="ORDER" disabled={!isFormValid} />
                        </form>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default Menu
import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useNavigate} from 'react-router-dom';
import './style.css';

function Menu() {
	const [items, setItems] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [orderData, setOrderData] = useState({

		deliveryAt: selectedDate,
		itemName: '',
		city: '',
		postcode: '',
		adress: '',
		itemQuant: 2,
		custFirstname: '',
		custLastname: '',
		email: '',

	});

	useEffect(() => {
		const fetchAllItems = async () => {
			try {
				const response = await axios.get('http://localhost:8800/order');
				setItems(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllItems();
	}, []);

	const handleChange = error => {
		setOrderData(previous => ({...previous, [error.target.name]: error.target.value}));
	};

	const navigate = useNavigate();

	const handleClick = async error => {
		error.preventDefault();
		try {
			const orderDataWithDate = {
				...orderData,
				deliveryAt: selectedDate, // Include selected date in orderData
			};
			const response = await axios.post('http://localhost:8800/order', orderDataWithDate);
			if (response.data && response.data.message) {
				// If a message is received from the backend, do something with it
				console.log('Message from backend:', response.data.message);
				// Redirect to home page or display a success message to the user
				// Navigate('/success');
				navigate('/success', {state: {orderData: orderDataWithDate}});
			} else {
				// Handle the scenario where no message is received
				console.log('No message received from backend');
			}
		} catch (error) {
			console.log('Error:', error);
			// Alert('An error occurred while placing the order. Please try again later.');
			navigate('/order');
		}
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const validateForm = useCallback(() => {
		const {
			custFirstname,
			custLastname,
			email,
			city,
			postCode,
			adress,
			itemName,
		} = orderData;
		if (
			custFirstname
            && custLastname
            && email
            && city
            && postCode
            && adress
            && itemName
            && selectedDate
		) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [orderData, selectedDate]);

	useEffect(() => {
		validateForm();
	}, [orderData, selectedDate, validateForm]);

	return (
		<div className='container-main'>
			<div className='menu-field'>
				<center>
					<h1>Our cookie box selection</h1>
				</center>
				<div className='items'>
					{items.map(item => (
						<div key='pic_source' className='card'>
							<img src={'./' + item.pic_source} alt='cookie' width={120}/>
							<div className='container'>
								<h4>{item.item_name} - {item.item_price}$</h4>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='order-field'>
				<h1>Place your order here</h1>
				<div className='card-order'>
					<center>
						<form className='order-form' onSubmit={handleClick}>
							<label>First Name</label>
							<input className='order-form-input' type='text' name='custFirstname' onChange={handleChange}/>
							<label>Last Name</label>
							<input className='order-form-input' type='text' name='custLastname' onChange={handleChange}/>
							<label>Email</label>
							<input className='order-form-input' type='email' name='email' onChange={handleChange}/>
							<label>Adress</label>
							<input className='order-form-input' type='text' name='adress' onChange={handleChange}/>
							<div style={{display: 'flex', justifyContent: 'space-between'}}>
								<div>
									<label>City</label>
									<input className='order-form-input' type='text' id='city' name='city' onChange={handleChange}/>
								</div>
								<div>
									<label>Post Code</label>
									<input className='order-form-input' type='text' id='postCode' name='postCode' onChange={handleChange}/>
								</div>
							</div>
							<label> Pick your flavour</label>
							<select name='itemName' onChange={handleChange}>
								<option value=''>Select a flavor</option> {/* Default option */}
								{items.map(item => (
									<option key={item.item_name} value={item.item_name}>{item.item_name}</option>
								))}
							</select>
							<label> Select delivery date </label>
							<DatePicker selected={selectedDate} wrapperClassName='date-picker' dateFormat='dd/MM/yyyy' onChange={handleDateChange}/>
							<input style={{width: '50%'}} className='form-submit-button' type='submit' value='ORDER' disabled={!isFormValid}/>
						</form>
					</center>
				</div>
			</div>
		</div>
	);
}

export default Menu;

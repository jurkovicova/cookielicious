import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function OrderSummary() {
	const location = useLocation();
	const {orderData} = location.state;
	const deliveryDate = orderData.deliveryAt ? orderData.deliveryAt.toLocaleDateString() : '';

	return (
		<div className='home-container'>
			<div className='summary-card'>
				<center>
					<h2>Thank you for your order!</h2>
					<p>Your <span className='bold'>{orderData.itemName}</span> coookie box will be delivered on <span className='bold'>{deliveryDate}</span></p>
					<Link to='/'>
						<button type='button' className='button-home'>Back Home</button>
					</Link>
				</center>
			</div>
		</div>
	);
}

export default OrderSummary;


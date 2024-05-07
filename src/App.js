import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './home-site.jsx';
import Menu from './menu-site.jsx';
import OrderSummary from './order-summary.jsx';
import './style.css';
import './App.css';

function App() {
	return (

		<div className='App spacer bg'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/order' element={<Menu/>}/>
					<Route path='/success' element={<OrderSummary/>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;

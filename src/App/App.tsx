import Basket from '@/pages/Basket';
import Filters from '@/pages/Filters';
import Login from '@/pages/Login';
import Products from '@/pages/Products';
import Register from '@/pages/Register';
import React from 'react';
import { Route, Routes } from 'react-router';

export const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/basket' element={<Basket />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/filters' element={<Filters />} />
			</Routes>
		</div>
	)
};

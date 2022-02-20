import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { AiOutlinePlusCircle } from "react-icons/ai";
import './Navbar.css'
const AdminPop = ({ setAdmin }) => {
	const { authSate, authDispatch } = useContext(AuthContext);

	return (
		<form className='pop pop-login'>


			<Link style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'3px'}} to='/event'> <AiOutlinePlusCircle color='#481963'/>Add events</Link>


			<hr />
			<button
				className='link'
				type='submit'
				onClick={() => {
					authDispatch({ type: 'logout' });
					setAdmin(false);
				}}
			>
				Log out
			</button>
		</form>
	);
};

export default AdminPop;

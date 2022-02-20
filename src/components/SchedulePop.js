import React, { useEffect, useState ,useContext} from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { AuthContext } from '../App';
import './Navbar.css';

const SchedulePop = ({ scheduleList ,token,admin}) => {

	async function deleteSchedule(title) {

		fetch('https://ecourse.cpe.ku.ac.th/exceed04/api/event_del/' + title, {
			method: 'DELETE',
			headers: {Authorization: token}
		})
			.then((res) => res.text())
			.then((res) => console.log(res));
	}

	return (
		<div className='pop pop-schedule'>
			{scheduleList.map((element, index) => {
				return (
					<div key={index} className='schedule-list-box'>
						<h3>{element.title}</h3>
						<p>Date: {element.date}</p>
						<p>Start at: {element.start}</p>
						{admin && <div
							className='schedule-delete'
							onClick={() => {
								deleteSchedule(element.title);
							}}
						>
							<RiDeleteBin6Fill size={1.2 + 'rem'} />
						</div>}
					</div>
				);
			})}
		</div>
	);
};

export default SchedulePop;

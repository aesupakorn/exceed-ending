import React, { useEffect } from 'react';
import { useState } from 'react';
import './History.css'
import { AiOutlineUser } from 'react-icons/ai';
const History = ({history}) => {
	

	return (
		<div style={{color:"#562a80"}}>
			<h1 style={{textAlign:"center"}}>History Events</h1>
			<div className='history-container'>
				
				{history.map((element,index)=>{
					return(
						<div key={index} className='history-list-container'>
							<div className='history-element-left'>
								<h3>{element.title}</h3>
								<p>{element.date}</p>
								<p>{`${element.start} - ${element.end}`}</p>
							</div>
							<div className="history-element-right">
								<AiOutlineUser size={20+'px'}/>
								<h2>{element.people_count}</h2>
							</div>
						</div>
					)
				})}	
			

		</div>
		</div>
	)
};

export default History;

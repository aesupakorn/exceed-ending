
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Loading from './pages/Loading';
import Navbar from './components/Navbar';
import EventFormpage from './pages/EventFormpage';
import React,{ useState,useContext,useEffect } from 'react';
import { useReducer } from 'react';
import Error from './pages/Error';
import History from './components/History';

function reducer(state,action){
	if(action.type === 'login'){
		return action.payload
	}
	if(action.type === 'logout'){
		return false
	}

	return state
}


const AuthContext = React.createContext();


function App() {
	const [authState , authDispatch] = useReducer(reducer , false)
	const [loading ,setLoading] = useState(false)
	const [history, setHistory] = useState('');
	async function fetchGetHistory() {
		const res = await fetch('https://ecourse.cpe.ku.ac.th/exceed04/api/history');
		const json = await res.json();
		console.log(json)
		setHistory(json);
	}
	useEffect(()=>{
		fetchGetHistory()
	},[])
	return (
		<AuthContext.Provider value={{authState,authDispatch}}>
			{loading && <Loading/> }

			<Router>
				<Navbar setLoading={setLoading} token={authState}/>

				<div className='main-container'>
				<Routes>
					<Route path='/' element={<Homepage />} />

					{authState &&
						
						<Route path='/event' element={<EventFormpage setLoading={setLoading} token={authState}/>}/>
		
					}
					{authState && <Route path='/history' element={<History history={history} setHistory={setHistory}/>}/>}
					
					<Route path='*' element={<Navigate replace to='/'/>}/>
				</Routes>
				</div>
			</Router> 
		</AuthContext.Provider>

	);
}
export default App;
export {AuthContext}
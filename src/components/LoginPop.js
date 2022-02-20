import React ,{useState, useEffect ,useContext}from 'react';
import './Navbar.css'
import { VscEye,VscEyeClosed } from 'react-icons/vsc';
import { AuthContext } from '../App';

const EventContext = React.createContext()



const LoginPop = ({ setLoading,setAdmin,admin}) => {
	const {authState , authDispatch} = useContext(AuthContext)
	const [eye , setEye] = useState(false)
	const [toggleEye, setToggleEye] = useState(false)
	const [loginForm, setLoginForm] = useState({ username: '', password: '' });
	const [incorrect, setIncorrect] = useState(false)



	useEffect(()=>{
		if(loginForm.password !== ""){
			setEye(true)
		}
		else{
			setEye(false)
		}
	},[loginForm])






	function onFormChange(event) {
		const { name, value } = event.target;
		return setLoginForm((prev) => {
			return { ...prev, [name]: value };
		});
	}

	function onToggleEye(){
		setToggleEye(!toggleEye)
	}

	async function onLoginForm(event) {
		event.preventDefault();
		setLoading(true)
		const adminToken = await fetchData('https://ecourse.cpe.ku.ac.th/exceed04/api/login')
		const {access_token,token_type} = adminToken
		if(access_token){

			setAdmin(true);
			setIncorrect(false)
			authDispatch({ type : 'login' ,payload : `${token_type} ${access_token}`})

		}
		setIncorrect(true)
		setLoading(false)

	}
	async function fetchData(url){
		try{
			const response = await fetch(url,{
				method: "POST",
				body:new URLSearchParams({
					'username': String(loginForm.username),
					'password': String(loginForm.password)
				})
			})
			const json = await response.json()
			return json

		}
		catch(error){
			console.log(error.message)
		}
	}



	return (
		<EventContext.Provider value={"test"}>

		<form className='pop pop-login' onSubmit={onLoginForm}>
			<div className='login-container'>
				<h4>Admin</h4>
				<label name='username'>Username</label>

				<div className='input-container-login'>

				<input
					name='username'
					value={loginForm.username}
					type='text'
					placeholder='Enter username'
					onChange={onFormChange}
					/>
				</div>


				<label name='password'>Password</label>
				<div className='input-container-login'>
				<input
					name='password'
					value={loginForm.password}
					type={toggleEye ? 'text': 'password'}
					placeholder='Enter password'
					onChange={onFormChange}
				/>
	
				{eye && <div onClick={onToggleEye} className='show-password'>{
					toggleEye ? <VscEyeClosed/> : <VscEye/>
				}</div>}
				</div>
				{incorrect && <p className='notification'>* Incorrect username or password</p> }
				
				<button className='login-btn' type='submit'>
					login
				</button>
				
				
			</div>
		</form>
		</EventContext.Provider>
	);
};

export default LoginPop;
export {EventContext}
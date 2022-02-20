import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio, Oval, RevolvingDot } from 'react-loader-spinner';
import './Loading.css'
const Loading = () => {
  return (
    <div className='loading'>
        <RevolvingDot height='100' width='100'  color='purple' ariaLabel='loading' />
    </div>
  )
}

export default Loading
import React, { useState } from 'react'
import { useEffect } from 'react'
import './EventFormpage.css'

const EventFormpage = ({token,setLoading}) => {

  const [eventForm , setEventForm] = useState(
    {
      title:"",
      date:"",
      start:"",
      end:"",
      max:"",
      min:""
    })

    function onEventFormChange(event){
        const {value,name} = event.target
        setEventForm((prev)=>{
          return {...prev , [name]:value}
        })
    }
    async function onSubmitEvent(event){
      event.preventDefault()
      fetchEventData('https://ecourse.cpe.ku.ac.th/exceed04/api/event_add')
    }


    async function fetchEventData(url){
      setLoading(true)
      try{
        const response = await fetch(url,{

          method: "POST",
          body: JSON.stringify({
            title : eventForm.title,
            date : eventForm.date,
            start : eventForm.start,
            end : eventForm.end,
            people_to_close : Number(eventForm.max) ,
            people_to_reopen : Number(eventForm.min)
          }),
          headers: {Authorization: token,
                     'Content-Type': 'application/json'}

        })
        const json = await response.json()
        console.log(json)
      }
      catch(error){
        console.log(error.message)
      }

      setLoading(false)
    }

  return (

    <form className='event-form-container' onSubmit={onSubmitEvent} style={{color:"#562a80"}}>
      <h2>Event Form</h2>
      <div className="input-container ic1">
        <input onChange={onEventFormChange} value={eventForm.title} name="title" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label name="title" className="placeholder">title</label>
      </div>
      <div className="input-container ic2">
        <input onChange={onEventFormChange} value={eventForm.date} name="date" className="input" type="date" placeholder=" " />
        <div className="cut cut-short"></div>
        <label name="date" className="placeholder">date</label>
      </div>
      <div className="input-container ic2">
        <input onChange={onEventFormChange} value={eventForm.start} name="start"  className="input" type="time" placeholder=" " />
        <div className="cut"></div>
        <label name="start" className="placeholder">start</label>
      </div>
      <div className="input-container ic2">
        <input onChange={onEventFormChange} value={eventForm.end} name="end" className="input" type="time" placeholder=" " />
        <div className="cut cut-short"></div>
        <label name="end" className="placeholder">end</label>
      </div>
      <div className="input-container ic2">
        <input onChange={onEventFormChange} value={eventForm.max} name="max" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label name="max" className="placeholder">max</label>
      </div>
      <div className="input-container ic2">
        <input onChange={onEventFormChange} value={eventForm.min} name="min" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label name="min" className="placeholder">min</label>
      </div>
      <button type="submit" className="submit">submit</button>
    </form>
  )
}

export default EventFormpage
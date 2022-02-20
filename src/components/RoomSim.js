import React, { useEffect, useState } from 'react'
import {RiUserFill} from "react-icons/ri"
import './RoomSim.css'

const RoomSim = () => {
  async function getRoomSim() {
    const res = await fetch("https://ecourse.cpe.ku.ac.th/exceed04/api/front_people")
    const json = await res.json()

    return json
  }
  async function getDoorLight() {
    const res = await fetch("https://ecourse.cpe.ku.ac.th/exceed04/api/people_in_time")
    const json = await res.json()
    return json
  }


  const [roomSim, setRoomSim] = useState(["1","1","1","1"])
  const [trackCurrent , setTrackCurrent] = useState(0)
  const [doorLight,setDoorLight] = useState(0)
  useEffect(() => {
    const chair = setInterval(async () => {
      const {current_people,chair_status} = await getRoomSim()
      const {status} = await getDoorLight()
      setRoomSim(chair_status)
      setTrackCurrent(current_people)
      setDoorLight(status)
    }, 2000);
    return(()=>{
      clearInterval(chair)
    })

  },[])

  return (
    <div className='RoomSim-container'>

        <div className="screen"><p>screen</p></div>

        <div className='circle-container'>
            <div className={`circle-1 ${roomSim[0]==="1"? 'not-sit' : 'sit'}` }></div>
            <div className={`circle-2 ${roomSim[1]==="1"? 'not-sit' : 'sit'}` }></div>
        </div>

        <div className='circle-container'>
            <div className={`circle-3 ${roomSim[2]==="1"? 'not-sit' : 'sit'}` }></div>
            <div className={`circle-4 ${roomSim[3]==="1"? 'not-sit' : 'sit'}` }></div>
        </div>

        <div className={`people-tracking ${doorLight? 'door-open' : 'door-close' }`}>
          <RiUserFill/>
          {trackCurrent}
        </div>


        <div className="door">
            <div className="door-left">
            </div>
            <div className="door-right">
            </div>
        </div>

    </div>
  )
  }
export default RoomSim
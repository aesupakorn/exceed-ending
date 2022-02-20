import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { AuthContext } from "../App";
import { useContext } from "react";
import SchedulePop from "./SchedulePop";
import AdminPop from "./AdminPop";
import LoginPop from "./LoginPop";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import {CgList } from "react-icons/cg";

const Navbar = ({ setLoading, token }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [scheduleList, setScheduleList] = useState({});
  const [onTitle, setOnTitle] = useState({
    title: "NaN",
    start: "NaN",
    end: "NaN",
  });

  async function fetchGetSchedule() {
    const res = await fetch("https://ecourse.cpe.ku.ac.th/exceed04/api/event");
    const json = await res.json();
    setScheduleList(json);
  }
  async function fetchPresentEvent() {
    const res = await fetch(
      "https://ecourse.cpe.ku.ac.th/exceed04/api/event_now"
    );
    const json = await res.json();

    setOnTitle({
      title: json.title,
      start: json.start,
      end: json.end,
    });
  }

  useEffect(() => {
    const schedule = setInterval(() => {
      fetchPresentEvent();
      fetchGetSchedule();
    }, 1000);
    return () => {
      clearInterval(schedule);
    };
  }, []);

  let navigate = useNavigate();

  return (
    <div>
      <nav>
        <div className="nav-container" style={{color:"#562a80"}}>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              width: "16vw",
              justifyContent: "space-between",
			  
            }}
          >
            <p
              style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}
              className="link"
              onClick={() => {
                setShowSchedule(!showSchedule);
              }}
            >
              <AiOutlineSchedule size={30 + "px"} />
              Schedule
            </p>

            {admin && (
              <div
			  style={{ display: "flex", alignItems: "center", gap: "4px" ,color:"#562a80"}}
                className="history-link"
                onClick={() => {
                  navigate("/history");
                }}
              >
				<CgList size={25+'px'}/>
                History
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              {onTitle.title}
            </h1>
            <p>{onTitle.start + " - " + onTitle.end}</p>
          </div>

          <p
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            className="link"
            onClick={() => {
              setShowLoginForm(!showLoginForm);
            }}
          >
            <RiAdminLine size={25 + "px"} />
            {admin ? "Admin" : "Login as Admin"}
          </p>

          {showSchedule && (
            <SchedulePop
              scheduleList={scheduleList}
              token={token}
              admin={admin}
            />
          )}

          {showLoginForm &&
            (admin ? (
              <AdminPop setAdmin={setAdmin} />
            ) : (
              <LoginPop setLoading={setLoading} setAdmin={setAdmin} />
            ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

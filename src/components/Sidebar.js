import { NavLink } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

function Sidebar() {

  const [sidebarTabs, setSidebarTabs] = useState([
    {
      label: "Dashboard",
      icon: <DashboardIcon  className="sidebarTabIcon"/>,
      link: "/"
    },
    {
      label: "Report",
      icon: <QueryStatsIcon className="sidebarTabIcon"/>,
      link: "/report"
    }
  ])

  const handleHidingClick = ()  => {
    const element = document.querySelector("#Sidebar");
    element.classList.remove('active')
  }

  return (
    <div className="Sidebar" id="Sidebar">
      <h1 className="softwareTitle">OEE Management System</h1>
      {
        sidebarTabs.map((data, index) => {
          return (
            <NavLink to={data.link} className="sidebarTab">
              <div className="sidebarTabIcon">
                {data.icon}
              </div>
              <div className="sidebarTabName">
                {data.label}
              </div>
            </NavLink>
          )
        })
      }
      <div className="hidingSidebarButton">
        <IconButton onClick={handleHidingClick}>
          <ArrowBackIosIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Sidebar
import "../assets/styles/Header.scss"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

function Header() {

  const handleMenuClick = () => {
    const sidebar = document.querySelector("#Sidebar")
    sidebar.classList.add('active')
  }
  return(
    <div className="Header">
      <IconButton onClick={handleMenuClick}>
        <MenuIcon style={{color: "#ffffff"}}/>
      </IconButton>
    </div>
  )
}

export default Header
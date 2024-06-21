import Woman2RoundedIcon from "@mui/icons-material/Woman2Rounded";
// import Women from "../WOMEN.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate as Navigate,
} from "react-router-dom";
import Menu from "../../MUI_components/Menu";
const navBar = () => {
  return (
    <div
      className="NavBar"
      style={{
        backgroundColor: "#040F0F",
        display: "flex",
        flexDirection: "row",
        color: "#F5FBEF",
        marginBottom : "2rem"
      }}
    >
      <div
        style={{
          width: "75%",
          gap: 15.61,
          padding: "0.45rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="NavText"
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: 21.82,
          }}
        >
          <div style={{ padding: "0.75rem", color: "#F5FBEF" }}>
            <Link
              style={{

              }}
              to="/"
            >
              <a href="url">
                <div style={{ fontWeight: "600", fontSize: "1.75rem" }}>
                  RentEase
                </div>
              </a>
            </Link>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <div style={{ padding: "0.75rem" }}>
            {/* <a href="url">Home</a> */}
            {/* <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 400,
              }}
              to="/"
            >
              HOME
            </Link> */}
            <Menu name="For Tenants" />
          </div>
          
          {/* <div style={{ padding: "0.75rem" }}> |  </div> */}
          {/* &nbsp;            &nbsp; */}
          {/* <div style={{ padding: "0.75rem", color: "black" }}>
            <a href="url">MAP</a>
            <Menu name="For Owners"/>
          </div> */}
          <div
            style={{ padding: "1.23rem", color: "white", fontSize: "1.25rem" }}
          >
            <a href="/upload">POST YOUR PROPERTY </a>
            {/* <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 400,
              }}
              to="/blogs"
            >
              BLOGS
            </Link> */}
          </div>
          {/* &nbsp; &nbsp;
          <div style={{ padding: "0.75rem" }}>
            <a href="url">DOCTOR</a>
          </div> */}
          <div
            style={{ padding: "1.23rem", color: "white", fontSize: "1.25rem" }}
          >
            
            <Link
              style={{
                
              }}
              to="/calendar"
            >
              
              <a href="url">PROPERTY VISIT </a>
            </Link>
          </div>
          <div
            style={{ padding: "1.23rem", color: "white", fontSize: "1.25rem" }}
          >
            
            <Link
              style={{
                
              }}
              to="/list"
            >
              
              <a href="url">PROPERTIES </a>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
      <div
        style={{
          // width: "42%",
          gap: "1.35rem",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: 21.82,
          color: "white",
        }}
      >
        <a href="/signup">
          {/* <Woman2RoundedIcon sx={{padding : "1rem"}}  fontSize="large" /> */}
          Sign up
        </a>
        <div>|</div>
        <a href="/login">
          {/* <Woman2RoundedIcon sx={{padding : "1rem"}}  fontSize="large" /> */}
          Login
        </a>
        {/* <img src={Women} style={{width : "8%", height : "auto"}}alt='nai'></img> */}
      </div>
    </div>
  );
};
export default navBar;

import React, { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box } from "@mui/material";



function Header() {
  const [state, setState] = useState(false);
  const [menu, setMenu] = useState(false);

  const location =useRouter();

  




  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <div className="header_container">
      <Box
        sx={{
          height: "9.5vh",
        }}
      >
        <img src="./images/logo.png" className="image" alt="subashplywoodlogo" />
      </Box>

      <div
        className="menu_items"
      
      >
       
        <div className="menu" onMouseEnter={()=>setMenu(false)} >
          <Link
            href={"/AddMedicine"}
            className="hover"
            style={{
              textDecoration: "none",
              color: location.pathname === "/AddMedicine" ? "orange" : "rgb(133,94,66)",
            }}
          >
            {" "}
            <h4 style={{ fontWeight: 500 }}>Add Medicine    </h4>{" "}
          </Link>
        </div>
        <div className="menu" onMouseEnter={()=>setMenu(false)} >
          <Link
            href={"/billing"}
            className="hover"
            style={{
              textDecoration: "none",
              color: location.pathname === "/billing" ? "orange" : "rgb(133,94,66)",
            }}
          >
            {" "}
            <h4 style={{ fontWeight: 500 }}>Billing</h4>{" "}
          </Link>
        </div>
        <Link href={"/productpage"}>
        <Box  className="menu"  sx={{position:'relative'}}  onMouseEnter={()=>setMenu(true)} 
>
          
            <h4 style={{ fontWeight: 500,
             color:
             (location.pathname === ("/plywood")||location.pathname ==="/laminates"||location.pathname ==="/hardware"||location.pathname ==="/veneer"||location.pathname ==="/decoretives") ? "orange" : "rgb(133,94,66)",
     
            }}    onClick={()=>{menu?setMenu(false):setMenu(true)}}>Products </h4>{" "}
        
       
        </Box></Link>
        
       
        <div className="menu" onMouseEnter={()=>setMenu(false)} >
          <Link
            href={"/login"}
            className="hover"
            style={{
              textDecoration: "none",
              color:
                location.pathname === "/about" ? "orange" : "rgb(133,94,66)",
            }}
            onClick={()=>{
              setMenu(false)
            
          
          }}
          >
            {" "}
            <h4 style={{ fontWeight: 500 }}  >Login </h4>{" "}
          </Link>
        </div>
        <div className="menu" onMouseEnter={()=>setMenu(false)}>
         
            <h4 style={{ fontWeight: 500 }}>Logout</h4>{" "}
         
        </div>
       
      </div>
  
      <div className="threeBars">
         
         <div style={{ marginRight: "20px" }}>
          {" "}
          {state ? (
            <AiOutlineClose
              size={"5vh"}
              color="black"
              className="one"
              onClick={() => setState(false)}
            />
          ) : (
            <VscThreeBars
              size={"5vh"}
              className="two"
              color="black"
              onClick={() => {
                setState(true);
              }}
            />
          )}
        </div>
      </div>
      {state ? (
        <div className="menu_items_mobile">
          <img
            src="./images/logo.png"
            className="image"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "10px",
            }}
            alt=""
          />

          <Link
            href={"/"}
            className="hover"
            style={{ textDecoration: "none" }}
            onClick={() => setState(false)}
          >
            <div
              className="menu1"
              style={{
                color: location.pathname === "/" ? "orange" : "rgb(133,94,66)",
              }}
            >
              {" "}
Billing
            </div>
          </Link>
          <Link
            href={"/plywood"}
            className="hover"
            style={{ textDecoration: "none" }}
            onClick={() => setState(false)}
          >
            <div
              className="menu1"
              style={{
                color:
                  location.pathname === "/plywood"
                    ? "orange"
                    : "rgb(133,94,66)",
              }}
            >
              PLYWOOD
            </div>{" "}
          </Link>
         
          <Link
            href={"/hardware"}
            className="hover"
            style={{ textDecoration: "none" }}
            onClick={() => setState(false)}
          >
            <div
              className="menu1"
              style={{
                color:
                  location.pathname === "/hardware"
                    ? "orange"
                    : "rgb(133,94,66)",
              }}
            >
          Products
            </div>{" "}
          </Link>
          <Link
            href={"/decoratives"}
            className="hover"
            style={{ textDecoration: "none" }}
            onClick={() => setState(false)}
          >
            <div
              className="menu1"
              style={{
                color:
                  location.pathname === "/decoretives"
                    ? "orange"
                    : "rgb(133,94,66)",
              }}
            >
       Log Out
            </div>{" "}
          </Link>
          
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
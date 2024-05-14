import React, { useState } from "react";
import Input from "./components/Input";
import Card from "./components/Card";
import Button from "./components/Button";
import { useNavigate ,Link} from "react-router-dom";
function Signup() {
  const nav1 = useNavigate();
  var [mail,handleMail] =useState("");
  var [Password,handlepassword] =useState("");
  var [resp,handleresp]=useState("");
  function handlemail(e)
  {
    handleMail(e.target.value)
  }
  function handlepass(e){
  
    handlepassword(e.target.value)
  }
  const handleOnSubmit  = async (e) =>
  {
   e.preventDefault();
   if(mail === "" || Password ==="")
   {
       handleresp("All fields are required")
   }

    const res = await fetch('http://localhost:3050/register',{
      method:'post',
      headers:{
        'Content-type':'application/json'
      },
      body:
        JSON.stringify({
          mail:mail ,password:Password
        })
      
    });
    if(res.ok)
    {
      const data= await res.json()
      console.log(data.resp)
      if(data.resp === "inserted")
      {
       nav1("/login")
      }
    }
  }
  const mystyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <div style={mystyle}>
          <Card width="350px" height="400px" back="white">
            <h1 style={{ 
              fontSize: "32px",
              padding:'10px',
              marginLeft:'100px'
             }}>
                Sign Up</h1>
            <form>

            
            <Input
              type="text"
              color="black"
              width="250px"
              height="40px"
              back="transparent"
              name="v1"
              holder='Enter your E-mail'
              onChange={handlemail}
            />
            <Input
              type="text"
              color="black"
              width="250px"
              height="40px"
              back="transparent"
              name="v1"
              holder='Enter your Password'
              onChange={handlepass}

            />
            <Input
              type="text"
              color="black"
              width="250px"
              height="40px"
              back="transparent"
              holder='Confirm your Password'
              name="v1"
              onChange={handlepass}
            />
            <div style={{
              marginLeft:'90px',
              color:'red'
            }}>
              <h4>
                {resp}
              </h4>
            </div>
            <div style={{
              margin:'10px 0px 0px 60px'
            }}>
            <Button value="sign up" back="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
            type="submit" onClick={handleOnSubmit} ></Button>
            </div >
            <div style={{
              marginLeft:'75px',
              padding:'3px'
            }}>
           Already a user!<Link to='/login' style={{
            textDecoration:'none',
           }}> login</Link>
           </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Signup;

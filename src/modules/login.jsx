import React, { useState } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import image from "../login.png"
function Login() {
    const nav=useNavigate();
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
    if(mail ==="" || Password==="")
    handleresp("All fields are required")
   e.preventDefault();
    const res = await fetch('http://localhost:3050/login',{
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
    if(data.resp==="found")
    {
    localStorage.setItem('id', mail);
    nav("/main");
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
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,179,0,1) 0%, rgba(36,62,0,1) 100%)",
        }}
      >
        <div style={mystyle}>
          <Card width="850px" height="500px" back="white">
            <div style={{
              display:'flex'
            }}>
              <div>
            <h1 style={{ 
              fontSize: "32px",
              padding:'10px',
              marginLeft:'100px'
             }}>
                Login</h1>
            <form>

            
            <Input
              type="text"
              color="black"
              width="250px"
              height="50px"
              back="transparent"
              name="v1"
              holder='Enter your E-mail'
              onChange={handlemail}
            />
            <Input
              type="text"
              color="black"
              width="250px"
              height="50px"
              back="transparent"
              name="v1"
              holder='Enter your Password'
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
              margin:'90px 0px 0px 60px'
            }}>
            <Button value="Login" back="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,190,82,1) 0%, rgba(65,108,0,1) 100%)"
            type="submit" onClick={handleOnSubmit} ></Button>
            </div>
            </form>
            </div>
            <div>
              <img src={image} height={500}  alt="" />
            </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;

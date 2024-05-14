import React, { useEffect, useState } from 'react'
import '../styles/sidebar.css'
import {useNavigate} from 'react-router-dom';
import myimage from '../logo.png'
const Sidebar = () => {
    const na=useNavigate()
    const [stat,handlestat]=useState(1);
    useEffect(()=>{focusl();},[stat]);
    useEffect(()=>{na("/main/dashboard")},[]);
    function focusl()
    {
     if(stat===1)
     {
        document.getElementById("1").style.background="rgb(36, 206, 109)";
        document.getElementById("2").style.background="transparent";
        document.getElementById("3").style.background="transparent";
     }
     else if(stat===2)
     {
        document.getElementById("2").style.background="rgb(36, 206, 109)";
        document.getElementById("1").style.background="transparent";
        document.getElementById("3").style.background="transparent";
     }
     else if(stat===3)
     {
        document.getElementById("3").style.background="rgb(36, 206, 109)";
        document.getElementById("2").style.background="transparent";
        document.getElementById("1").style.background="transparent";
     }
    }
  return (
    <div>
        <div>
            <img src={myimage} alt='logo' width="200px"/>
            <h2 style={{
                marginLeft:'40px'
            }}>Welcome!</h2>
            <hr/>
            <div style={{
                padding:'10px'
            }}>
            <div className='module' id ="1" onClick={()=> {
                handlestat(1)
                na("/main/dashboard")
            }
            }> Dashboard</div>
            <div className='module' id="2"  onClick={()=> {
                handlestat(2)
                na("/main/manage")
            }}>  Client Management</div>
            <div className='module' id="3" onClick={()=> {
                handlestat(3)
                na("/main/inventory")
            }}> Inventory</div>
            </div>
            </div>
            <hr style={{
                marginLeft:'20px',
                width:'300px'
            }}/>
        
    </div>
  )
}

export default Sidebar

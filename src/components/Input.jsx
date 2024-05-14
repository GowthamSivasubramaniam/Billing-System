import React from "react";
import { useLocation } from "react-router-dom";

const Input = (props) => {

    const mystyle =
    {
        color:(props.color),
        width:(props.width),
        height:(props.height),
        background:(props.back),
        outline: '1px solid black',
        border:'none',
        borderRadius:'2px',
        marginLeft:'40px',
        marginTop:'30px',
        textAlign:'center'
    };
    const handle = (e) =>
    {
        props.onChange(e);
    }
  return (
    <div>
       <input 
        style={mystyle}
        type={props.type}
        name={props.name} 
        onChange={handle}
        onFocus={(e)=>
        e.target.style.outline='1px solid blue'
      }
      onBlur={
        (e) =>
        e.target.style.outline='1px solid black'
      }
        placeholder={props.holder}
        required />
    </div>
  )
}

export default Input

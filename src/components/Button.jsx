import React, { Children } from 'react'
import '../styles/button.css'
const Button = (props) => {
    const mystyle =
    {
        '--back':props.back,
        "--back1":props.hov
    }
    const handel =(e) =>
    {
        props.onClick(e)
    }
  return (
    <div>
       <button className="button" type={props.type} style={mystyle} onClick={handel}
       >
        {props.value}
        {props.children}
       </button>
    </div>
  )
}

export default Button

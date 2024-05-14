import React from 'react'

const Card = (props) => {
    const mystyle = {
         background:props.back,
         boxShadow:'2px 5px 10px 2px rgba(0,0,0,0.5)',
         width:props.width,
         height:props.height,
         dispay:'flex',
         borderRadius:'10px',
         padding:'10px'

    }
  return (
    <div style={mystyle}>
        {props.children}
    </div>
  )
}

export default Card

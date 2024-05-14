import { Outlet} from 'react-router-dom';
import React from 'react'
import Sidebar from './modules/sidebar';

const App1 = () => {
  return (
    <div style={{
      display:"flex",
    }}><div>
        <Sidebar/> 
        </div>
        <div style={{
          display:"flex",
          
        }}
        >
          <hr style={{
            height:'100vh',
            marginLeft:'60px',
            marginRight:'20px'
          }}/>
        </div>
        <div >
        <Outlet />   
        </div>
    </div>
  )
}

export default App1

import React from 'react'
import { useState  , useEffect} from 'react';
import Modal from './Model';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import mov from '../download.jpeg'
import MovieBookingSystem from './seats';
import { IoIosHeart } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
const Pieces = () => {
    const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    image:null
    
  });
  const[response,setresponse] =useState("")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const date = formData.date;
    const image = formData.image;
    const res = await fetch("http://localhost:3050/addMovie", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
        image:image
      }),
    });
    if (res.ok) {
      setresponse("Added succesful")
      fetchEntries ();
    }
  };
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:3050/movies", {
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, []);
  return (
    <div>
        <Button value="Add" back="green" hov="rgb(138, 245, 119)"
 onClick={() => setShowModal(true)} />
      {
        showModal && <Modal>
                      <h1
            style={{ fontSize: "32px", padding: "10px", marginLeft: "290px" }}
          >
            Movie details
          </h1>
          <form
            onSubmit={handleOnSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "30px",
              columnGap: "100px",
              paddingLeft: "30px",
              paddingRight: "50px",
            }}
          >
            <div>
              <label f> Name :</label>
              <Input
                type="text"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="name"
                onChange={handleChange}
                holder="Name"
              />
            </div>
            <div>
              <label>Date :</label>
              <Input
                type="date"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="date"
                onChange={handleChange}
                holder="Phone No"
              />
            </div>
            <div>
              <label>Image :</label>
              <Input
                type="file"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="image"
                onChange={handleChange}
                holder="Phone No"
              />
            </div>
            <div></div>
             <div
              style={{
                marginTop: "20px",
                marginLeft:'120px'
              }}
            >
              <Button
                value="Add"
                back="blue"
                type="submit"
                onClick={handleOnSubmit}
              ></Button>
            </div>
            <div
              style={{
                marginTop: "20px",
                marginLeft: "10px",
                paddingBottom: "40px",
              }}
            >
              <Button
                value="done"
                back="blue"
                type="submit"
                onClick={() => {setShowModal(false)
                   setresponse("")}} 
              ></Button>
            </div>
            <p>{response}</p>
          </form>
        </Modal>
      }
     <div style={{
        padding:'30px',
        display:'grid',
        gridTemplateColumns: "1fr 1fr " ,
        
        gap:'50px',
        width:'300px'
     }}>

      {entries &&
            entries.map((entry, index) => (
        
        <Card width="600px" height="500px" back="white" > 
             <img src={mov} height={200} width={200} style={{
                marginLeft:'0px'
             }}></img>
              <h1 style={{
                marginLeft:'230px',
                marginTop:'-200px'
              }}> {entry.name} </h1>
              <h3 style={{
                marginLeft:'230px',
                marginTop:'-15px'
              }}> Tamil, 2D</h3>
               <h3 style={{
                marginLeft:'230px',
                marginTop:'-10px'
              }}> Date :{entry.date}</h3>
               
               <h3 style={{
                marginLeft:'230px',
                marginTop:'-10px'
              }}> Sri Shakthi cinemas </h3>
              <div style={{
                borderTop: '5px disc grey',
                
                width: '100%',
                margin: '60px 0',
              }}></div>
              <div style={{
                marginTop:'100px'
              }}> 
              <div style={{
                display:'flex'
              }}>
              <h1 style={{
                color:'red'
              }}> <IoIosHeart /></h1>
              <h1 style={{
                color:'black',
                marginTop:'25px',
                marginLeft:'10px',
                fontSize:'1.4em',
              }}>80%</h1>
              </div>
              
               <Button
                value="book"
                back="green"
                type="submit"
                onClick={ ()=>
                    {
                        navigate('/book' , {state : {entry}})
                    }
                   } 
              ></Button>
              
               <Button
                value="remove"
                back="red"
                type="submit"
                onClick={async () =>
                  {
                    try {
                      const res = await fetch("http://localhost:3050/deletemovie", {
                        method: "post",
                        headers: {
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify ({
                          "id":entry._id
                        })
                      });
                      if (res.ok) {
                        fetchEntries();
                      }
                    } catch (error) {
                      console.error("Error fetching entries:", error);
                    }
                  
                  }
                  }
              ></Button>
              </div>
            
        </Card>

     
            ))}
      </div>
    </div>
  )
}

export default Pieces

import React from 'react';
import  { useEffect, useState } from "react";
import Button from '../components/Button';
const Inventory = () => {
    
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
       

        try {
          const res = await fetch("http://localhost:3050/inventory1", {
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
      <div>
        <table>
          <tr>
     
            <th>Resource</th>
            <th>Qty</th>
            <th> Amount</th>
            <th>Date</th>
            <th>Action</th>
    
          </tr>
          {entries &&
            entries.map( (entry, index) => (
              <tr>
             
                <td> {entry.resource}</td>
                <td> {entry.qty}</td>
                <td>{entry.Amount}</td>
                
                <td>{new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'short' })}</td>

                <td>
                  <div style={{
                    display:"flex"
                  }}> 
                
               
                 <Button
                  value="delete"
                  back="green"
                  hov="rgb(138, 245, 119)"
                  onClick={async () =>
                  {
                    try {
                      const res = await fetch("http://localhost:3050/delete1", {
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
                }/>

                </div>
                </td>
                </tr>
                ))}
         
                  </table>
                  </div>
                  </div>
        )
}


export default Inventory

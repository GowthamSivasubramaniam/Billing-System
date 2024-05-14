import React from 'react'
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Card from '../components/Card';
import Input from '../components/Input';

import Button from "../components/Button";



const Dashboard = () => {
    const [entries, setEntries] = useState([]);
    const [entries2, setEntries2] = useState([]);
    const [entries3, setEntries3] = useState([]);
    const [profit, setprofit] = useState(0);
    const [startDate, setStartDate] = useState( new Date().getFullYear() - 1); // State for start date input
    const [endDate, setEndDate] = useState(new Date().getFullYear() + 1); // State for end date input
    
    const fetchEntries = async () => {
       

        try {
          const res = await fetch(`http://localhost:3050/inventory?sDate=${startDate}&eDate=${endDate}`, {
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
    const [entries1, setEntries1] = useState([]);

    const fetchEntries1 = async () => {
       

        try {
          const res = await fetch(`http://localhost:3050/product?sDate=${startDate}&eDate=${endDate}`, {
            method: "get",
            headers: {
              "Content-type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            let totalProfit = 0; 
            data.forEach(entry => {
              totalProfit += entry.Amount * entry.product_qty; 
            });
            setprofit(totalProfit);
            setEntries1(data);
            console.log(data);
          }
        } catch (error) {
          console.error("Error fetching entries:", error);
        }
      };
      useEffect(() => {
       
        fetchEntries1();
      }, []);
    
      const calculateAverage = (entries) => {
        
        const groupedEntries = {};
        entries.forEach(entry => {
          if (!groupedEntries[entry.product]) {
            groupedEntries[entry.product] = {
              Amount: 0,
              count: 0
            };
          }
          groupedEntries[entry.product].Amount += entry.Amount;
          groupedEntries[entry.product].count++;
        });
    
        const averagedEntries = Object.keys(groupedEntries).map(name => ({
          product: name,
          Amount: groupedEntries[name].Amount / groupedEntries[name].count
        }));
    
        return averagedEntries;
      };
    
      useEffect(() => {
      
        if (entries1.length > 0) {
          const averagedEntries = calculateAverage(entries1);
          setEntries2(averagedEntries);
        }
      }, [entries1]);
      const calculateAverage1 = (entries) => {
        const groupedEntries = {};
        entries.forEach(entry => {
          if (!groupedEntries[entry.product]) {
            groupedEntries[entry.product] = {
              qty: 0,
              count: 0
            };
          }
          groupedEntries[entry.product].qty += entry.product_qty;
          groupedEntries[entry.product].count++;
        });
    
        const averagedEntries = Object.keys(groupedEntries).map(name => ({
          product: name,
          qty: groupedEntries[name].qty 
        }));
    
        return averagedEntries;
      };
    
      useEffect(() => {
        
        if (entries1.length > 0) {
          const averagedEntries = calculateAverage1(entries1);
          setEntries3(averagedEntries);
        }
      }, [entries1]);


const GraphComponent = () => {
  useEffect(() => {
    if (entries.length > 0) {
      const ctx = document.getElementById('myChart').getContext('2d');
      
      const resources = entries.map(entry => entry.resource);
      const quantities = entries.map(entry => entry.qty);
      const colors = [];
      for (let i = 0; i < entries.length; i++) {
        const color = '#' + Math.floor(Math.random() * 16777).toString(16);
        colors.push(color);
      }
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resources,
          datasets: [{
            label: 'Quantity',
            data: quantities,
            backgroundColor: colors,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 10,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              },
              x: {
                ticks: {
                  font: {
                    size: 14,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              }
            }
          }
      });
    }
  }, [entries]);

  return (
    <div>
      <canvas id="myChart" width="200" height="200"></canvas>
    </div>
  );
};

const LinePlot = () => {
    useEffect(() => {
      if (entries3.length > 0) {
        const ctx = document.getElementById('linePlot').getContext('2d');
        
        const product = entries3.map(entry => entry.product);
        const quantities = entries3.map(entry => entry.qty);
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: product,
            datasets: [{
              label: 'Quantity',
              data: quantities,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 10,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              },
              x: {
                ticks: {
                  font: {
                    size: 14,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              }
            }
          }
        });
      }
    }, [entries1]);
  
    return (
      <div>
        <canvas id="linePlot" width="300" height="300"></canvas>
      </div>
    );
  };
const LinePlot1 = () => {
    useEffect(() => {
      if (entries2.length > 0) {
        const ctx = document.getElementById('linePlot1').getContext('2d');
        
        const product = entries2.map(entry => entry.product);
        const Amount = entries2.map(entry => entry.Amount);
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: product,
            datasets: [{
              label: 'Amount',
              data: Amount,
              fill: true,
              borderColor: 'blue',
              tension: 1.0,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 10,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              },
              x: {
                ticks: {
                  font: {
                    size: 14,
                    family: "'Arial', sans-serif"
                  },
                  color: '#333'
                },
                grid: {
                    display: false, 
                  }
              }
            }
          }
        });
      }
    }, [entries1]);
  
    return (
      <div>
        <canvas id="linePlot1" width="400" height="400"></canvas>
      </div>
    );
  };
  return (
    <div style={{
        display:'flex',
        flexDirection:'column'
    }}>
         
        <div style={{
            display:'flex',
         
        }}>
            <h1>
            Hello admin!
        </h1>
        <div style={{
            display:'flex',
            marginBottom:'40px'
        }}>
        <Input
                type="date"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="sdate"
                onChange={(e) => setStartDate(e.target.value)}
                holder="Delivery Date"
              />
               <Input
                type="date"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="edate"
                onChange={(e) => setEndDate(e.target.value)}
                holder="Delivery Date"
              />
              <div style={{
                marginLeft:'40px',
                marginTop:'30px'
              }}>
               <Button
                value="Fetch"
                back="blue"
                type="Fetch Data"
                onClick={()=>
                    {   fetchEntries();
                        fetchEntries1();
            
                    }}
             />
             </div>
             </div>
        

        </div>
    <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:'40px'
    }}> 
      
        <Card width={'300px'} height={'300px'} >
       <GraphComponent/>
       </Card>
       <Card width={'300px'} height={'300px'} >
       <LinePlot/>
       </Card>
       <Card width={'300px'} height={'300px'} >
       <LinePlot1/>
       </Card>
       <div style={{
 
        paddingTop:'60px'
       }}>
       <Card width={'300px'} height={'100px'} back='rgba(50, 168, 82,0.3)' >
       <h2>Profit :  <span style={{ color:'green'}}>₹ {profit}</span></h2>
       </Card>
       </div>
    </div>
    </div>
  )
}

export default Dashboard

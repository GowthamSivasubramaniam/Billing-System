import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Model";
import "../styles/model.css";
import MyDocument from "../components/invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "../styles/manage.css";
import { MdEmojiEmotions } from "react-icons/md";

const ClientManage = () => {
  const [formData, setFormData] = useState({
    cust: "",
    phoneno: "",
    resource: [],
    qty: "",
    product: "",
    product_qty: "",
    anticipatedbill: "",
    deleivdate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const[response,setresponse] =useState("")
  const [isview, handview] = useState(false);
  const [curindex, handleindex] = useState(-1);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = formData.cust;
    const phoneno = formData.phoneno;
    const resource = formData.resource;
    const qty = formData.qty;
    const product = formData.product;
    const product_qty = formData.product_qty;
    const anticipatedbill = formData.anticipatedbill;
    const deleivdate = formData.deleivdate;
    const res = await fetch("http://localhost:3050/add", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phoneno: phoneno,
        resource: resource,
        qty:qty,
        product: product,
        product_qty:product_qty,
        anticipatedbill: anticipatedbill,
        deleivdate: deleivdate,
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
      const res = await fetch("http://localhost:3050/entries", {
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
    <div style={{
    }}>
      <h1>
     <span style={{
      color:'rgb(300, 174, 88)',
     
     }}><MdEmojiEmotions/></span>  Happy Customers !!
      </h1>
      <div style={{
        padding:'30px'
      }}>
      <Button value="Add" back="green" hov="rgb(138, 245, 119)"
 onClick={() => setShowModal(true)} />
      </div>
      {showModal && (
        <Modal>
          <h1
            style={{ fontSize: "32px", padding: "10px", marginLeft: "290px" }}
          >
            Customer details
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
              <label f>Customer Name :</label>
              <Input
                type="text"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="cust"
                onChange={handleChange}
                holder="Name"
              />
            </div>
            <div>
              <label>Phone No :</label>
              <Input
                type="text"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="phoneno"
                onChange={handleChange}
                holder="Phone No"
              />
            </div>
            <div>
              <label>Resources :</label>
              <Input
                type="text"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="resource"
                onChange={handleChange}
                holder="Raw Materials"
              />
              </div>
            <div>
              <label>Qty :</label>
              <Input
                type="number"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="qty"
                onChange={handleChange}
                holder="Quantity each"
              />
            </div>
            <div>
              <label>Product :</label>
              <Input
                type="text"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="product"
                onChange={handleChange}
                holder="Outcome Product"
              />
            </div>
            <div>
              <label>Qty :</label>
              <Input
                type="number"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="product_qty"
                onChange={handleChange}
                holder="QUANTITY"
              />
            </div>
            <div>
              <label>Amount :</label>
              <Input
                type="number"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="anticipatedbill"
                onChange={handleChange}
                holder="Amount for single product"
              />
            </div>
            <div>
              <label>Delivery date :</label>
              <Input
                type="date"
                color="black"
                width="250px"
                height="40px"
                back="white"
                name="deleivdate"
                onChange={handleChange}
                holder="Delivery Date"
              />
            </div>

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
      )}
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Phone No</th>
            <th>Product</th>
            <th>Qty</th>
            <th> Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {entries &&
            entries.map((entry, index) => (
              <tr>
                <td>{entry.name}</td>
                <td>{entry.phoneno}</td>
                <td> {entry.product}</td>
                <td> {entry.product_qty}</td>
                <td>{entry.anticipatedbill}</td>
                
                <td>{new Date(entry.deleivdate).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'short' })}</td>

                <td>
                  <div style={{
                    display:"flex"
                  }}><Button
                  value="view invoice"
                  back="green"
                  hov="rgb(138, 245, 119)"
                  onClick={() => {
                    handleindex(index);
                    handview(true);
                  }}
                />
               
               
                <Button
                  value="delete"
                  back="green"
                  hov="rgb(138, 245, 119)"
                  onClick={async () =>
                  {
                    try {
                      const res = await fetch("http://localhost:3050/delete", {
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
                />
                </div>
                </td>
                {isview && index === curindex && (
                  <Modal>
                    <MyDocument
                      name={entry.name}
                      bill={entry.anticipatedbill}
                      qty={entry.product_qty}
                      product={entry.product}
                      date={new Date(entry.deleivdate).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'short' })}
                    />
                    <div style={{
                      marginLeft:'70px'
                    }}>
                    <Button value="done"  back="green" hov="rgb(138, 245, 119)" onClick={()=>{
                       handview(false);
                    }}/>
          </div>
          <div style={{
            marginTop:'-40px',
            marginLeft:'300px',

          }}>
          <Button value=""  back="green" hov="rgb(138, 245, 119)"  onClick={
            ()=>
            {
              ;
            }
          }>
          <PDFDownloadLink
          style={{
            width:'100%',
            height:'100%',
            textDecoration:'none',
            color:'white'
          }}
                    document={
                      < MyDocument
                        name={entry.name}
                        order={entry.resource}
                        bill={entry.anticipatedbill}
                        qty={entry.product_qty}
                        product={entry.product}
                        date={new Date(entry.deleivdate).toLocaleDateString('en-In', { timeZone: 'UTC', dateStyle: 'short' })}
                      />
                    }
                    
                    fileName={`${index + 1}.pdf`}
                  >
                    {({ blob, v, loading, error }) =>
                      loading ? "Loading document..." : "save"
                    }
                  </PDFDownloadLink>
                  </Button>
                </div>
                  </Modal>
                )}
                 
                
              </tr>
            ))}
        </table>

        
      </div>
    </div>
  );
};

export default ClientManage;

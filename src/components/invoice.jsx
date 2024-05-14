// import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import image from "../format.png";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    display:'flex',
    flexDirection:'column',
    height:'400px'
  },
  section: {
    display: "flex",
    flexDirection:'column',
    margin: "10px",
    gap: "20px",
    width: "500px",
    height: "200px",
  },
  imageStyle: {
    width: "630px",
    height: "200px",
    marginLeft: "-30px",
  },
 text: {
    padding:'10px',
    marginLeft:'20px'
 },
  grid:{
    display:'grid',
    gridTemplateColumns:'1fr 1fr', 
    gap:'20px'
  }
});

const MyDocument = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View >
          <Image src={image} style={styles.imageStyle} />
          <img src={image} height={150} style={{
            marginLeft:'20px'
          }} alt=""/>
          </View>
            <View style={styles.grid}>
           <View >
           <Text style={styles.text}>Name: {props.name}</Text>
           </View>
           <View >
           <Text style={styles.text}>Product: {props.product}</Text>
           </View>
           <View>
            <Text style={styles.text}>Amount :Rs {props.bill}</Text>
            </View>
           <View> <Text style={styles.text}> Qty: {props.qty || 10}</Text> </View>
           <View> <Text style={styles.text} >  Date:   {props.date}</Text> </View>
           <View>
            <Text>--------------------------------------</Text>
           </View>
           <View>
            <Text>--------------------------------------</Text>
           </View>
           
           <View> <Text style={styles.text} > Total price: Rs  {props.qty*props.bill}</Text> </View>

           </View>
          
      
      </Page>
    </Document>
  );
};

export default MyDocument;

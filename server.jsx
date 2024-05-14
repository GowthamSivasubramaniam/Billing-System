const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");
const user = require("./schemas/user");
const Client = require("./schemas/client");
const Inventory = require("./schemas/Inventory");
const Product = require("./schemas/product");
const app = express();

mongo
  .connect("mongodb+srv://Gowtham:gowtham@bill.fx5nzqb.mongodb.net/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());
app.use(cors());
app.post("/register", (req, res) => {
  const mail = req.body;
  const u = new user(mail);
  u.save()
    .then(() => {
      const responseData = { resp: "inserted" };
      res.json(responseData);
    })
    .catch((err) => {
      const responseData = { resp: "not inserted" };
      res.json(responseData);
    });
});

app.post("/login", (req, res) => {
  user
    .findOne(req.body)
    .then((y) => {
      if (y) res.json({ resp: "found" });
      else res.json({ resp: "not found" });
    })
    .catch(() => {
      res.json({ resp: "error occured try again after sometime" });
    });
});

app.post("/add", (req, res) => {
  const data = req.body;
  const cli = new Client(data);
  const data1 ={
    resource:data.resource,
    qty:data.qty,
    Amount:data.anticipatedbill,
    date:data.deleivdate,
  }
  const data2 ={
    product:data.product,
    product_qty:data.product_qty,
    Amount:data.anticipatedbill,
    date:data.deleivdate,
  }
  const inv = new Inventory(data1);
  var res1;
  var res1;
  const pro =new Product(data2);
  
  cli
    .save()
    .then(() => {
      res1={ resp: "saved" };
    })
    .catch((e) => {
      res1=e;
    });
  inv
    .save()
    .then(() => {
      res1={ resp: "saved" };
    })
    .catch((e) => {
      res1=e;
    });
  pro
    .save()
    .then(() => {
      res1={ resp: "saved" };
    })
    .catch((e) => {
      res1=e;
    });
   res.json(res1)
 
});
app.get("/entries", async (req, res) => {
  await Client.find({})
    .then((m) => {
      res.json(m);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/inventory", async (req, res) => {
  console.log(req.query.sDate)
  const startDate = req.query.sDate; 
const endDate = req.query.eDate;

const startDateObj = new Date(startDate);
const endDateObj = new Date(endDate);
  await Inventory.find({
    date: {
      $gte: startDateObj, 
      $lte: endDateObj 
    }
  })
    .then((m) => {
      console.log(m)
      res.json(m);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/inventory1", async (req, res) => {
  
  await Inventory.find({
    
  })
    .then((m) => {
      console.log(m)
      res.json(m);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
});
app.get("/product", async (req, res) => {
  const startDate = req.query.sDate; 
const endDate = req.query.eDate;

const startDateObj = new Date(startDate);
const endDateObj = new Date(endDate);
  await Product.find({
    date: {
      $gte: startDateObj, 
      $lte: endDateObj 
    }
  })
    .then((m) => {
      
      res.json(m);
    })
    .catch(() => {
      res.status(500).json({ error: "Internal server error" });
    });
});
app.post("/delete", async (req,res) =>
{ 
  const id=req.body.id
  console.log(id)
  await Client.deleteOne({_id :id})
  res.send("deleted")
})
app.post("/delete1", async (req,res) =>
{ 
  const id=req.body.id
  console.log(id)
  await Inventory.deleteOne({_id :id})
  res.send("deleted")
})
 
app.listen(3050, () => {
  console.log("Server is running on port 3050");
});

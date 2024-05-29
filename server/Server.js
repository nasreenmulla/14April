 //connection phase
 const express=require("express")
  const mongoose=require("mongoose")
  const bodyParser = require('body-parser');
  // const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
  require("dotenv").config()
  const cors=require("cors")
  const app=express()
  const PORT=process.env.PORT || 5000;
  app.use(express.json())
  app.use(cors())
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("mongodb connected")
  }).catch(()=>{
    console.log(err)
  })
  app.get("/",(req,res)=>{
      res.send("14 april folder server")
  })
  app.listen(PORT,()=>console.log(' server connected'));


  //making schema and model for adding banks

  const Addbschema=mongoose.Schema({
    bankName:String,
    accountNumber: { type: String, unique: true },
    ifscCode:String,
    branchName:String

  },{
    timestamps:true
  })

  const Addbmod=mongoose.model("Addb",Addbschema)
  app.post("/createB",async(req,res)=>{

    const { bankName, accountNumber, ifscCode, branchName } = req.body;

        // Check if bank entry with the same account number already exists
        const existingEntry = await Addbmod.findOne({ accountNumber });
        if (existingEntry) {
            return res.status(400).json({ success: false, message: 'Bank entry with the same account number already exists' });
        }

        // Create new bank entry
        const newBankEntry = new Addbmod({
            bankName,
            accountNumber,
            ifscCode,
            branchName
        });

        // Save the new bank entry to the database
        await newBankEntry.save();

  
    res.send({success:true,message:"banks created successfully",data:newBankEntry})
})

app.put("/updateB",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body

    const data=await Addbmod.updateOne({_id:_id},rest)
    res.send({success:true,message:"data updated",data:data})
})

app.delete("/deleteB/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await Addbmod.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully",data:data})
    console.log(id)
})

app.get("/getbank",async(req,res)=>{
  const data=await Addbmod.find({});
  res.send({success:true,message:"banks laoded secussfull",data:data})
})
app.get('/api/bankEntries', async (req, res) => {
  try {
      const pageSize = parseInt(req.query.pageSize) || 10;
      const searchQuery = req.query.searchQuery || '';

      // Search for bank entries based on search query
      const filteredEntries = await Addbmod.find({
          $or: [
              { accountNumber: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive regex search for account number
              { bankName: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive regex search for bank name
              { ifscCode: { $regex: searchQuery, $options: 'i' } } // Case-insensitive regex search for IFSC code
          ]
      }).limit(pageSize);

      res.json(filteredEntries);
  } catch (error) {
      console.error('Error fetching bank entries:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



//making schema and model for Adding payee
const Addpschema=mongoose.Schema({
  PayeeName:{type:String,unique:true},
  ContactNo:String,
  City:String,
  Address:String

},{
  timestamps:true
})

const Addpmod=mongoose.model("Addp",Addpschema)
app.post("/createP",async(req,res)=>{

  const { PayeeName, ContactNo, City, Address } = req.body;

      // Check if bank entry with the same account number already exists
      const existingEntry = await Addpmod.findOne({ PayeeName });
      if (existingEntry) {
          return res.status(400).json({ success: false, message: 'Payee entry with the same name already exists' });
      }

      // Create new bank entry
      const newBankEntry = new Addpmod({
        PayeeName,
         ContactNo, 
         City,
          Address 
      });

      // Save the new bank entry to the database
      await newBankEntry.save();


  res.send({success:true,message:"banks created successfully",data:newBankEntry})
})
app.get("/getpayee",async(req,res)=>{
  const data=await Addpmod.find({});
  res.send({success:true,message:"payeee laoded secussfull",data:data})
})

app.put("/updateP",async(req,res)=>{
  console.log(req.body)
  const {_id,...rest}=req.body

  const data=await Addpmod.updateOne({_id:_id},rest)
  res.send({success:true,message:"data updated",data:data})
})

app.delete("/deleteP/:id",async(req,res)=>{
  const id=req.params.id;
  const data=await Addpmod.deleteOne({_id:id})
  res.send({success:true,message:"data deleted successfully",data:data})
  console.log(id)
})


app.get('/api/PayeeEntries', async (req, res) => {
try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchQuery = req.query.searchQuery || '';

    // Search for bank entries based on search query
    const filteredEntries = await Addpmod.find({
        $or: [
            { ContactNo: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive regex search for account number
            { PayeeName: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive regex search for bank name
            { City: { $regex: searchQuery, $options: 'i' } } // Case-insensitive regex search for IFSC code
        ]
    }).limit(pageSize);

    res.json(filteredEntries);
} catch (error) {
    console.error('Error fetching bank entries:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});
 

//making schema for user
const UserSchema =  mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  company:String
},{
  timestamps:true
});

const Usermod=mongoose.model("User",UserSchema)

app.get("/getuser",async(req,res)=>{
  const data=await Usermod.find({});
  res.send({success:true,message:"Users laoded secussfull",data:data})
})
const jwt = require('jsonwebtoken');

// Function to generate JWT token with expiration time of 1 hour
function generateToken(userId) {
    return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
}

app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, company } = req.body;

        // Save user details in the database
        const newUser = new Usermod({ firstName, lastName, email, password, company });
        await newUser.save();

        // Generate JWT token with user ID and expiration time of 1 hour
        const token = generateToken(newUser._id);

        // Return token and message upon successful registration
        res.json({ success: true, message: 'User registered successfully', token, initial: firstName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Usermod.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare password
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token with user ID and expiration time of 1 hour
        const token = generateToken(user._id);

        // Return token and message upon successful login
        res.json({ success: true, message: 'Login successful', token, initial: user.firstName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});











// const chequeSchema = new mongoose.Schema({
//   datePosition: { type: Object },
//   payeeNamePosition: { type: Object },
//   amountInWordsPosition: { type: Object },
//   amountPosition: { type: Object },
// });

// const Cheq = mongoose.model('Cheque', chequeSchema);

// app.get('/api/cheques', async (req, res) => {
//     try {
//       const cheque = await Cheq.findOne();
//       if (!cheque) {
//         res.json({});
//         return;
//       }
//       res.json({
//         datePosition: cheque.datePosition,
//         payeeNamePosition: cheque.payeeNamePosition,
//         amountInWordsPosition: cheque.amountInWordsPosition,
//         amountPosition: cheque.amountPosition,
//       });
//     } catch (error) {
//       console.error('Error fetching cheque data:', error);
//       res.status(500).send('Error fetching cheque data');
//     }
//   });

// app.post('/p', async (req, res) => {
//   try {
//     const { datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = req.body;
//     const cheque = await Cheq.findOne();
//     if (!cheque) {
//       const newCheque = new Cheq({
//         datePosition,
//         payeeNamePosition,
//         amountInWordsPosition,
//         amountPosition,
//       });
//       await newCheque.save();
//     } else {
//       await Cheq.updateOne({}, {
//         datePosition,
//         payeeNamePosition,
//         amountInWordsPosition,
//         amountPosition,
//       });
//     }
//     res.status(201).send('Cheque data saved successfully');
//   } catch (error) {
//     console.error('Error saving cheque data:', error);
//     res.status(500).send('Error saving cheque data');
//   }
// });

// const mongoose = require('mongoose');
const selectcheque=new mongoose.Schema({
  bselect:{type:String},
  dselect:{type:String},
  pselect:{type:String},
  aselect:{type:String},
  wselect:{type:String}
})

const Sele=mongoose.model('Selectss',selectcheque)





app.post('/registerSelect', async (req, res) => {
    try {
        const { bselect, dselect, pselect, aselect, wselect } = req.body;

        // Save user details in the database
        const newUser = new Sele({ bselect, dselect, pselect, aselect, wselect });
        await newUser.save();

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



const chequeSchema = new mongoose.Schema({
  bank: { type: String }, // Add a field to store the selected bank
  datePosition: { type: Object },
  payeeNamePosition: { type: Object },
  amountInWordsPosition: { type: Object },
  amountPosition: { type: Object },
});

const Cheq = mongoose.model('Cheque', chequeSchema);

app.get('/api/cheques', async (req, res) => {
  try {
    const { bank } = req.query; // Get the selected bank from query parameters
    const cheque = await Cheq.findOne({ bank });
    if (!cheque) {
      res.json({});
      return;
    }
    res.json({
      datePosition: cheque.datePosition,
      payeeNamePosition: cheque.payeeNamePosition,
      amountInWordsPosition: cheque.amountInWordsPosition,
      amountPosition: cheque.amountPosition,
    });
  } catch (error) {
    console.error('Error fetching cheque data:', error);
    res.status(500).send('Error fetching cheque data');
  }
});

app.post('/po', async (req, res) => {
  try {
    const { bank, datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = req.body;
    const cheque = await Cheq.findOne({ bank });
    if (!cheque) {
      const newCheque = new Cheq({
        bank,
        datePosition,
        payeeNamePosition,
        amountInWordsPosition,
        amountPosition,
      });
      await newCheque.save();
    } else {
      await Cheq.updateOne({ bank }, {
        datePosition,
        payeeNamePosition,
        amountInWordsPosition,
        amountPosition,
      });
    }
    res.status(201).send('Cheque data saved successfully');
  } catch (error) {
    console.error('Error saving cheque data:', error);
    res.status(500).send('Error saving cheque data');
  }
});


const settingsSchema = new mongoose.Schema({
  printerName: String,
  printOrientation: String
});


const setmodel=mongoose.model('setting',settingsSchema)
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await setmodel.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    let settings = await setmodel.findOne();
    if (!settings) {
      settings = new setmodel(req.body);
    } else {
      settings.set(req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

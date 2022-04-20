const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../db/conn');
const User = require('../models/userSchema');


// route  login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill the fields" });
    }
    
        const userLogin = await User.findOne({ email: email});
        // console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (isMatch) {
    
                return res.status(201).json({ message: "successfully login credentials" })
            } else {
                return res.status(422).json({ error: "errr in login pass" });
            }
    
        }else{
            return res.status(422).json({ error: "Fill the credentials" });
        }
      


});





router.get('/', (req, res) => {
    res.send('HELLO world from the server router');
});

// By using Async and await

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plesae fill the fields " });
    }
    try {


        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });

        }

        const user = new User({
            name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword
        });


        // before saving the daata we have have hashed the password


        await user.save();
        res.status(201).json({ message: "User Registered Sucess fully " });

    } catch (err) {
        console.log(err);
    }

});



// Using Promises

// router.post('/register',(req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body;
//      if(!name || !email || !phone || !work || !password || !cpassword){
//          return res.status(422).json({error:"Plesae fill the fields "})
//      }

//      User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already Exist"});
//         }

//         const user= new User({
//             name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword
//         });
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered sucessfully"});
//         }).catch((err)=>{
//             res.status(500).json({error:"Failed registered"})
//         })

//      }).catch(err=> {console.log(err);});

// });

module.exports = router;
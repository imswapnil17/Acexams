import User from "../Models/UserModel.js";


export async function login(req,res) {
    try{
        const {email,password,username,name} = req.body;
        if(!email || !password || !username || !name){
            res.status(400).json({success:false,message:"All Fields Are Required"})
        }
        const email_regex = "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
        const pass_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"

        if(!email_regex.test(email)){
            res.status(400).json({success:false,message:"Invalid Email"})

        }
        if(password<5){
            res.status(400).json({success:false,message:"Password must be longer than 5 letters"})
        }
       
        const existingEmail = await User.findOne({email:email})

        if(existingEmail==email){
            res.status(400).json({success:false,message:"User Already Exists !"})

        }
        const existingUsername = await User.findOne({username:username})

        if(existingUsername==username){
            res.status(400).json({success:false,message:"Username Already Exists !"})

        }

        const newUser = new User({
            email,
            password,
            username,
            name,
        })
        await newUser.save();

        res.status(201).json({success:true,user:{...newUser._id,password:""}})

    }
    catch(error){
        console.error(error)
        res.status(500).json({success:"False",message:"Internal Server Error"})
    }
}
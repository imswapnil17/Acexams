export const getPapers = async(req,res)=>{
    try{

    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}


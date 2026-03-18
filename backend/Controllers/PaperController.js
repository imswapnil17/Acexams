import { extractPaper, getPYP, getSubjectsByClass } from "../services/paperExtractor.js"

export const getSubjects = async (req, res)=>{
    try {
        if (!req.params) { return res.status(404).json({ success: false, message: "Page not found" }) }
        const { subclass } = req.params
        if (!subclass) { return res.status(400).json({ success: false, message: "Bad request" }) }
        let subjects = await getSubjectsByClass(subclass)
        return res.status(200).json({success:true,subjects:subjects})
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
} 

export const getPYPs = async(req,res)=>{
    try{
        const {class:subclass,uid,id} = req.params
        const {page} = req.query 
        if(!page){console.log("Page not found")}
        console.log("page",page)
        if(!subclass || !id){return res.status(400).json({success:false,message:"Papers not found"})}
        const response = await getPYP(subclass,uid,id,page)
        return res.status(200).json({success:true,response})
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}
export const getPaperPDF = async (req,res)=>{
    try{
        const {class:subclass,uid,paper,id} = req.params
        if(!subclass || !id){return res.status(400).json({success:false,message:"Papers not found"})}
        const response = await extractPaper(subclass,uid,paper,id)
        return res.status(200).json({success:true,response})
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }
}
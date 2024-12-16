    import mongoose from "mongoose";
    
    const configureDB=async()=>{

  
    try{
        const db=await  mongoose.connect(process.env.DB_URL)
        console.log("db connected successfully")
    }
    catch(err){
        console.log("err connecting to db",err)
    }
}

    export default configureDB
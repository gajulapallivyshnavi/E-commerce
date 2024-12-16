import { validationResult } from "express-validator";
import Enquiry from "../models/enquiry-model.js";
import Product from "../models/product-model.js";

const EnquiryCltr={}

 EnquiryCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       
        return res.status(400).json({error:errors.array()})
    }
    const body=req.body
    try{
    const enquiry=new Enquiry(body)
    enquiry.buyer=req.currentUser.userId
    await enquiry.save()
     res.status(201).json(enquiry)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:"something wenr wrong"})
    }

 }

 EnquiryCltr.show=async(req,res)=>{
      const errors=validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
      const id=req.params.id
      try{
        const enquiry=await Enquiry.findOne({_id:id,buyer:req.currentUser.userId})
        if(!enquiry){
            return res.status(404).json({error:"record not found"})
        }
        res.json(enquiry)

      }
      catch(err){
           console.log(err)
           res.status(500).json({error:"something went wrong"})
      }
 }


 EnquiryCltr.myEnquries=async(req,res)=>{
    try{
        const enquiry=await Enquiry.find({buyer:req.currentUser.userId})
        res.status(201).json(enquiry)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"somehing went wrong"})
    }
       
 }

 EnquiryCltr.productEnquries=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const id=req.params.id
    let product
    if(req.currentUser.role=="admin"){
        product=await Product.findById(id)
    }
    else{
        await Product.findOne({_id:id,user:req.currentUser.userId})
    }
    try{
       
        if(!product){
            return res.status(400).json({error:"record not found"})
        }
        const enquries=await Enquiry.find({product:id})
        res.json(enquries)
    }
    catch(err)
    {
          console.log(err)
          res.status(500).json({error:"something went wrong"})
    }
 }

export default EnquiryCltr
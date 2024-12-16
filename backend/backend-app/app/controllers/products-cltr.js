import Product from "../models/product-model.js";
import { validationResult } from "express-validator";
import _ from "lodash"
const productsCltr={}

productsCltr.list=async(req,res)=>{
    try{
        const products=await Product.find({isVerified:true})
        res.status(201).json(products)
    }
    catch(err){
        console.log(err)
        req.status.json({error:"something went wrong"})
    }
}

productsCltr.myProducts=async(req,res)=>{
    try{
        const products=await Product.find({user:req.currentUser.userId})
        res.status(201).json(products)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"somethimg went wrong"})

    }

}
productsCltr.show=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const product=await  Product.findOne({isVerified:true,_id:id})  
        if(!product){
            return res.status(404).json({error:"record not found"})
        }
        res.json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})
    }

}

productsCltr.verify=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
    const product=await Product.findByIdAndUpdate(id,body,{new:true, runValidators:true})
    if(!product){
        return res.status(404).json({error:"record not found"})
    }
    res.json(product)
}
catch(err){
 console.log(err)
 res.status(500).json({error:"something went wrong"})
}
}


productsCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=_.pick(req.body,["name","price","description","category"])
    try{
    const product=new Product(body)
    product.user=req.currentUser.userId
    await product.save()
    res.status(201).json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})
    }

}
  

productsCltr.update=async(req,res)=>{
    const errors=validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
      const id=req.params.id
      const body=_.pick(req.body["name","description","price","category"])
      try{
        let product
        if(req.currentUser.role=="admin"){
            product=await Product.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        }
        else{
            product=await Product.findOneAndUpdate({_id:id,user:req.currentUser.userId},body,{new:true,runValidators:true})
        }
        if(!product){
           return res.status(404).json({error:"record not found"}) 
        }
        res.json(product)
      }
      catch(err){
         console.log(err)
         res.status(500).json({error:"somwthing went wrong"})
      }
     
}

productsCltr.remove=async(req,res)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const id=req.params.id
  try{
    let product
    if(req.user=="admin"){
        product=await Product.findByIdAndDelete(id)
    }
    else{
        product=await Product.findOneAndDelete({_id:id,user:req.currentUser.userId})
    }
    if(!product){
        return res.status(404).json({error:"record not found"})
    }
    res.json(product)

  }
  catch(err){
     console.log(err)
     res.status(500).json({error:"something went wrong"})
  }
}

export default productsCltr
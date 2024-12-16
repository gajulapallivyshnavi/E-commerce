import Category from "../models/category-model.js";
import { validationResult } from "express-validator";
const categoriesCltr={}

categoriesCltr.list=async(req,res)=>{
    try{
        const categories=await Category.find()
        res.json(categories)

    }catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})

    }
}

categoriesCltr.show=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res. status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const category=await Category.findById(id)
        if(!category){
            return res.status(404).json({error:"record not found"})
        }else{
            res.json(category)
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})

    }

}

categoriesCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
      const body=req.body
      try{
        const category=await Category.create(body)
        res.status(201).json(category)
      }
      catch(err){
        res.status(500).json("sonmething went wrong")
      }


}

categoriesCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
      const body=req.body
      const id=req.params.id
      try{
        const category=await Category.findByIdAndUpdate(id,body,{new:true})
        if(!category){
          return   res.status(404).json("record not found")

        }
        else{
            res.json(category)
        }
      }
      catch(err){
        res.status(500).json("something went wrong")
      }
}

categoriesCltr.remove=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const category=await Category.findByIdAndDelete(id)
          if(!category){
             return res.status(404).json("record not found")

          }else{
            res.json(category)
          }

    }
    catch(err){
        res.status(500).json("something went wrong")
    }
}

export default categoriesCltr
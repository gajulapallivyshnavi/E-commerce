import Category from "../models/category-model.js";
const categoryValidationSchema={
    name:{
        in:["body"],
        exists:{
            errorMessage:"name is required"
        },
        notEmpty:{
            errorMessage:"name cannot be empty"
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:"name should be between 3 to 20 characters long"
        },
        custom:{
            options:async function(value){
                const category=await Category.findOne({name:value})
                if(category){
                    throw new Error("name already taken")
                }
                else{
                    return true
                }
            }
        },
        trim:true
    }
    
}
export default categoryValidationSchema

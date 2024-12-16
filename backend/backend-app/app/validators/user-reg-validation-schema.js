import User from "../models/user-model.js"

export const userRegValidationSchema={
   
    email: {
        // in:["body"],
        exists: {
            errorMessage: 'email is required'            
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        }, 
        normalizeEmail: true,
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,
        

    },
    password:{
        exists:{
            errorMessage:"password is required"
        },
        notEmpty:{
            errorMessage:"password cannot be empty"
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:"password should be between 8  to 128 characters"
        },
        isStrongPassword:{
            options:{
                minNumber:1,
                minLowerCase:1,
                minUpperCase:1,
                minSymbol:1
            },
            errorMessage:"password sholud be contain atleast 1 number,1 lowercase,1 uppercase,symbol"
        },
        trim:true,

    }

}

export  const userLoginSchema={
    email: {
        // in:["body"],
        exists: {
            errorMessage: 'email is required'            
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        }, 
        normalizeEmail: true,
    },
    password:{
        exists:{
            errorMessage:"password is required"
        },
        notEmpty:{
            errorMessage:"password cannot be empty"
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:"password should be between 8  to 128 characters"
        },
        isStrongPassword:{
            options:{
                minNumber:1,
                minLowerCase:1,
                minUpperCase:1,
                minSymbol:1
            },
            errorMessage:"password sholud be contain atleast 1 number,1 lowercase,1 uppercase,symbol"
        },
        trim:true,
    }
}
export const userLoginValidationSchema={}
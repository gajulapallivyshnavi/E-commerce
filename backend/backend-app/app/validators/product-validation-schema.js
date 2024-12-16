const productValidationSchema={
    name:{
        in:["body"],
        exists:{
            errorMessage:"name is required"
        },
        notEmpty:{
            errorMessage:"name cannot be empty"
        },
        // isLength:{
        //     options:{min:3,max:20},
        //     errorMessage:"name should be between 10 to 20 characterslong"
        // },
        trim:true
    },
    description:{
        in:["body"],
        exists:{
            errorMessage:"description is required"
        },
        notEmpty:{
            errorMessage:"description cannot be empty"
        },
        trim:true

    },
    category:{
        in:["body"],
        exists:{
            errorMessage:"category is required"
        },
        notEmpty:{
            errorMessage:"category cannot be empty"
        },

    },
    price :{
        in:["body"],
        exists:{
            errorMessage:"price is required"
        },
        notEmpty:{
            errorMessage:"price cannot be empty"
        },
        isNumeric:{
            options:{min:1},
            errorMessage:"price should be a number of minimum 1"
        },
        trim:true
    }

}
export default productValidationSchema
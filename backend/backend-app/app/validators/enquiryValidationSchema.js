const enquiryValidationSchema={
    product:{
        in:["body"],
        exists  :{
            errorMessage:"product field ,is reqires"
        },
        notEmpty:{
            errorMessage:"product cannot be empty"
        },
        isMongoId:{
            errorMessage:"product should be a valid mongo id"
        },
        trim:true
    }
}

export default enquiryValidationSchema
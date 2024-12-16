const  idValidationSchema={
    id:{
        in:["params"],
        isMongoId:{
            errorMessage:"invalid mongo id"
        }
    }

}
export default idValidationSchema
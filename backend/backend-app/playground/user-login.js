import bcryptjs from "bcryptjs"

async function login(password){
    const passwordInDb="$2a$10$ePfYUxO7dDw9PChbIk7fuOl8YPZ8aLdon02os/lh62TK5X.81Sav6"
    // const isvalid=await bcryptjs.compare(password,passwordInDb)
    // console.log(isvalid)
   const saltUsed=passwordInDb.slice(0,29)
   const newHash=await bcryptjs.hash(password,saltUsed)
   console.log(newHash==passwordInDb)



}
login("secret123")
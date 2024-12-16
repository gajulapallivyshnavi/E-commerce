import bcryptjs from "bcryptjs"
async function register(password){
    const salt=await bcryptjs.genSalt()
    console.log("salt",salt,salt.length)
    const hash=await bcryptjs.hash(password,salt)
    console.log("hash",hash,hash.length)

}
register("secret123")

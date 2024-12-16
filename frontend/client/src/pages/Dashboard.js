import AuthContext from "../context/AuthContext"
import { useContext } from "react"
export default function Dashboard(){
    const {userstate}=useContext(AuthContext)
    if(!userstate.user){
        return <p>..loading</p>
    }
    return(
        <div>
            <h2>Dashboard page</h2>
        </div>
    )
}
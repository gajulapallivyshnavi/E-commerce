import AuthContext from "../context/AuthContext"
import { useContext } from "react"
export default function Account(){
    const {userstate}=useContext(AuthContext)
    return(
        <div>
            <h2>Account page</h2>
            <p>id-{userstate.user._id}</p>
            <p>email-{userstate.user.email}</p>
            <p>role-{userstate.user.role}</p>

        </div>
    )
}
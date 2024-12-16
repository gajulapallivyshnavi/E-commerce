import AuthContext from "../context/AuthContext";
import { useReducer, useEffect } from "react";
import axios from "axios";
import userReducer from "../reducers/user-reducer";
// import { useState } from "react";
const initialState = {
  isLoggedIn: false,
  user: null,
};

function AuthProvider(props) {
  const [userstate, userdispatch] = useReducer(userReducer, initialState);
  const handleLogin = (user) => {
    userdispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: user } });
  };
  const handleLogout = () => {
    userdispatch({
      type: "LOGOUT",
      payload: { isLoggedIn: false, user: null },
    });
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.get(
            "http://localhost:3010/api/users/account",
            { headers: { Authorization: localStorage.getItem("token") } }
          );
          handleLogin(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, []);
  console.log(localStorage.getItem("token"), "sds");

  if (localStorage.getItem("token") && !userstate.user) {
    return <p>loading</p>;
  }

  // const [userstate,setUserState]=useState(initialState)
  // const handleLogin=()=>{
  //      setUserState({isLoggedIn:true,user:{}})
  // }
  // const handleLogout=()=>{
  //     setUserState({isLoggedIn:false,user:null})
  // }

  return (
    <div>
      <AuthContext.Provider value={{ userstate, handleLogin, handleLogout }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
}
export default AuthProvider;

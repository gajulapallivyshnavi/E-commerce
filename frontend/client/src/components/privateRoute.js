import { Navigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { useContext } from "react";
export default function PrivateRoute(props) {
  console.log(props.userstate, "userstate...");
  if (!props.userstate.user) {
    // return <p>..loading</p>;
    return <Navigate to="/login" replace />;
  }
  // console.log(props.userstate, "userstatee");
  else if (
    props.permittedRoles &&
    props.permittedRoles.includes(props.userstate.user.role)
  ) {
    return props.children;
  } else if (
    props.permittedRoles &&
    !props.permittedRoles.includes(props.userstate.user.role)
  ) {
    return <p>Unauthorized</p>;
  } else if (props.userstate) {
    return props.children;
    // } else {
    //   return <Navigate to="/login" replace />;
    // }
  }
}

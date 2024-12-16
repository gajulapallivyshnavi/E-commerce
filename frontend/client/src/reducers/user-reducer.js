
const useReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {...state,...action.payload}
        }
        case "LOGOUT":{
            return {isLoggedIn:false,user:null}
        }
        default:{
            return {...state}
        }
    }
}

export default useReducer
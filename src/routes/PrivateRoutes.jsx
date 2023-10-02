import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import hasAnyPermission from "../utils/Permissions"

function PrivateRoutes(props){
    const token = Cookies.get('token')
    const permissions = props.permissions

    if(!token){
        return <Navigate to="/login" replace/>
    }

    if(!permissions || hasAnyPermission(permissions)){
        return props.children
    }else{
        return <Navigate to="/forbidden" replace />
    }

}

export default PrivateRoutes
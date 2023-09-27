import { Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import Login from "../views/Auth/Login"
import Forbidden from "../views/Auth/Forbiddeon"
import Dashboard from "../views/Admin/Dashboard"

export default function RouteIndex() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/forbidden" element={<Forbidden/>}/>
            <Route path="/admin/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
        </Routes>
    )
}
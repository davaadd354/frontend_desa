import LayoutAuth from "../../layouts/Auth"
import { useState } from "react"
import Api from "../../services/Api"
import Cookies from "js-cookie"
import { Navigate, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login(){
    document.title = 'Login = Admin Desa'

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState([])

    // method login 
    const login = async (e) => {
        e.preventDefault()

        await Api.post("/api/login", {
            //data
            email : email,
            password : password
        }).then((response) => {
            //set token 
            Cookies.set("token", response.data.token)

            //set user
            Cookies.set("user", JSON.stringify(response.data.user))

            //set permissions
            Cookies.set("permissions", JSON.stringify(response.data.permissions))

            toast.success("Login Successfully!", {
                position : "top-right",
                duration : 4000
            })

            // //redirect dashboard page
            navigate("/admin/dashboard")

        }).catch((error) => {
            setErrors(error.response.data)
        })
    }

    if(Cookies.get("token")){
        //redirect dashboard page
        // return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <LayoutAuth>
            <div className="row align-items-center justify-content-center" style={{marginTop: "50px"}}>
                <div className="col-md-10">
                    <div className="text-center mb-5">
                        <img src={"/images/logo-jbg.png"} width={"100"} />
                        <h4>
                            <strong className="text-white">DESA SANTRI, JOMBANG</strong>
                        </h4>
                    </div>
                    <div className="card rounded-4 border-top-success shadow-sm">
                        <div className="card-body">
                            <div className="form-left h-100 py-3 px-3">
                                {errors.message && (
                                    <div className="alert alert-danger">{errors.message}</div>
                                )}
                                <form className="row g-4" onSubmit={login}>
                                    <div className="col-12">
                                        <label>Email Address</label>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                            <input type="text" 
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder="Enter Email Address"/>
                                        </div>
                                        {errors.email && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.email[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </div>
                                            <input type="password" 
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                            placeholder="Enter Password"/>
                                        </div>
                                        {errors.password && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.password[0]}
                                            </div>
                                        )}
                                    </div>

                                    <button type="submit" className="btn btn-primary px-4 float-end rouded-4">
                                        LOGIN
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    )
}
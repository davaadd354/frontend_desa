//import react
import { useState, useEffect } from "react"

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom"

//import layout
import LayoutAdmin from "../../../layouts/Admin"

//import api
import Api from "../../../services/Api"

//import js cookie
import Cookies from "js-cookie"

//import toast
import toast from "react-hot-toast"

export default function RolesEdit(){
    //title page 
    document.title = 'Edit Role - Desa Digital'

    //navigata
    const navigate = useNavigate()

    // //get ID from parameter URL
    const { id } = useParams()

    //define state for form
    const [name, setName] = useState('')
    const [permissionsData, setPermissionsData] = useState([])
    const [errors, setErrors] = useState([])

    //define state 'permissions'
    const [permissions, setPermissions] = useState([])
    
    //get token from cookies
    const token = Cookies.get('token')

    const fetchDataPermissions = async () => {
        await Api.get('/api/admin/permissions/all', {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            setPermissions(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const fetchDataRole = async () => {
        await Api.get(`/api/admin/roles/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setName(response.data.data.name)
            setPermissionsData(response.data.data.permissions.map((obj) => obj.name))
        })
    }

    useEffect(() => {
        fetchDataPermissions()
        fetchDataRole()
      }, [])


    const handleCheckboxChange = (e) => {
        let data = permissionsData

        if(data.some((name) => name === e.target.value)){
            data = data.filter((name) => name !== e.target.value)
        }else{
            data.push(e.target.value)
        }

        setPermissionsData(data)
    }

    const updateRole = async (e) => {
        e.preventDefault()

        await Api.post(
            `/api/admin/roles/${id}`,
            {
                name : name,
                permissions : permissionsData,
                _method : 'PUT'
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        ).then((response) => {
            toast.success(response.data.message, {
                position : 'top-right',
                duration : 4000
            })

            navigate('/admin/roles')


        }).catch((error) => {
            setErrors(error.response.data)
        })
    }

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                            to='/admin/roles'
                            className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                            type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-shield-alt"></i> Edit Role
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateRole}>
                                        <div className="mb-3">
                                            <lable className="form-lable fw-bold">
                                                Role Name
                                            </lable>
                                            <input 
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter Role Name"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="alert alert-danger">{errors.name[0]}</div>
                                        )}
                                        <hr />
                                        <div className="mb-3">
                                            <lable className="fw-bold">
                                                Permissions
                                            </lable>
                                            <br />
                                            {permissions.map((permission) => (
                                                <div className="form-check form-check-inline" key={Math.random()}>
                                                    <input 
                                                    type="checkbox" 
                                                    className="form-check-input"
                                                    value={permission.name}
                                                    defaultChecked={permissionsData.some((name) => name === permission.name ?? true)}
                                                    onChange={handleCheckboxChange}
                                                    id={`check-${permission.id}`}
                                                    />
                                                    <label 
                                                    htmlFor={`check-${permission.id}`}
                                                    className="form-check-label fw-normal"
                                                    >
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary me-2"
                                            >
                                                <i className="fa fa-save"></i> Update
                                            </button>
                                            {/* <button type="reset" className="btn btn-md btn-warning">
                                                <i className="fa fa-redo"></i> Reset
                                            </button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    )
}

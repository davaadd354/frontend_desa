//import react
import { useEffect, useState } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function CategoriesEdit () {
    document.title = 'Edit Category - Desa Digital'

    const token = Cookies.get('token')

    const {id} = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const fetchDataCategory = async () => {
        await Api.get(
            `/api/admin/categories/${id}`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        ).then((response) => {
            setName(response.data.data.name)
        })

    }

    useEffect(() => {
        fetchDataCategory()
    }, [])

    const updateCategory = async (e) => {
        e.preventDefault()

        await Api.post(
            `/api/admin/categories/${id}`,
            {
                name : name,
                _method : 'PUT'
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : 'multipart/form-data'
                }
            }
        ).then((response) => {
            toast.success(response.data.message, {
                position : 'top-right',
                duration : 3000
            })

            navigate('/admin/categories')
        }).catch((error) => {
            setErrors(error.response.data)
        })
    }


    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                            to='/admin/categories'
                            className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                            type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6 className="fa fa-folder"></h6> Create Category
                                    <hr />
                                    <form onSubmit={updateCategory}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Category Name
                                            </label>
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter Category Name"/>
                                        </div>
                                        {errors.name && (
                                            <div className="alert alert-danger">{errors.name[0]}</div>
                                        )}
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary me-2"
                                            >
                                                <i className="fa fa-save"></i> Save
                                            </button>
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
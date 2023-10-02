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

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";



export default function PagesUpdate() {
    document.title = 'Edit Page - Desa Digital'

    const navigate = useNavigate()

    const { id } = useParams()

    //define state for form
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const token = Cookies.get('token')

    const fetchDataPage = async () => {
        await Api.get(
            `/api/admin/pages/${id}`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        ).then((response) => {
            setTitle(response.data.data.title)
            setContent(response.data.data.content)
        })
    }

    useEffect(() => {
        fetchDataPage()
    }, [])

    const updatePage = async (e) => {
        e.preventDefault()

        await Api.post(
            `/api/admin/pages/${id}`,
            {
                title : title,
                content : content,
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

            navigate('/admin/pages')
        }).catch((error) => {
            setErrors(error.response.data)
        })
    }

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid my-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                                to="/admin/pages"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil-alt"></i> Create Page
                                    </h6>
                                    <hr />
                                    <form onSubmit={updatePage}>
                                        <div className="mb-3">
                                            <div className="form-label fw-bold">Title</div>
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter Title Page"/>
                                        </div>
                                        {errors.title && (
                                            <div className="alert alert-danger">
                                                {errors.title[0]}
                                            </div>
                                        )}
                                        <div className="mb-3">
                                        <label className="form-label fw-bold">Content</label>
                                            <ReactQuill
                                                theme="snow"
                                                rows="5"
                                                value={content}
                                                onChange={(content) => setContent(content)}
                                            />
                                        </div>
                                        {errors.content && (
                                            <div className="alert alert-danger">
                                                {errors.content[0]}
                                            </div>
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
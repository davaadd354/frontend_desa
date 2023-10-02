//import react
import { useState, useEffect } from "react";

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


export default function PostEdit () {
    document.title = 'Edit Post - Desa Digital'

    const navigate = useNavigate()

    const { id } = useParams()

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    const [categories, setCategories] = useState([])

    const token = Cookies.get('token')

    const fetchDataCategories = async () => {
        await Api.get("/api/admin/categories/all", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setCategories(response.data.data)
        });
    }

    const fetchDataPost = async () => {
        await Api.get(
            `/api/admin/posts/${id}`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        ).then((response) => {
            setTitle(response.data.data.title)
            setCategoryID(response.data.data.category_id)
            setContent(response.data.data.content)
        })
    }

    useEffect(() => {
        fetchDataCategories()
        fetchDataPost()
    }, [])


   const editPost = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('category_id', categoryID)
        formData.append('content', content)
        formData.append('_method', 'PUT')

        await Api.post(`/api/admin/posts/${id}`, formData, {
            headers : {
                Authorization : `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {
            toast.success(response.data.message, {
                position : 'top-right',
                duration : 3000
            })
            

            navigate('/admin/posts')
        }).catch((err) => {
            setErrors(err.response.data)
        })
    }


    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                            to='/admin/posts'
                            className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-pencil-alt"></i> Create Post
                                    </h6>
                                    <hr />
                                    <form onSubmit={editPost}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Image
                                            </label>
                                            <input 
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])} 
                                            />
                                        </div>
                                        {errors.image && (
                                            <div className="alert alert-danger">
                                                {errors.image[0]}
                                            </div>
                                        )}

                                        <div className="mb-3">
                                            <div className="form-label fw-bold">Title</div>
                                            <input 
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter Title Post"
                                            />
                                        </div>
                                        {errors.image && (
                                            <div className="alert alert-danger">
                                                {errors.image[0]}
                                            </div>
                                        )}

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Category</label>
                                            <select 
                                            className="form-select" 
                                            value={categoryID}
                                            onChange={(e) => setCategoryID(e.target.value)}
                                            >
                                                <option value="">-- Select Category --</option>
                                                {categories.map((category) => (
                                                    <option value={category.id} key={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.category_id && (
                                            <div className="alert alert-danger">
                                                {errors.category_id[0]}
                                            </div>
                                        )}

                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Content</label>
                                            <ReactQuill
                                            theme="snow"
                                            rows="5"
                                            value={content}
                                            onChange={(content) => setContent(content)}
                                            ></ReactQuill>
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
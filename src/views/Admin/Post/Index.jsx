//import useState and useEffect
import { useState, useEffect } from "react"

//import Link from react router dom
import { Link } from "react-router-dom"

//import api
import Api from "../../../services/Api"

//import js cookie
import Cookies from "js-cookie"

//import layout
import LayoutAdmin from "../../../layouts/Admin"

//import permissions
import hasAnyPermission from "../../../utils/Permissions"

//import pagination component
import Pagination from "../../../components/general/Pagination"

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert"

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"

import toast from "react-hot-toast"

export default function PostIndex () {
    document.title = 'Post - Desa Digital'

    const [posts, setPosts] = useState([])

    const [pagination, setPagination] = useState({
        currentPage : 0,
        perPage : 0,
        total : 0
    })
    
    const [keywords,setKeywords] = useState('')

    const token = Cookies.get('token')

    const fetchData = async (pageNumber = 1, keywords = '') => {
        const page = pageNumber ? pageNumber : pagination.currentPage

        await Api.get(`/api/admin/posts?search=${keywords}&page=${page}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            setPosts(response.data.data.data)

            setPagination(() => ({
                currentPage : response.data.data.current_page,
                perPage : response.data.data.per_page,
                total : response.data.data.total
            }))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const searchData = async (e) => {
        setKeywords(e.target.value)

        fetchData(1, e.target.value)
    } 

    const hapusPost = (id) => {
        confirmAlert({
            title : 'Yakin?',
            message : 'Apakah kamu yakin menghapus post ini?',
            buttons : [
                {
                    label : 'YA',
                    onClick : async () => {
                        await Api.delete(
                            `/api/admin/posts/${id}`,
                            {
                                headers : {
                                    Authorization : `Bearer ${token}`
                                }
                            }
                        ).then((response) => {
                            toast.success(response.data.message, {
                                position : 'top-right',
                                duration : 3000
                            })

                            fetchData()
                        })
                    }
                },
                {
                    label : 'TIDAK',
                    onClick : () => {}
                }
            ]
        })
    }


    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                {hasAnyPermission(['posts.create']) && (
                                    <div className="col-md-3 col-12 mb-2">
                                        <Link
                                            to="/admin/posts/create"
                                            className="btn btn-md btn-primary border-0 shadow-sm w-100"
                                            type="button"
                                        >
                                            <i className="fa fa-plus-circle"></i> Add New
                                        </Link>
                                    </div>
                                )}
                                <div className="col-md-9 col-12 mb-2">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-sm"
                                            onChange={(e) => searchData(e)}
                                            placeholder="search here..."
                                        />
                                        <span className="input-group-text border-0 shadow-sm">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-centered mb-0 rounded">
                                            <thead className="thead-dark">
                                                <tr className="border-0">
                                                    <th className="border-0" style={{ width: "5%" }}>
                                                        No.
                                                    </th>
                                                    <th className="border-0">Title</th>
                                                    <th className="border-0">Image</th>
                                                    <th className="border-0" style={{ width: "20%" }}>
                                                        Category
                                                    </th>
                                                    <th className="border-0" style={{ width: "15%" }}>
                                                        User
                                                    </th>
                                                    <th className="border-0" style={{ width: "15%" }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    posts.length > 0 ? (
                                                        posts.map((post, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-bold text-center">
                                                                {++index +
                                                                    (pagination.currentPage - 1) *
                                                                    pagination.perPage}
                                                                </td>
                                                                <td>{post.title}</td>
                                                                <td>
                                                                    <img src={post.image} width={200} />
                                                                </td>
                                                                <td>{post.category.name}</td>
                                                                <td>{post.user.name}</td>
                                                                <td className="text-center">
                                                                {hasAnyPermission(["posts.edit"]) && (
                                                                    <Link
                                                                    to={`/admin/posts/edit/${post.id}`}
                                                                    className="btn btn-primary btn-sm me-2 mb-2"
                                                                    >
                                                                    <i className="fa fa-pencil-alt"></i>
                                                                    </Link>
                                                                )}

                                                                {hasAnyPermission(["posts.delete"]) && (
                                                                    <button onClick={() => hapusPost(post.id)} className="btn btn-danger btn-sm me-2 mb-2">
                                                                    <i className="fa fa-trash"></i>
                                                                    </button>
                                                                )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                         //tampilkan pesan data belum tersedia
                                                        <tr>
                                                            <td colSpan={5}>
                                                            <div
                                                                className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                                                role="alert"
                                                            >
                                                                Data Belum Tersedia!.
                                                            </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                        position="end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>

    )
}
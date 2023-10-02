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

import { confirmAlert } from "react-confirm-alert"

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"

import toast from "react-hot-toast"

export default function CategoriesIndex () {
    document.title = 'Categories - Desa Digital'

    const [categories, setCategories] = useState([])

    const [pagination, setPagination] = useState({
        currentPage : 0,
        perPage : 0,
        total : 0
    })

    const [keywords, setKeywords] = useState('')

    const token = Cookies.get('token')

    const fetchData = async (pageNumber = 1, keywords = '') => {
        const page = pageNumber ? pageNumber : pagination.currentPage

        await Api.get(`/api/admin/categories?search=${keywords}&page=${page}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            setCategories(response.data.data.data)

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

    const deleteCategory = (id) => {
        confirmAlert({
            title : 'Yakin?',
            message : 'Apakah kamu yakin menghapus kategori ini?',
            buttons : [
                {
                    label : 'YA',
                    onClick : async () => {
                        await Api.delete(
                            `/api/admin/categories/${id}`,
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

                            //perbarui data role setelah dihapus
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
                                {hasAnyPermission(['categories.create']) && (
                                    <div className="col-md-3 col-12 mb-2">
                                        <Link
                                        to='/admin/categories/create'
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
                                        placeholder="Search Here..."
                                        />
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
                                                    <th className="border-0">No.</th>
                                                    <th className="border-0">Category Name</th>
                                                    <th className="border-0">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    categories.length > 0 ? (
                                                        categories.map((category, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-bold text-center">
                                                                    { ++index + (pagination.currentPage - 1) * pagination.perPage}
                                                                </td>
                                                                <td>{category.name}</td>
                                                                <td className="text-center">
                                                                    {hasAnyPermission(['categories.edit']) && (
                                                                        <Link
                                                                        to={`/admin/categories/edit/${category.id}`}
                                                                        className="btn btn-primary btn-sm me-2"
                                                                        >
                                                                            <i className="fa fa-pencil-alt"></i>
                                                                        </Link>
                                                                    )}

                                                                    {hasAnyPermission(['categories.delete']) && (
                                                                        <Link
                                                                        className="btn btn-danger btn-sm "
                                                                        onClick={() => deleteCategory(category.id)}
                                                                        >
                                                                            <i className="fa fa-trash"></i>
                                                                        </Link>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={3}>
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
//import react
import { useState } from "react"

//import react router dom
import { Link, useNavigate } from "react-router-dom"

//import layout
import LayoutAdmin from "../../../layouts/Admin"

//import api
import Api from "../../../services/Api"

//import js cookie
import Cookies from "js-cookie"

//import toast
import toast from "react-hot-toast"

export default function AparatursCreate() {
  //title page
  document.title = "Create Aparatur - Desa Digital"

  //navigata
  const navigate = useNavigate()

  //define state for form
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErros] = useState([])

  //token from cookies
  const token = Cookies.get("token")

  //function "storeAparatur"
  const storeAparatur = async (e) => {
    e.preventDefault()

    //define formData
    const formData = new FormData()

    //append data to "formData"
    formData.append("image", image)
    formData.append("name", name)
    formData.append("role", role)

    //sending data
    await Api.post("/api/admin/aparaturs", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        })

        //redirect
        navigate("/admin/aparaturs")
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data)
      })
  }

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/aparaturs"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil"></i> Create Aparatur
                  </h6>
                  <hr />
                  <form onSubmit={storeAparatur}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Image</label>
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
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Full Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter Role Name"
                      />
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
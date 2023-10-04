import React, { useState, useEffect } from "react"

//import layout web
import LayoutWeb from "../../../layouts/Web"

//import service api
import Api from "../../../services/Api"

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty"

//import component loading
import Loading from "../../../components/general/Loading"

//import component card photo
import CardPhoto from "../../../components/general/CardPhoto"

//import pagination component
import Pagination from "../../../components/general/Pagination"

export default function WebPhotosIndex() {
    document.title = "Galeri Foto - Desa Santri"

    const [photos, setPhotos] = useState([])
    const [loadingPhoto, setLoadingPhoto] = useState(true)

    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
      })
    
    const fetchDataPhotos = async (pageNumber = 1) => {
        setLoadingPhoto(true)

        const page = pageNumber ? pageNumber : pagination.currentPage

        await Api.get(`/api/public/photos?page=${page}`).then((response) => {
            setPhotos(response.data.data.data)

            setPagination(() => ({
                currentPage : response.data.data.current_page,
                perPage : response.data.data.per_page,
                total : response.data.data.total
            }))

            setLoadingPhoto(false)
        })
    }

    useEffect(() => {
        fetchDataPhotos()
    }, [])
      
    return (
        <LayoutWeb>
          <div className="container mt-4 mb-3">
            <div classname="row">
              <div className="col-md-12">
                <h5 className="text-uppercase">
                  <i className="fa fa-images"></i> GALERI FOTO
                </h5>
                <hr />
              </div>
            </div>
            <div className="row mt-4">
              {loadingPhoto ? (
                <Loading />
              ) : photos.length > 0 ? (
                photos.map((photo) => (
                  <CardPhoto
                    key={photo.id}
                    image={photo.image}
                    caption={photo.caption}
                  />
                ))
              ) : (
                <AlertDataEmpty />
              )}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              perPage={pagination.perPage}
              total={pagination.total}
              onChange={(pageNumber) => fetchDataPhotos(pageNumber)}
              position="center"
            />
          </div>
        </LayoutWeb>
      )
}
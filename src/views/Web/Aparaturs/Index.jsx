import React, { useState, useEffect } from "react"

//import layout web
import LayoutWeb from "../../../layouts/Web"

//import service api
import Api from "../../../services/Api"

//import component alert
import AlertDataEmpty from "../../../components/general/AlertDataEmpty"

//import component loading
import Loading from "../../../components/general/Loading"

//import component card aparatur
import CardAparatur from "../../../components/general/CardAparaturs"

export default function Aparaturs () {
    const [aparaturs, setAparaturs] = useState([])
    const [loadingAparaturs, setLoadingAparaturs] = useState(true)

    const fetchDataAparaturs = async () => {
        setLoadingAparaturs(true)

        await Api.get('/api/public/aparaturs').then((response) => {
            setAparaturs(response.data.data)

            setLoadingAparaturs(false)
        })
    }

    useEffect(() => {
        fetchDataAparaturs()
    }, [])


    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i className="fa fa-user-circle"></i> Aparatur Desa
                        </h5>
                        <hr />
                    </div>
                </div>
                <div className="row mt-4">
                {
                        loadingAparaturs ? (
                            <Loading />
                        ) : aparaturs.length > 0 ? (
                            aparaturs.map((aparatur) => (
                                <CardAparatur
                                    key={aparatur.id}
                                    name={aparatur.name}
                                    image={aparatur.image}
                                    role={aparatur.role}
                                />
                            ))
                        ) : (
                            <AlertDataEmpty/>
                        )
                    }
                </div>
            </div>
        </LayoutWeb>
    )
}
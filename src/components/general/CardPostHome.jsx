import React from "react"

import { Link } from "react-router-dom"

import dateID from "../../utils/DateID"

export default function CardPostHome(props) {
    return (
        <div className="col-md-6 mb-3" key={props.key}>
            <Link to={`/post/${props.slug}`} className="text-decoration-none">
                <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
                    <div className="row g-0 mb-0 pb-0">
                        <div className="col-md-4">
                            <img
                                src={props.image}
                                class="img-fluid rounded h-100 w-100"
                                style={{ objectFit: "cover" }}
                                alt={props.title}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">
                                {props.title.length > 50
                                ? `${props.title.substring(0, 50)}...`
                                : props.title}
                                </h5>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div className="start-0">
                                        <i className="fa fa-user"></i> {props.user}
                                    </div>
                                    <div className="end-0">
                                        <i className="fa fa-calendar"></i> {" "} {dateID(new Date(props.date))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
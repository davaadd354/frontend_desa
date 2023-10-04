import React from "react"

import moneyFormat from "../../utils/MoneyFormat"

import { Link } from "react-router-dom"

export default function CardProduct(props) {
    return (
        <div className="col-md-4 mb-3" key={props.key}>
            <Link to={`/products/${props.slug}`} className="text-decoration-none">
                <div className="card mb-3 w100 rounded-3 border-0 shadow-sm">
                    <img src={props.image} class="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.title.length > 50 
                                ? `${props.title.substring(0, 50)}...`
                                : props.title
                            }
                        </h5>
                        <p className="card-text mt-3">{moneyFormat(props.price)}</p>
                        <hr />
                        <a
                            href={`https://api.whatsapp.com/send?phone=${props.phone}&text=Halo%20kak%2C%20saya%20ingin%20pesan%20%3A%20${props.title}`}
                            className="btn btn-primary w-100"
                            target="_blank"
                        >
                            <i className="fa-brands fa-whatsapp"></i> Beli Sekarang
                        </a>
                    </div>
                </div>
            </Link>
        </div>
    )
}
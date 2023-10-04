//import css
import "../assets/admin/css/styles.css"
import "../assets/web/css/custom.css"

//import js
import "../assets/admin/js/bootstrap.bundle.min.js"

import Navbar from "../components/web/Navbar"

import Footer from "../components/web/Footer"

export default function LayoutWeb({children}){
    return (
        <>
            <Navbar/>

            {children}

            <Footer/>
        </>
    )
}
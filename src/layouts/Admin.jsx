import '../assets/admin/css/styles.css'
import '../assets/admin/css/custom.css'
import '../assets/admin/js/bootstrap.bundle.min.js'

// import Sidebar from '../components/admin/Sidebar'

import Navbar from '../components/admin/Navbar'

import Sidebar from '../components/admin/Sidebar'

export default function admin({children}){
    return (
        <>
            <Navbar/>
            <div id="layoutSidenav" className='mt-5'>
                <div id="layoutSidenav_nav">
                    <Sidebar/>
                </div>

                <div id="layoutSidenav_content">
                    {children}

                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-end small">
                                <div className="text-muted">Copyright &copy; Desa Digital.</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
import { Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import Login from "../views/Auth/Login"
import Forbidden from "../views/Auth/Forbiddeon"
import Dashboard from "../views/Admin/Dashboard"
import PermissionsIndex from "../views/Admin/Permissions"
import RolesIndex from "../views/Admin/Roles/Index"
import RolesCreate from "../views/Admin/Roles/Create"
import RolesEdit from "../views/Admin/Roles/Edit"
import UsersIndex from "../views/Admin/Users/Index"
import UsersCreate from "../views/Admin/Users/Create"
import UsersEdit from "../views/Admin/Users/Edit"
import CategoriesIndex from "../views/Admin/Categories/Index"
import CategoriesCreate from "../views/Admin/Categories/Create"
import CategoriesEdit from "../views/Admin/Categories/Edit"
import PostIndex from "../views/Admin/Post/Index"
import PostCreate from "../views/Admin/Post/Create"
import PostEdit from "../views/Admin/Post/Edit"
import PagesIndex from "../views/Admin/Pages/Index"
import PagesCreate from "../views/Admin/Pages/Create"
import PagesUpdate from "../views/Admin/Pages/Update"
import ProductsIndex from "../views/Admin/Products/Index"
import ProductsCreate from "../views/Admin/Products/Create"
import ProductsEdit from "../views/Admin/Products/Edit"
import PhotosIndex from "../views/Admin/Photos/Index"
import SlidersIndex from "../views/Admin/Sliders/Index"
import AparatursIndex from "../views/Admin/Aparaturs/Index"
import AparatursCreate from "../views/Admin/Aparaturs/Create"
import AparatursEdit from "../views/Admin/Aparaturs/Edit"

export default function RouteIndex() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/forbidden" element={<Forbidden/>}/>
            <Route path="/admin/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
            <Route path="/admin/permissions" element={<PrivateRoutes permissions={['permissions.index']}><PermissionsIndex/></PrivateRoutes>}/>
            <Route path="/admin/roles" element={<PrivateRoutes permissions={['roles.index']}><RolesIndex/></PrivateRoutes>}/>
            <Route path="/admin/roles/create" element={<PrivateRoutes permissions={['roles.create']}><RolesCreate/></PrivateRoutes>}/>
            <Route path="/admin/roles/edit/:id" element={<PrivateRoutes permissions={['roles.edit']}><RolesEdit/></PrivateRoutes>}/>
            <Route path="/admin/users" element={<PrivateRoutes permissions={['users.index']}><UsersIndex/></PrivateRoutes>}/>
            <Route path="/admin/users/create" element={<PrivateRoutes permissions={['users.create']}><UsersCreate/></PrivateRoutes>}/>
            <Route path="/admin/users/edit/:id" element={<PrivateRoutes permissions={['users.edit']}><UsersEdit/></PrivateRoutes>}/>
            <Route path="/admin/categories" element={<PrivateRoutes permissions={['categories.index']}><CategoriesIndex/></PrivateRoutes>}/>
            <Route path="/admin/categories/create" element={<PrivateRoutes permissions={['categories.create']}><CategoriesCreate/></PrivateRoutes>}/>
            <Route path="/admin/categories/edit/:id" element={<PrivateRoutes permissions={['categories.edit']}><CategoriesEdit/></PrivateRoutes>}/>
            <Route path="/admin/posts" element={<PrivateRoutes permissions={['posts.index']}><PostIndex/></PrivateRoutes>}/>
            <Route path="/admin/posts/create" element={<PrivateRoutes permissions={['posts.create']}><PostCreate/></PrivateRoutes>}/>
            <Route path="/admin/posts/edit/:id" element={<PrivateRoutes permissions={['posts.edit']}><PostEdit/></PrivateRoutes>}/>
            <Route path="/admin/pages" element={<PrivateRoutes permissions={['pages.index']}><PagesIndex/></PrivateRoutes>}/>
            <Route path="/admin/pages/create" element={<PrivateRoutes permissions={['pages.create']}><PagesCreate/></PrivateRoutes>}/>
            <Route path="/admin/pages/edit/:id" element={<PrivateRoutes permissions={['pages.edit']}><PagesUpdate/></PrivateRoutes>}/>
            <Route path="/admin/products" element={<PrivateRoutes permissions={['products.index']}><ProductsIndex/></PrivateRoutes>}/>
            <Route path="/admin/products/create" element={<PrivateRoutes permissions={['products.create']}><ProductsCreate/></PrivateRoutes>}/>
            <Route path="/admin/products/edit/:id" element={<PrivateRoutes permissions={['products.edit']}><ProductsEdit/></PrivateRoutes>}/>
            <Route path="/admin/photos" element={<PrivateRoutes permissions={['photos.index']}><PhotosIndex/></PrivateRoutes>}/>
            <Route path="/admin/sliders" element={<PrivateRoutes permissions={['sliders.index']}><SlidersIndex/></PrivateRoutes>}/>
            <Route path="/admin/aparaturs" element={<PrivateRoutes permissions={['aparaturs.index']}><AparatursIndex/></PrivateRoutes>}/>
            <Route path="/admin/aparaturs/create" element={<PrivateRoutes permissions={['aparaturs.create']}><AparatursCreate/></PrivateRoutes>}/>
            <Route path="/admin/aparaturs/edit/:id" element={<PrivateRoutes permissions={['aparaturs.edit']}><AparatursEdit/></PrivateRoutes>}/>
        </Routes>
    )
}
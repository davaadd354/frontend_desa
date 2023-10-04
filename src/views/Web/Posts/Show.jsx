import React, { useState, useEffect } from "react"

//import layout web
import LayoutWeb from "../../../layouts/Web"

//import service api
import Api from "../../../services/Api"

//import useParams
import { useParams, Link } from "react-router-dom"

//import component loading
import Loading from "../../../components/general/Loading"

import dateID from "../../../utils/DateID"

export default function WebPostShow () {
    //init state
    const [post, setPost] = useState({})
    const [loadingPost, setLoadingPost] = useState(true)

    const [posts, setPosts] = useState([])
    const [loadingPosts, setLoadingPosts] = useState(true)

    //destruct id
    const { slug } = useParams()

    //fetch data Post
    const fetchDetailDataPost = async () => {
        //setLoadingPosts "true"
        setLoadingPost(true)

        //fetch data
        await Api.get(`/api/public/posts/${slug}`).then((response) => {
        //assign response to state "Post"
        setPost(response.data.data)

        //title Post
        document.title = `${response.data.data.title} - Desa Santri`

        //setLoadingPosts "false"
        setLoadingPost(false)
        })
    }

     //fetch data Post
     const fetchAllPosts = async () => {
        //setLoadingPosts "true"
        setLoadingPosts(true)

        //fetch data
        await Api.get(`/api/public/posts_home`).then((response) => {
        //assign response to state "Posts"
        setPosts(response.data.data)

        //title Posts
        document.title = `${response.data.data.title} - Desa Santri`

        //setLoadingPosts "false"
        setLoadingPosts(false)
        })
    }

    //hook useEffect
    useEffect(() => {
        //call method "fetchDataPost"
        fetchDetailDataPost()

        fetchAllPosts()
    }, [slug])

    return (
        <LayoutWeb>
          <div className="container mt-4 mb-3">
            <div className="row">
              <div className="col-md-8 mb-4">
                {loadingPost ? (
                  <Loading />
                ) : (
                  <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body post-content">
                      <h4 className="text-normal"> {post.title}</h4>
                      <div className="author mt-3">
                        <span>
                          <i className="fa fa-user"></i> {post.user.name}
                        </span>
                        <span>
                          <i className="fa fa-folder ms-4 ml-4"></i>{" "}
                          {post.category.name}
                        </span>
                        <span>
                          <i className="fa fa-calendar ms-4 ml-4"></i>{" "}
                          {dateID(new Date(post.created_at))}
                        </span>
                      </div>
                      <hr />
                      <img
                        src={post.image}
                        class="rounded-3 w-100 mb-3"
                        alt={post.title}
                      />
                      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <h5 className="text-uppercase">
                  <i className="fa fa-book"></i> BERITA TERBARU
                </h5>
                <hr />
                {loadingPost ? (
                  <Loading />
                ) : (
                  posts.map((post) => (
                    <Link
                      to={`/posts/${post.slug}`}
                      className="text-decoration-none"
                    >
                      <div class="card mb-3 w-100 rounded-3 border-0 shadow-sm">
                        <div class="row g-0 mb-0 pb-0">
                          <div class="col-md-5">
                            <img
                              src={post.image}
                              class="img-fluid h-100 w-100 object-fit-cover rounded-start"
                              alt={post.title}
                            />
                          </div>
                          <div class="col-md-7">
                            <div class="card-body">
                              <span class="card-title">
                                {post.title.length > 30
                                  ? `${post.title.substring(0, 30)}...`
                                  : post.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </LayoutWeb>
      );
}
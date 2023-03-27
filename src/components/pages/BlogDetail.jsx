import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";
import { getBlogDetails } from "../../services/api/blogsApi";
import PageNotFound from "./PageNotFound";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});

  const params = useParams();

  useEffect(() => {
    const getBlogDetail = async () => {
      setBlog(await getBlogDetails(params.blogId));
    };
    getBlogDetail();
  }, [params.blogId]);

  const blogDetails = (
    <div className="main-container">
      <section>
        <div className="blog-detail">
          <div className="blog">
            <img className="blog-picture" src={blog?.image} alt={blog?.title} />
            <div className="main-content">
              <h2 className="title">Title : {blog?.title}</h2>
              <h2 className="author">Author : {blog?.author}</h2>
              <h3 className="category">Category : {blog?.category}</h3>
            </div>
          </div>
          <p className="description">{blog?.description}</p>
        </div>
      </section>
    </div>
  );

  return <>{ blog ? blogDetails : <PageNotFound /> }</>;
};

export default BlogDetail;

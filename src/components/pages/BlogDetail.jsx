import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";
import { getBlogDetails } from "../../services/api/blogsApi";
import PageNotFound from "./PageNotFound";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getBlogDetail = async () => {
      const blog = await getBlogDetails(params.blogId)
      setBlog(blog);
    };
    getBlogDetail();
  }, [params.blogId]);

  const blogDetails = (
    <div className="main-container">
      <section className="blog-detail">
        <div className="blog">
          <img
            className="blog-picture"
            src={blog?.image}
            alt={blog?.title}
            height="300px"
            width="600px"
          />
          <div className="main-content">
            <h2 className="title">Title : {blog?.title}</h2>
            <h2 className="author">Author : {blog?.author}</h2>
            <h5 className="category">Category : {blog?.category}</h5>
          </div>
        </div>
        <p className="description">{blog?.description}</p>
      </section>
    </div>
  );

  return <>{blog ? blogDetails : <PageNotFound />}</>;
};

export default BlogDetail;

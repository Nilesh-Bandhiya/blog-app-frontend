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
      setBlog(await getBlogDetails(params.blogId));
    };
    getBlogDetail();
  }, [params.blogId]);

  const blogDetails = (
    <>
      <div className="blog-detail">
        <div className="blog-header">
          <div className="blog-image-container">
            <img className="blog-image" src={blog?.image} alt={blog?.title} />
          </div>
          <div className="blog-info">
            <h1 className="blog-title">{blog?.title}</h1>
            <h4 className="author-name">{blog?.author}</h4>
            <span className="category">{blog?.category}</span>
          </div>
        </div>
        <p className="blog-description">{blog?.description}</p>
      </div>
      <div className="space-div"></div>
    </>
  );

  return <>{blog ? blogDetails : <PageNotFound />}</>;
};

export default BlogDetail;

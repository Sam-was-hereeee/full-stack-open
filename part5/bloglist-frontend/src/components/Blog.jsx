import {useState} from "react";
import blogStyles from "../styling/blog.module.css"
import "../styling/global.css"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className={blogStyles.blog}>
            <strong>{blog.title}</strong> {`by ${blog.author}`}
            <button onClick={()=>{setVisible(!visible)}}>{visible?"hide":"show"}</button>
            <div className={visible?"":"hide"}>
                <p>
                    url: {blog.url} <br/>
                    likes: {blog.likes}<br/>
                    creator: {blog.user.name}
                </p>
            </div>
        </div>
    )}

export default Blog
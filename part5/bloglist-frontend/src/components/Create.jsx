import { useState } from "react";
import blogService from "../services/blogs";

const Create = ( {token, tempTopMsg, toggle} ) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const newBlog = async (e)=> {
        e.preventDefault()
        const data = {
            title, author, url, token
        }
        try {
            await blogService.create(data)
            tempTopMsg({msg: `created ${data.title} by ${data.author}`, mode: "normal"})
        } catch {
            tempTopMsg({msg: "failed to create blog", mode: "error"})
        }

        setTitle("")
        setAuthor("")
        setUrl("")
        toggle.handleToggle()
    }
    return (
        <>
            <h3>Create new</h3>
            <form onSubmit={newBlog}>
                <div>
                    Title
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    Author
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div>
                    URL
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
                </div>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default Create;
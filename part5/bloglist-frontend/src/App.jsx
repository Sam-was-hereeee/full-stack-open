import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import TopMessage from "./components/TopMessage.jsx";
import Toggleable from "./components/Toggleable.jsx";
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
    const defaultMsg = "Welcome to the phonebook";
    const [topMsg, setTopMsg] = useState({msg:defaultMsg, mode:'normal'});

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loginData')){
      setUser(JSON.parse(localStorage.getItem('loginData')))
    }
  }, [])

    useEffect(() => {
        if (user) {
            temporaryTopMsg({msg: `logged in as ${user.username}`, mode: "normal"})
        } else {
            temporaryTopMsg({msg: `logged out`, mode: "normal"})
        }
    }, [user])

  const logout = ()=>{
    localStorage.removeItem('loginData')
    setUser(null)
  }

  const temporaryTopMsg = (msg)=>{
      setTopMsg(msg)
      setTimeout(()=>{setTopMsg({msg: defaultMsg, mode: "normal"})},2000)
  }

  const createRef = useRef()

  if (user) {
    return (
        <>
            <h2>Blogs</h2>
            <TopMessage msg={topMsg.msg} mode={topMsg.mode}></TopMessage>
            <div>Logged in as {user.username}</div>
            <button onClick={logout}>logout</button>
            <Blogs blogs={blogs}></Blogs>
            <Toggleable showText="Create blog" ref={createRef}>
                <Create token={user.token} tempTopMsg={temporaryTopMsg} toggle={createRef.current}></Create>
            </Toggleable>
        </>
    )
  }
  return (
      <>
        <h2>Blogs</h2>
          <TopMessage msg={topMsg.msg} mode={topMsg.mode}></TopMessage>
        <Login setUser={setUser} tempTopMsg={temporaryTopMsg}></Login>
      </>
  )

}

const Blogs = ( {blogs} )=> {
  return (
      <>
        <div>
          <table>
            <thead>
            <tr>
              <th>
                Blogs
              </th>
              <th>Author</th>
            </tr>
            </thead>
            <tbody>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
            </tbody>
          </table>
        </div>
      </>
  )
}

export default App
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const logout = ()=>{
    localStorage.removeItem('loginData')
    setUser(null)
  }

  console.log('loading app')
  console.log(user)
  if (user) {
    return (
        <>
          <h2>Blogs</h2>
          <div>Logged in as {user.username}</div>
          <button onClick={logout}>logout</button>
          <Blogs blogs={blogs}></Blogs>
          <Create token={user.token}></Create>
        </>

    )
  }
  return (
      <>
        <h2>Blogs</h2>
        <Login setUser={setUser}></Login>
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
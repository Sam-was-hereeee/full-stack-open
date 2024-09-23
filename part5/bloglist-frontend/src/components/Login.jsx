import {useState} from "react";
import loginService from '../services/loginService.js'

const Login = ( {setUser, tempTopMsg} ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        let responseData = null
        try{
            responseData = await loginService.login({username, password});
            console.log(responseData)
        } catch {
            tempTopMsg({msg: "login failed", mode: "error"})
            return
        }
        setUser(responseData)
        window.localStorage.setItem('loginData', JSON.stringify(responseData))
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login
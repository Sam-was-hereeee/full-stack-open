import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1;

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
const refresh = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <App counter={counter}></App>
    )
}

setInterval(()=>{counter++;refresh();},1000);
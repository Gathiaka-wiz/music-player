import Player from "./components/Player";
import './css/App.css';
import { logo}from './assets/icons/icons'

function App() {
  return (
    <div className="app">
      <div id="background" ></div>
      <img src={logo} name="logo"/>
      <Player />
    </div>
  )
}

export default App

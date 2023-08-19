import './App.css'
import Game from './components/Game'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <div className='title'>Memory Card Game</div>
      <h3>Do not click on the same card twice!</h3>
      <Game />
      <Footer />
    </div>
  )
}

export default App

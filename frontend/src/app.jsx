import './app.css'
import { render } from 'preact';
import Navbar from './components/navbar'

export function App() {

  return (
    <>
      <Navbar />
    </>
  )
}

render(<App />, document.getElementById('app'));

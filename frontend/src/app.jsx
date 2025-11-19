import './app.css'
import { render } from 'preact';
import Router from 'preact-router';
import Navbar from './components/navbar'
import Query_Page from './pages/query_page';

export function App() {

  return (
    <>
        <Navbar />

        <Router>
          <Query_Page path="/" />
        </Router>

      

    </>
  )
}

render(<App />, document.getElementById('app'));

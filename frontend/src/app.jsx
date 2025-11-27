import './app.css'
import { render } from 'preact';
import Router from 'preact-router';
import Navbar from './components/navbar'
import Query_Page from './pages/query_page';
import Review_Page from './pages/review_page';
export function App() {

  return (
    <>
        <Navbar />

        <Router>
          <Query_Page path="/" />
          <Review_Page path="/review" />
        </Router>

      

    </>
  )
}

render(<App />, document.getElementById('app'));

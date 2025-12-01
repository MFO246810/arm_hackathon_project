import './app.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/navbar'
import Query_Page from './pages/query_page';
import Review_Page from './pages/review_page';
export function App() {

  return (
    <>
        <Navbar />

          <Routes>
            <Route path="/" element={<Query_Page/>}/>
            <Route path="/review" element={<Review_Page/>} />
          </Routes>
    </>
  )
}

export default App

import "./navbar.css"
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-item">
                    </div>
                    <div className="navbar-item">
                        <div className="navbar-item-center">
                            <h2 className="navbar-item-center-title"> LLM Tester</h2>
                        </div>
                    </div>
                    <div className="navbar-item">
                        <div className="navbar-item-right">
                            <div className="navbar-item-right-link-container">
                                <Link to="/" className="navbar-item-right-link">Query</Link>
                                <Link to="/review" className="navbar-item-right-link">Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </nav>
        </>
    )
}
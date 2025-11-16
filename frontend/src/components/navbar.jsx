import "./navbar.css"
import { h } from 'preact';
import { Link } from 'preact-router/match';

export default function Navbar(){
    return(
        <>
            <nav class="navbar">
                <div class="navbar-container">
                    <div class="navbar-item">
                    </div>
                    <div class="navbar-item">
                        <div class="navbar-item-center">
                            <h2 class="navbar-item-center-title"> LLM Tester</h2>
                        </div>
                    </div>
                    <div class="navbar-item">
                        <div class="navbar-item-right">
                            <div class="navbar-item-right-link-container">
                                <Link activeClassName="active" href="/" class="navbar-item-right-link">Query</Link>
                                <Link activeClassName="active" href="/review" class="navbar-item-right-link">Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </nav>
        </>
    )
}
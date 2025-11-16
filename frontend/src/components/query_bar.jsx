import "./query_bar.css"
import { h } from 'preact';

export default function Query_bar(){
    return(
        <>
            <div>
                <label for="query_bar" class="query-bar-label">Enter your query: </label>
                <textarea id="query_bar" rows="3" cols="90" class="query-bar"></textarea>
            </div>
        </>
    )
}
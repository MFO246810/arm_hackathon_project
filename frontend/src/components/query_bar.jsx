import "./query_bar.css"
import { h } from 'preact';

export default function Query_bar(){
    return(
        <>
            <div>
                <textarea id="query_bar" rows="2" cols="90" class="query-bar" placeholder="Enter Your Query for the Model"></textarea>
            </div>
        </>
    )
}
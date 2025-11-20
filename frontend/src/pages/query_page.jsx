import { useState } from 'preact/hooks';
import Query_form from "../components/query_form"
import Display_response from "../components/display_response"
export default function Query_Page(){

    const [Response, setResponse] = useState("")

    return (
        <>
            <div class="Query_Page">
                <Display_response prop={Response}/>
                <Query_form Handle_value={setResponse}/>
            </div>
            
        </>
    )
}
import { useState } from 'preact/hooks';
import Query_form from "../components/query_form"
import "./query_page.css"
import Display_response from "../components/display_response"
export default function Query_Page(){

    const [Response, setResponse] = useState(null)
    const [loading, setloading] = useState(false)

    return (
        <>
            <div class="Query_Page">
                <div className="Response_Handler">
                    {loading ? (
                        <div className="loader"></div>
                            ) : (<Display_response prop={Response} /> )}
                </div>
                <Query_form Handle_value={setResponse} Handle_Loading={setloading}/>
            </div>
            
        </>
    )
}
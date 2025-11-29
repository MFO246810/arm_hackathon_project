import { useState } from 'react';
import Query_form from "../components/query_form"
import "./query_page.css"
import Display_response from "../components/display_response"

export default function Query_Page(){

    const [Responses, setResponses] = useState([{
        model_query: "",
        model_used: "",
        model_response: ""
    }])
    const [loading, setloading] = useState(false)

    return (
        <>
            <div class="Query_Page">
                <div className="Response_Handler">
                    <div className="_Container">
                        {loading ? (
                            <div className="loader"></div>
                                ) : (
                                    <>
                                        {Responses.map((res, idx) => (<Display_response key={idx} prop={res} />))}
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className='Query_form'>
                    <Query_form Handle_value={setResponses} Handle_Loading={setloading}/>
                </div>
            </div>
            
        </>
    )
}
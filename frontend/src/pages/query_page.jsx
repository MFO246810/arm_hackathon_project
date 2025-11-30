import { useState, useEffect} from 'react';
import Query_form from "../components/query_form"
import "./query_page.css"
import Display_response from "../components/display_response"
import { Load_With_Expiry } from '../utils/local_storage';

export default function Query_Page(){

    const [Responses, setResponses] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);
    
    useEffect(() => {
        let existing_responses = Load_With_Expiry("Model_Responses") || [];
        setResponses(existing_responses)
        window.location.reload();
    }, [])

    return (
        <>
            <div class="Query_Page">
                <div className="Response_Handler">
                    <div className="_Container">
                        {loading ? (
                            <div className="loader"></div>
                                ) : (
                                    <>
                                        {Responses.length > 0 ? (<>{Responses.map((res, idx) => (<Display_response key={idx} prop={res} />))}</>):<></>}
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className='Query_form'>
                    <Query_form Handle_Loading={setloading}/>
                </div>
            </div>
            
        </>
    )
}
import { useState } from 'preact/hooks';
import ReactMarkdown from "react-markdown";
import "./display_response.css"

export default function Display_response({prop}){

    return (
        <>
            <div class="Response_Container">
                <div class="Response_Title">
                    <h3> Model Used: {prop.model_used}</h3>
                    <p> <strong> User Query: </strong> {prop.model_query}</p>
                    <div class="Response_Body">
                        <ReactMarkdown> 
                            {prop.model_response}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    )
}
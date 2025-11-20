import { useState } from 'preact/hooks';
import "./display_response.css"

export default function Display_response({prop}){

    return (
        <>
            <div class="Response_Container">
                <div class="Response_Title">
                    <h3> Response Title </h3>
                    <div class="Response_Body">
                        <p> {prop}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
import "./query_page.css"
import { useState } from 'preact/hooks';
import Query_bar from "../components/Query_bar"
import Select_Model from "../components/select_model"

export default function Query_Page(){

    return(
        <> 
            <div>
                <form>
                    <Select_Model/>
                    <div class="query-container">
                        <Query_bar/>
                        <button>
                            Submit
                        </button>
                    </div>
                    
                </form>
                
            </div>
        </>
    )
}
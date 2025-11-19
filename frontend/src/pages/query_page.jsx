import "./query_page.css"
import { useState } from 'preact/hooks';
import Query_bar from "../components/query_bar"
import Select_Model from "../components/select_model"

export default function Query_Page(){
    const [model, setModel] = useState("phi3:mini"); 
    const [query, setQuery] = useState("");

    const Handle_Submit = async(e) => {
        e.preventDefault();
        console.log("Form data:", { model, query });
        try{
            const response = await fetch("http://127.0.0.1:5000/api/call", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ model: model, query: query})})

            if(response.ok){
                const data = await response.json()
                console.log(data)
            } else{
                throw new Error("An error has occured")
            }
        } catch(err){
            console.log(err)
        }
    
    }

    return(
        <>  
            <div class="query-form-container">
                <form class="query-form" onSubmit={Handle_Submit}> 
                    <Select_Model
                        value={model}
                        onChange={setModel}
                    />
                    <div class="query-bar-container">
                        <Query_bar
                            value={query}
                            onChange={setQuery}
                        />
                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>  
        </>
    )
}
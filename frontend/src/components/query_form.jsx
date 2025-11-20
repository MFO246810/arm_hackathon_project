import "./query_form.css"
import { useState } from 'preact/hooks';
import Query_bar from "./query_bar"
import Select_Model from "./select_model"

export default function Query_form({Handle_value}){
    const [model, setModel] = useState("phi3:mini"); 
    const [query, setQuery] = useState("");

    const Handle_Submit = async(e) => {
        e.preventDefault();
        console.log("Form data:", { model, query });
        
        try{
            const response = await fetch("/api/call", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ model: model, query: query})})

            const data = await response.json()
            Handle_value(data)
            if(data.Message == "Sucess"){
                
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
import "./query_form.css"
import { useState } from 'preact/hooks';
import Query_bar from "./query_bar"
import Select_Model from "./select_model"

export default function Query_form({Handle_value, Handle_Loading}){
    const [model, setModel] = useState("phi3:mini"); 
    const [query, setQuery] = useState("");

    const Handle_Submit = async(e) => {
        e.preventDefault();
        console.log("Form data:", { model, query });
        Handle_Loading(true)
        try{
            const response = await fetch("/api/call", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ model: model, query: query})})
            
            if (!response.ok) {
                console.error("Server error:", response.statusText);
                Handle_Loading(false)
                return;
            }

            Handle_value(prev => [
                ...prev,
                {
                    model_query: query,
                    model_used: model,
                    model_response: ""
                }
            ]);
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let result = "";

            while (true) {
                const { value, done } = await reader.read();

                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                result += chunk;
                Handle_value(prev => {
                    const lastIndex = prev.length - 1;

                    return prev.map((entry, i) =>
                        i === lastIndex
                            ? {...entry, model_response: entry.model_response + chunk}: entry);}
                );
            }

        } catch(err){
            console.log(err)
        }
        Handle_Loading(false)
    
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
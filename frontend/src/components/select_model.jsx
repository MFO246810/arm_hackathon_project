 import "./select_model.css"
 import { h } from 'preact';
 import { useState, useEffect } from 'preact/hooks';
 
 export default function Select_Model(){
    const [models, setmodels] = useState([]);
    const [loading, setloading] = useState(true)

    const GetModels = async () => {
        try{
            const response = await fetch("http://127.0.0.1:5000/api/list", {
                method: "GET",
            })
        
            const model_data = await response.json()
            if(model_data.Message == "Sucess"){
                setmodels(model_data.Response)
                console.log(model_data.Message)
            } else{
                throw new Error("Model retrieval failed")
            }

        } catch (e){
            console.log(e)
        } finally{
            setloading(false)
        }
        
    }

    useEffect(() => {
        GetModels()
    }, []);

    if (loading){
        <p> Model loading ....</p>
    }
    
    return(
        <>
            <div class="model-select-wrapper">
                    <select class="Models-Select" name="Models">
                        <option value=""> Select an LLM model </option>
                        {
                            models.map(item => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>   
            </div>
        </>
    )
 }
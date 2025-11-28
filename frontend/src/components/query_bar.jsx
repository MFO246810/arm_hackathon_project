import "./query_bar.css"

export default function Query_bar({ value, onChange }){

    const Handle_Input = (e) => {
        onChange(e.target.value); 
    };

    return(
        <>
            <div>
                <textarea id="query_bar" rows="2" cols="90" class="query-bar" placeholder="Enter Your Query for the Model"
                    value={value}
                    onInput={Handle_Input}
                ></textarea>
            </div>
        </>
    )
}
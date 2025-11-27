import { useEffect, useState } from "react";
import "./review_page.css"

export default function Review_Page(){

    const [DB_Data, setDB_Data] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetch_DB_Data = async() => {
        try{
            const response = await fetch("/api/model_data", {
                method: "GET",
            })

            if(!response.ok){
                setLoading(false)
                throw new Error("Server error:", response)
            }

            const data = await response.json()
            setDB_Data(data.Response)

        } catch(e){
            console.log("Error", e)
            setDB_Data(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch_DB_Data()
    }, [])
 
    return(
        <>
            <div class="Review_page">
                {loading ? (
                    <>
                        <div class="loader_container"> 
                            <div class="loader"></div>
                        </div>
                    </>
                ):(
                    <>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Model Name</th>
                                        <th>Original Query</th>
                                        <th>Query Time</th>
                                        <th> Response Time </th>
                                        <th> Time Till First Token</th>
                                        <th> Total Time Spent processing</th>
                                        <th> CPU Usage</th>
                                        <th> CPU Peak</th>
                                        <th> RAM Usage</th>
                                        <th> Disk Read</th>
                                        <th> Disk Write </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DB_Data.map((Data, idx) => (
                                            <tr>
                                                <td> {Data.Model_Name} </td>
                                                <td> {Data.User_Query} </td>
                                                <td> {Data.Query_Time} </td>
                                                <td> {Data.Response_Time} </td>
                                                <td> {Data.TTFT} </td>
                                                <td> {Data.Total_Time} </td>
                                                <td> {Data.CPU_Usage} </td>
                                                <td> {Data.CPU_Peak} </td>
                                                <td> {Data.RAM_Usage} </td>
                                                <td> {Data.Disk_Read} </td>
                                                <td> {Data.Disk_Write} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
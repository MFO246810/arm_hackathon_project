import { useState, useEffect } from 'react';
import CPUBarChart from '../components/Bar-charts/cpu-usage-charts';
import RAMBarChart from '../components/Bar-charts/ram-bar-chart';
import CPU_Peak_Bar_Chart from '../components/Bar-charts/cpu-peak-chart';
import Time_Processing_Chart from '../components/Bar-charts/Time_processing-chart';
import "./review_page.css"
import { fakeData } from '../Data/fakedata';

export default function Review_Page(){

    const [DB_Data, setDB_Data] = useState([]);
    const [loading, setLoading] = useState(true)
    const [Graph_Data, set_Graph_Data] = useState([])

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
            setDB_Data(data.DB_Data)
            set_Graph_Data(data.Average_Data)

        } catch(e){
            console.log("Error", e)
            setDB_Data(null)
            set_Graph_Data(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        //fetch_DB_Data()
        setDB_Data(fakeData);
        set_Graph_Data(fakeData)
        setLoading(false)
    }, []);
 
    return(
        <>
            <div className="Review_page">
                {loading ? (
                    <>
                        <div className="loader_container"> 
                            <div className="loader"></div>
                        </div>
                    </>
                ):(
                    <>
                        <div className="graph-container">
                            <div className="graph-grid">
                                <CPUBarChart data={Graph_Data}/>
                                <CPU_Peak_Bar_Chart data={Graph_Data}/>
                                <RAMBarChart data={Graph_Data}/>
                                <Time_Processing_Chart data={Graph_Data}/>
                            </div>
                        </div>
                        <div className="table-container">
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
                        </div>
                        
                    </>
                )}
            </div>
        </>
    )
}
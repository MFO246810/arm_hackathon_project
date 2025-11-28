import { useState, useEffect } from 'react';
import CPUBarChart from '../components/Bar-charts/cpu-bar-charts';
import RAMBarChart from '../components/Bar-charts/ram-bar-chart';
import { fakeData } from '../Data/fakedata';
import "./review_page.css"

export default function Review_Page(){

    const [DB_Data, setDB_Data] = useState([]);
    const [loading, setLoading] = useState(true)
    const [labels, setlabels] = useState([])
    const [values, setvalues] =  useState([])
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

    const groupBy = (arr, key) => {
        return arr.reduce((acc, item) => {
            const groupKey = item[key];
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(item);
            return acc;
        }, {});
    };

    useEffect(() => {
        fetch_DB_Data()
        //setDB_Data(fakeData);
    }, []);

    useEffect(() => {
        
        if (DB_Data.length === 0) return;

        const models = groupBy(DB_Data, "Model_Name")

        const label = Object.keys(models);
        //setlabels(Object.keys(models));

        const value = label.map(model => {
            const items = models[model];
            const avg = items.reduce((sum, record) => sum + record.CPU_Usage, 0) / items.length;
            return avg;
        });

        //setvalues(value)

        setLoading(false);
        console.log("Chart Data:", DB_Data);
    }, [DB_Data])
 
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
                            <CPUBarChart
                                data={DB_Data}
                            />
                            <RAMBarChart 
                                data={DB_Data}
                            />

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
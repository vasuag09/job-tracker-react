import { json } from "react-router-dom";
import ViewJob from "../components/ViewJob";
export default function ViewPage(){
    return (
        <ViewJob />
    )
}

export async function loader({request, params}){
    const userId = Number(params.userId)
    const response = await fetch(`http://localhost:3000/api/jobs/${userId}`)
    if (!response.ok){
        throw json({message:"Error fetching jobs"}, {status: 401})
    }
    const resData = await response.json()
    localStorage.setItem("jobs", JSON.stringify(resData.jobs))
    return resData.jobs
}
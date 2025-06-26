import SignupForm from "../components/SignupForm";
import { redirect, json } from "react-router-dom"
export default function SignupPage(){
    return (
        <SignupForm />
    )
}

export async function action({request}){
    const data = await request.formData()
    const enteredData = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password")
    }
    console.log(data)
    const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(enteredData)
    })

    if (!response.ok){
        throw json({message: "Signup Failed"}, {status: 401}) 
    }
    const resData = await response.json()
    localStorage.setItem("user",JSON.stringify(resData.user))
    return redirect(`/${resData.user.id}/dashboard`);
}
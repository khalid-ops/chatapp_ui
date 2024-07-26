import { Button } from "@/lib/ui/button";
import axios from "axios";

export default function HomePage(){

    const callApi = async () => {
        const response = await axios.get('http://localhost:3001/users',{
            withCredentials: true,
        }
        )

        console.log(response.data)
    }
    return (
        <><h1>this is home!!</h1><Button onClick={callApi}></Button></>
    )
}
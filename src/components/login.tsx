
import { Label } from "../lib/ui/label.tsx";
import { Input } from "../lib/ui/input.tsx";
import { Button } from "../lib/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom"
import { SVGProps } from "react"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useForm } from "react-hook-form";

interface User {
    googleId: string | null;
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    password: string | null,
    loggedIn: boolean | null
}

interface infoResponse{
    id: string,
    email: string,
    verified_email: boolean,
    name: string,
    given_name: string,
    family_name: string,
    picture: string
}


export default function Login() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}, } = useForm({
    defaultValues:{
      email: '',
      password: ''
    }
  })


  const login = async (info: {
    email: string,
    password: string,
  }) => {
    try{
      console.log(info);
      const response = await axios.post('http://localhost:3001/auth/login', info);
      if (response.status == 201){
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('userId', response.data.user.sub);
        navigate('/home');
      }
    }catch (error){
      console.log(error);
    }

  }

  const userGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => getUserInfo(codeResponse),
    onError: (error) => console.log("login failed", error),
  })
  
  const getUserInfo = async (data: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    const googleUser = data
    if(googleUser){
        try{
        const response = await axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
            headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: 'application/json'
            }
        })
        saveUserAndLogin(response.data)
        console.log(response.data);
        }
        catch(err){console.log(err)}
    }
  }


  const saveUserAndLogin = async (googleUserInfo: infoResponse) => {
    const data: User = {
        googleId: googleUserInfo.id? googleUserInfo.id : null,
        firstName: googleUserInfo.given_name? googleUserInfo.given_name : null,
        lastName: googleUserInfo.family_name? googleUserInfo.family_name : null,
        email: googleUserInfo.email? googleUserInfo.email : null,
        password: "notapplicable",
        loggedIn: true
    }
    
    const response = await axios.post('http://localhost:3001/users/google-login', data);
    if(response.status == 200 || response.status == 201){
        console.log(response.data, "inside bkend");
        navigate("/home");
    }
    else{
        console.log(response)
    }
    return response  
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 space-y-4 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit((data) => {
          login(data);
        })}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" className="mt-1" {...register("email", { required: 'email is required'})}/>
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1" {...register("password", { required: 'password is required'})}/>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={() => userGoogleLogin()}>
          <ChromeIcon className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


// function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }
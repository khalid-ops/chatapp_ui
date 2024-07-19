import HomePage from "@/pages/home"
import LandingPage from "@/pages/landing"
import LoginPage from "@/pages/login"
import { SignUpPage } from "@/pages/signup"

export const routes = [
    {
        path: '/',
        element:  <LandingPage/>
    },
    {
        path: '/login',
        element:  <LoginPage/>
    },
    {
        path: '/home',
        element: <HomePage/>
    },
    {
        path: '/signup',
        element: <SignUpPage/>
    }

]
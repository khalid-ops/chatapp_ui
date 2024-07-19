import HomePage from "@/pages/home"
import LandingPage from "@/pages/landing"
import LoginPage from "@/pages/login"

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
    }

]
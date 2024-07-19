/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CVWZt8YqY1d
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "../lib/ui/card"
import { Label } from "../lib/ui/label"
import { Input } from "../lib/ui/input"
import { Button } from "../lib/ui/button"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
// import { FormEvent } from "react"

export default function Signup() {

    const { register, handleSubmit, watch, formState: {errors},  } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmedPassword: ""
        }
    })
    
    const confirmedPass = watch("password");

//    const signupUser = async (event: FormEvent) => {
//     event.preventDefault();    
//     console.log(formData)


//    } 
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
          <p className="text-muted-foreground">Enter your information to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit((data) => {
            console.log(data);
        })}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" placeholder="John" {...register("firstname", { required: 'first name is required'})} />
              <p className="text-red-600">{errors.firstname?.message}</p>
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="Doe" {...register("lastname", { required: 'last name is required'})}  />
              <p className="text-red-600">{errors.lastname?.message}</p>
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" {...register("email", { required: 'email is required'})} />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" {...register("password", { required: 'password is required', minLength: {
                value: 8,
                message: 'password must be of atleast 8 characters'
            }})}  />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="********" {...register("confirmedPassword", { required: 'password is required', validate: value => value === confirmedPass || 'entered password does not match'})}  />
            <p className="text-red-600">{errors.confirmedPassword?.message}</p>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  )
}
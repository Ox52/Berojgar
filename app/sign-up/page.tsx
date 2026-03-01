
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth/auth-client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUp(){

    const [name,SetName] = useState("")
    const [email,SetEmail] = useState("")
    const [password,SetPassword] = useState("")
    const [error,SetError] = useState("")
    const [loading,SetLoading] = useState(false);

    const router = useRouter();

    async function handelSubmit( e: React.FormEvent){

        e.preventDefault();
        SetError("")
        SetLoading(true);

        try{

            const result = await signUp.email({
               name,
               email,
               password

            });

            if(result.error){

                SetError(result.error.message ?? "failed to sign up")
            } else{
                router.push("/dashboard")

                
            }

            
        }catch(err){
            SetError("an unexpected error occurred");


        }finally{
            SetLoading(false)

        }
    }

    return(
        

        <div className=" flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">


       <Card className="w-full max-w-md border-gray-200 shadow-lg">
        

        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-black">
                 Sign-Up
            </CardTitle>

            <CardDescription className="text-gray-600">
            Create an account to start tracking your job applications
            </CardDescription>
        </CardHeader>

        <form  className="space-y-4" onSubmit={handelSubmit}>

            <CardContent className="space-y-4">
                <div className="space-y-4">

                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <Input id="name" placeholder="jhon" type="text" value={name} onChange={(e)=>SetName(e.target.value)} className="border-gray-300 focus:border-primary focus:ring-primary" required/>
                </div>
                <div className="space-y-4">

                    <Label htmlFor="email" className="text-gray-700" >Email</Label>
                    <Input id="email" placeholder="jhon@gmail.com" type="email" value={email} onChange={(e)=>SetEmail(e.target.value)}  className="border-gray-300 focus:border-primary focus:ring-primary" required/>
                </div>
                <div className="space-y-4">

                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Input id="password" placeholder="jhon" type="password" value={password} onChange={(e)=>SetPassword(e.target.value)}  className="border-gray-300 focus:border-primary focus:ring-primary" minLength={8 }required/>
                </div>

            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>{loading ?"creating an acccount...": "Sign-Up"}</Button>
                
                <p className="text-center text-sm text-gray-600">Already have an account? <Link href="/sign-in" className="font-medium text-primary hover:underline">Sign In</Link></p>
            </CardFooter>
        </form>
       </Card>
    </div>
    )
    
}


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn(){

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

          const result = await signIn.email({
            
             email,
             password

          });

          if(result.error){

              SetError(result.error.message ?? "failed to sign in")
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

      <div className=" flex min-h-[calc(100-4rem)] items-center justify-center bg-white p-4">

       

       <Card className="w-full max-w-md border-gray-200 shadow-lg">

        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-black">
                 Sign-In
            </CardTitle>

            <CardDescription className="text-gray-600">
            Enter your credentials to access your account
            </CardDescription>
        </CardHeader>

        <form onSubmit={handelSubmit} className="space-y-4">

            <CardContent className="space-y-4">
                
                <div className="space-y-4">

                    <Label htmlFor="email" className="text-gray-700" >Email</Label>
                    <Input id="email" placeholder="jhon@gmail.com" type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} className="border-gray-300 focus:border-primary focus:ring-primary" required/>
                </div>
                <div className="space-y-4">

                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Input id="password" placeholder="jhon" type="password"   value={password}
                onChange={(e) => SetPassword(e.target.value)} className="border-gray-300 focus:border-primary focus:ring-primary" minLength={8 }required/>
                </div>

            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
                <p className="text-center text-sm text-gray-600">Dont have an Account? <Link href="/sign-up" className="font-medium text-primary hover:underline">Sign Up</Link></p>
            </CardFooter>
        </form>
       </Card>
    </div>
    )
}

import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/login'
import Signup from '@/components/signup'
import { UrlState } from '@/context'

const Auth = () => {

  const navigate = useNavigate();


  const {isAuthenticated,loading} = UrlState();


  useEffect(()=>{

    if(isAuthenticated && !loading){
      navigate(`/dashboard/${longLink ? `createNew=${longLink}`:""}`)    
    }

  },[isAuthenticated,loading])
 

  // useful to access variables(ex:- createNew) in url
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  return (
    <div className='mt-20 flex flex-col items-center gap-10'>
      <h1 className=' text-5xl font-extrabold'>
        {
          longLink ? "Hold On ! Just Login First ..." : "Login / SignUp"
        }
      </h1>

      <Tabs defaultValue="account" className="w-[400px]">
        {/* one col for login and one col for signup */}
  <TabsList className='w-full grid grid-cols-2'>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="signup">Signup</TabsTrigger>
  </TabsList>

  <TabsContent value="login">
    <Login/>
  </TabsContent>

  <TabsContent value="signup">
    <Signup/>
  </TabsContent>

</Tabs>

    </div>
  )
}

export default Auth

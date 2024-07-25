import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const Login = () => {

    const [formData,setFormData]= useState({
        email:"",
        password:""
    })

    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew")


    const handleInputChange=(e)=>{
        // takes the name and value of that input
      const {name,value} = e.target;
       
      setFormData((previous)=>({  // overrides the previous values to new values
        ...previous,
        [name]:value,
      }))
    }

    const {data,error,loading,fn:fn_login} = useFetch(login,formData)

    const {fetchUser} = UrlState();// or we can use useContext(UrlContext)

    useEffect(()=>{
      console.log(data);
      if(error === null && data){
       navigate(`/dashboard/${longLink ? `createNew=${longLink}`:""}`)
       fetchUser();
      }

    },[data,error])

    const handleLogin = async ()=>{
        setErrors([]);
        try{
//  Yup is a library used for form validation in frontend
            const schema = Yup.object().shape({
                email:Yup.string()
                 .email("Invalid Email")
                 .required("Email is required"),
                password:Yup.string()
                 .min(6,"Password must be atleast 6 characters")
                 .required("password is required")
            })
            // abortEarly helps to throw the first error as soon as it encoundered one.
            await schema.validate(formData,{abortEarly:false});
            fn_login();           
        }catch(e){
            const newErrors = {};
            e?.inner?.forEach((err)=>{
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            console.log(errors);

        }
    }

    

  return (
    <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Please enter your details here to login</CardDescription>
    </CardHeader>
    {error && <Error message={error.message}/>}
    <CardContent className='space-y-2'>

      <div className="space-y-1">
        <Input name="email" type="email" placeholder='Enter your email here'
        onChange={handleInputChange} />
        {
          errors.email && <Error message={errors.email} />
        }
        
      </div>
      
      <div className="space-y-1">
        <Input name="password" type="password" placeholder='Enter your password here'
        onChange={handleInputChange} />
           {
          errors.password && <Error message={errors.password} />
        }
      </div>

    </CardContent>

    <CardFooter>
      <Button onClick={handleLogin}>
        {
            loading ? <BeatLoader size={10} color='green'/> : "Login"
        }
      </Button>
    </CardFooter>
  </Card>
  )
}

export default Login

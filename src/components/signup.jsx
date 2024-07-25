// import React from 'react'

// const Signup = () => {
//   return (
//     <div>
//       Signup
//     </div>
//   )
// }

// export default Signup


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
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const Signup = () => {

    const [formData,setFormData]= useState({
        name:"",
        email:"",
        password:"",
        profile_pic:null
    })

    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew")


    const handleInputChange=(e)=>{
        // takes the name and value of that input
      const {name,value,files} = e.target;
       
      setFormData((previous)=>({  // overrides the previous values to new values
        ...previous,
        [name]:files?files[0]:value,
      }))
    }

    const {data,error,loading,fn:fnSignup} = useFetch(signup,formData)

    const {fetchUser} = UrlState();// or we can use useContext(UrlContext)

    useEffect(()=>{
      console.log(data);
      if(error === null && data){
       navigate(`/dashboard/${longLink ? `createNew=${longLink}`:""}`)
       fetchUser();
      }

    },[data,error])

    const handleSignUp = async ()=>{
        setErrors([]);
        try{
//  Yup is a library used for form validation in frontend
            const schema = Yup.object().shape({
                name:Yup.string()
                 .required("name is required"),
                email:Yup.string()
                 .email("Invalid Email")
                 .required("Email is required"),
                password:Yup.string()
                 .min(6,"Password must be atleast 6 characters")
                 .required("password is required"),
                 profile_pic:Yup.mixed().required("Profile pic is required")
            })
            // abortEarly helps to throw the first error as soon as it encoundered one.
            await schema.validate(formData,{abortEarly:false});
            fnSignup();           
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
      <CardTitle>Signup</CardTitle>
      <CardDescription>Create a new account from here</CardDescription>
    </CardHeader>
    {error && <Error message={error.message}/>}
    <CardContent className='space-y-2'>

    <div className="space-y-1">
        <Input name="name" type="text" placeholder='Enter your name here'
        onChange={handleInputChange} />
        {
          errors.name && <Error message={errors.name} />
        }
        
      </div>

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

         
      <div className="space-y-1">
        <Input name="profile_pic" type="file"
        acceot="image/*"
        onChange={handleInputChange} />
           {
          errors.profile_pic && <Error message={errors.profile_pic} />
        }
      </div>

    </CardContent>

    <CardFooter>
      <Button onClick={handleSignUp}>
        {
            loading ? <BeatLoader size={10} color='green'/> : "Create Account"
        }
      </Button>
    </CardFooter>
  </Card>
  )
}

export default Signup

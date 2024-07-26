import { UrlState } from '@/context';
import React,{useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

function RequireAuth({children}){

    const navigate = useNavigate();
    const {isAuthenticated,loading} = UrlState();
    useEffect(()=>{
        if(!isAuthenticated && loading===false){
          navigate(`/auth`)    
        }  
      },[isAuthenticated,loading])

    if(loading) return <BarLoader width={"100%"} color="green"/>

    if(isAuthenticated) return children;

}

export default RequireAuth;




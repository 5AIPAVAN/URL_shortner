import { UrlState } from '@/context'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Card,
} from "@/components/ui/card"
import { Button } from './ui/button';
import Error from './error';
import { Input } from "@/components/ui/input";
import * as yup from 'yup'
import useFetch from '@/hooks/use-fetch';
import { createUrl } from '@/db/apiUrls';
import { QRCode } from 'react-qrcode-logo';
import { BeatLoader } from 'react-spinners';

const CreateLink = () => {

    const { user } = UrlState();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const ref = useRef();

    const [errors,setErrors] = useState([]);
    const [formValues,setFormValues]= useState({
        title:"",
        longUrl: longLink? longLink:"",
        customUrl:""
    })

    const schema = yup.object().shape({

        title:yup.string().required("Title is required"),
        longUrl:yup.string().url("Must Have a valid url").required("Long url is required"),
        customUrl:yup.string(),

    })

    const handleChange=(e)=>{
        setFormValues({
            ...formValues,
            [e.target.id]:e.target.value,
        });
    };

  
    const {loading:loadingCreate,data,error,fn:fnCreateUrl} = useFetch(createUrl,{...formValues,user_id:user.id});

    
   useEffect(()=>{

    if(error === null && data){
        navigate(`/link/${data[0].id}`);
    }
    
},[error,data])


   const createNewLink = async ()=>{
       setErrors([]);
       try{
             await schema.validate(formValues,{abortEarly:false});
             const canvas = ref.current.canvasRef.current;
             const blob = await new Promise((resolve)=> canvas.toBlob(resolve));

             await fnCreateUrl(blob);

       }catch(e){
        const newErrors = {};
        e?.inner?.forEach((err)=>{
            newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        // console.log(errors);
       }
   }
    





    return (
        <Dialog defaultOpen={longLink}
        onOpenChange={(res)=>{if(!res) setSearchParams({})}}>
            <DialogTrigger>
                <Button variant='destructive'> Create New Link</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Create A New Link</DialogTitle>

                    </DialogHeader>

                    {
                        formValues?.longUrl &&
                        <QRCode value = {formValues?.longUrl} size={250} ref={ref}/>
                    }

                    <Input id="title" value={formValues.title} onChange={handleChange} placeholder="Enter Your Links title " />
                    {errors.title && <Error message={error.title} />}
      

                    <Input id="longUrl" value={formValues.longUrl} onChange={handleChange}  placeholder="Enter Your Looong Url " />
                    {errors.longUrl && <Error message={error.longUrl} />}
                   

                    <div className="flex items-center gap-2">
                        <Card className='p-2'>trimmr.in</Card>/
                        <Input id="customUrl" value={formValues.customUrl} onChange={handleChange}  placeholder="Custom link (optional) " />
                    </div>
                    {error && <Error message={error.message} />}
                  
              


                <DialogFooter className='sm:justify-end'>
                    <Button disable={loadingCreate} onClick={createNewLink} type="submit" variant='destructive'>
                        {loadingCreate ? <BeatLoader size={10} color='white'/> : "Create"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}

export default CreateLink

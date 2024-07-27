import { storeClicks } from '@/db/apiClicks';
import { getLongUrl} from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const RedirectLink = () => {

  const {id} = useParams();
  const {loading,data,fn:fnLongUrl} = useFetch(getLongUrl,id);
  console.log(data);

  const {loading:loadingStats,fn:fnStats} = useFetch(storeClicks,{
    id:data?.id,
    originalUrl:data?.original_url
  })

  useEffect(()=>{
    fnLongUrl(); // first get the longUrl
  },[])

  useEffect(()=>{
  if(!loading && data){
    fnStats();
  }
  },[loading])

if(loading || loadingStats){

  return (
    <div>
      <BarLoader width={"100%"} color='violet'/>
      <br/>
      Redirecting...
    </div>
  )

}

return null;

}

export default RedirectLink

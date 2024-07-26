import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'


import { getUrls } from '@/db/apiUrls'
import { getClicksForUrls } from '@/db/apiClicks'
import Error from '@/components/error'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import LinkCard from '@/components/link-card'







const Dashboard = () => {

  const [searchQuery,setSearchQuery] = useState("");

  const {user} = UrlState();

  if(user){
    console.log('user',user);
  }
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);

  useEffect(()=>{
    fnUrls();
  },[]);


  if(urls){
    console.log('urls',urls)
  }

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  const filteredUrls = urls?.filter((url)=>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if(filteredUrls){
    console.log('filtereddd',filteredUrls);
  }
  
  
  useEffect(()=>{
  if(urls?.length){
    fnClicks();
  }
  },[urls?.length])






  return (
    <div className='flex flex-col gap-8'>
      {(loading || loadingClicks) && <BarLoader width={"100%"} color='green' />}

      <div className='grid grid-cols-2 gap-4'>

        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>

      </div>

      <div className="flex justify-between">
        <div className="text-4xl font-extrabold">My Links</div>
        <Button>Create Link</Button>
      </div>

      <div className="relative">
       <Input type='text'
       placeholder='Search For Your Links'
       value={searchQuery}
       onChange={(e)=>setSearchQuery(e.target.value)}/>
       <Filter className='absolute top-2 right-2 p-1'/>
      </div>

     {error && <Error message={error.message}/>}
     {(filteredUrls || []).map((url, i) =>
      (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  )
}

export default Dashboard



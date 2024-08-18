import { UrlState } from '@/context';
import { getClicksForUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { LinkIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';
import { Copy, Download, Trash } from "lucide-react";
import { BeatLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';

import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Link = () => {

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    error,
    fn
  } = useFetch(getUrl, { id, user_id: user?.id });


  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id)

  useEffect(() => {
    fn();
    fnStats();

  }, []);
  console.log('stats of url',stats);
 console.log('url',url);

  if (error) {
    navigate('/dashboard');
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url.custom_url : url?.short_url;
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }




  return (
    <>
      {
        (loading || loadingStats) &&
        <BarLoader className='mb-4' width={"100%"} color='yellow' />

      }

      <div className='flex flex-col gap-8 sm:flex-row justify-between'>
        <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
          <span className='text-6xl font-extrabold hover:underline cursor-pointer'>
            {url?.title}
          </span>

          <a href={`https://trimrr.in/${link}`} target='_blank'
            className='text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer'>
            https://trimr.in/{link}
          </a>

          <a href={url?.original_url} target='_blank'
            className='flex items-center gap-1 hover:underline cursor-pointer'>

            <LinkIcon className='p-1' />
            {url?.original_url}

          </a>


          <span className='flex items-end font-extralight text-sm'>
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                // inbuilt function to copy something to clipboard
                navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage} >
              <Download />
            </Button>
            <Button variant="ghost"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? <BeatLoader size={5} color='yellow' /> : <Trash />}

            </Button>
          </div>

          <img src={url?.qr}
            className='w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain'
            alt='qr_image'
          />

        </div>


        <Card className='sm:w-3/5'>
          <CardHeader>
            <CardTitle className='text-4xl font-extrabold'>Link stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className='flex flex-col gap-6'>
           <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats?.length}</p>
          </CardContent>
        </Card>

        <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
          </CardContent>
        ):(<CardContent>
          {loadingStats===false ?'NO STATS YET':'LOADING STATS....'}
          </CardContent>)}
     
        </Card>


      </div>

    </>
  )
}

export default Link

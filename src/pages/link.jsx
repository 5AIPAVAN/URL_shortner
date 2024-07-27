import { UrlState } from '@/context';
import { getClicksForUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { LinkIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

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

  if (error) {
    navigate('/dashboard');
  }

  let link="";
  if(url){
  link = url?.custom_url ? url.custom_url : url?.short_url;
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

          <a href={url?.original_url} target='_blank'>

            <LinkIcon className='p-1'/>
            {url?.original_url}

          </a>
          <span>{new Date(url?.created_at).toLocaleString()} </span>
        </div>


        <div>
       {/* {link} */}
        </div>

      </div>

    </>
  )
}

export default Link

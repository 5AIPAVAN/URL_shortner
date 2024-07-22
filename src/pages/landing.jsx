import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  // for input handling
  const [longUrl,setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
     e.preventDefault();
     if(longUrl){
      navigate(`/auth?createNew=${longUrl}`)
     }

  }

  return (
    <div className='flex flex-col items-center'>


      {/* my-10: Applies a margin of 10 units on the top and bottom for all screen sizes.
sm:my-16: Overrides the margin to 16 units on the top and bottom for screen sizes that are sm (small) and larger.
text-3xl: Applies a text size of 3xl for all screen sizes.
sm:text-6xl: Overrides the text size to 6xl for screen sizes that are sm (small) and larger.
lg:text-7xl: Further overrides the text size to 7xl for screen sizes that are lg (large, typically 1024px) and larger. */}
      <div className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold '>
        <h2>The Only URL shortner You Will Ever Need !! </h2>
      </div>

      <form onSubmit={handleShorten} className='sm:h-14 gap-4 flex flex-col sm:flex-row w-full md:w-2/4 '>
      {/* type must be url here -> it validates wheather it is url or not */}
      <Input type="url" 
       value = {longUrl}
       placeholder="Enter your URL here"
       className=' h-full flex-1 py-4 px-4 '
       onChange={(e)=>setLongUrl(e.target.value)} />
      <Button className='h-full bg-green-600 text-white hover:bg-orange-600 hover:text-white' type='submit' >Shorten</Button>
      </form>

      <div>
        <img src='banner.jpeg' alt='banner image' className='w-full my-11 md:px-11'/>
      </div>
      
      <Accordion type="single" collapsible className="w-full md:p-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage

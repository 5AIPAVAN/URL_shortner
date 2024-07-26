import React from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-8'>
      {true && <BarLoader width={"100%"} color='green' />}

      <div className='grid grid-cols-2 gap-4'>

        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>5</p>
          </CardContent>
        </Card>

      </div>

      <div className="flex justify-between">
        <div className="text-4xl font-extrabold">My Links</div>
        <Button>Create Link</Button>
      </div>

      <div className="relative">
       <Input type='text' placeholder='Search For Your Links'/>
      </div>




    </div>
  )
}

export default Dashboard

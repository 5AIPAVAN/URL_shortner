import React from 'react'

const Error = ({message}) => {
  return (
    <div className='text-sm text-red-500'>
       {message}
    </div>
  )
}

export default Error

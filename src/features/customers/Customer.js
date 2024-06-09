import React from 'react'
import { useSelector } from 'react-redux'

function Customer() {
  const customer = useSelector((store) => store.customer)
  
  return (
    <div className="pl-5">
      <h1 className='font-bold text-2xl mb-3 '>Welcome {customer?.fullName}</h1>
    </div>
  )
}

export default Customer

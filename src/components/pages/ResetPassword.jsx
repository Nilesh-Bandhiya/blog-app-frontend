import React from 'react'
import { useParams } from 'react-router-dom'


const ResetPassword = () => {

    const params = useParams();
    console.log(params);

  return (
    <div>ResetPassword</div>
  )
}

export default ResetPassword
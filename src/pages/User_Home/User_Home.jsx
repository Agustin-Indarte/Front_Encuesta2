import React from 'react'
import { BodyUserHome, Navbar } from '../../components'


function User_Home() {
  return (
    <>
      <Navbar />
      <div className="Container-Page">
        <BodyUserHome />
      </div>
    </>


  )
}

export default User_Home
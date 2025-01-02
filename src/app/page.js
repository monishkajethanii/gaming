"use client"
import React, { useEffect } from 'react'
import InScroll from './InScroll'
import Slideshow from './Slideshow'

export default function page() {
  useEffect(()=>{
    window.location.href="/Home"
  })
  return (
    <div>
      {/* <Slideshow/> */}
      {/* <Link href="/Home">Home</Link> */}
    </div>
  )
}

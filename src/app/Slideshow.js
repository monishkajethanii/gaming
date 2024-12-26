"use client"
import React from 'react'

export default function Slideshow() {
    const animation =(e)=>{
        const cards= document.querySelectorAll('.card');
        const reset = ()=>{
            cards.forEach(card=>{
                card.classList.remove('animation')
            })
        }
        if(!e.target.closest('.card'))
            return
        reset();
        e.target.parentElement.classList.add('animation')
    }
  return (
    <>
    <div className='h-[100vh] grid place-items-center'>
      <div className='flex gap-[0.15rem] p-[0.15rem]'>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="gow.jpeg" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="fortnite.jpeg" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="Black.jpeg" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="fifa22m.jpg" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="gta5m.png" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
        <div onMouseEnter={animation} className='card flex-1 h-[70vmin] cursor-pointer overflow-hidden transition-all delay-700'>
            <img src="fc25m.avif" width={500} height={500} className="w-[100%] h-[100%] object-contain transition-all" />
        </div>
      </div>
    </div>
    </>
  )
}

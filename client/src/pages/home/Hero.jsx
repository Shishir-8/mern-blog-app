import React from 'react'

export default function Hero() {
  return (
    <div class="flex py-30 justify-center items-center ">
    <div class="text-center max-w-6xl mx-10">
        
        <h1 class="my-3 text-3xl font-bold tracking-tight text-gray-800 md:text-5xl ">
           Explore more that <span className='text-green-500'>Inspire you</span>
        </h1>
        <div>
            <p class="max-w-2xl mx-auto my-2 text-base text-gray-500 md:leading-relaxed md:text-xl ">
                Every idea matters. Share your experiences, thoughts, and creativity with the world — one blog at a time. Inspire readers globally and grow your digital footprint.
            </p>
        </div>
        <div class="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row"><a
                class="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-lg shadow-xl sm:w-auto bg-gradient-to-r from-purple-600 to-green-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
                href="">Get Started
            </a>
        
        </div>
    </div>
</div>
  )
}

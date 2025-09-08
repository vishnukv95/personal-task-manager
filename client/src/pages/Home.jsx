import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-60 p-6'>
        <h2 className='text-5xl font-bold text-blue-700'>Welcome To Your "Daily" task Manager</h2>
        <a className='bg-blue-700 p-2 rounded-md text-white m-5' href="/login">Log in</a>
    </div>
  )
}

export default Home
import React from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex justify-around items-center mb-10 p-5 flex-wrap'>
      <Link><h1 className='md:text-3xl text-xl font-bold'>Quick Notes</h1></Link>

      <div className='flex justify-start items-center border bg-white border-purple-500 rounded-lg px-2 w-full  md:mt-0 mt-2  md:w-auto '>
        <Search width={20} height={20}/>
        <input
        type="text"
        placeholder="Search notes..."
        className=" px-4 py-2 w-80 rounded-lg outline-none"
        />
      </div>

     
    </div>
  )
}

export default Navbar

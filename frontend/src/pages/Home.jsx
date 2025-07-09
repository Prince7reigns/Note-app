import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import NoteCard from '@/components/NoteCard'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { noteService } from '@/api/noteApi'
import Loader from '@/components/Loader'

 
const Home = () => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [notes, setNotes] = useState([])
      const [page, setPage] = useState(1)
      const [totalCount,setTotalCount] = useState(0)
      const limit = 8

    const featchNotes = async () =>{
        setLoading(true)
        try {
            await new Promise((res) => setTimeout(res, 1500))
            const response = await noteService.getAllNotes({page,limit})
         
            if(response.success){
              console.log(response.data)
              setTotalCount(response.TotalCount)
               setNotes(response.data)
            }else{
               toast.error(response.message)
               console.log(response.error?.message , response.error?.status)
            }
        } catch (err) {
            toast.error("Something went wrong while fetching the note.");
           console.error("Unexpected fetchNote error:", err);
        }finally{
            setLoading(false)
        }
    }
    
     useEffect(()=>{
        featchNotes()
      },[page])

    const totalPages = Math.ceil(totalCount / limit)
    
  if(loading){
    return(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"'>
            { console.log("hello")}
         {[...Array(8)].map((note, i) => (
          <Loader
           key={i}
          />
         
      ))}
    </div>
    )
  }

  return (
   <div>
         {notes.length ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-2'>
                {notes.map((note, i) => (
                 <Link to={`/note/${note._id}`} key={i}>
                 <NoteCard
                  title={note.title}
                  description={note.description}
                  type={note.type}
                  date={note.createdAt}
                 />
                 </Link>
                 ))}
            </div>
         ) : (
             <Link to="create-note">
               <div role="status" className="w-full max-w-xl mx-auto h-64 bg-blue-50 dark:bg-blue-950 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-5 p-6">
                      <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-full animate-bounce">
                        <svg className="w-10 h-10 text-blue-500 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 14h-2c0-1.103-.897-2-2-2s-2 .897-2 2H5c0-2.757 2.243-5 5-5s5 2.243 5 5zm-1-7c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1zm4 0c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1z"/>
                        </svg>
                      </div>
                      <p className="text-center text-blue-800 dark:text-blue-100 text-base font-semibold">
                        😔 No Notes Found
                      </p>
                      <p className="text-center text-blue-600 dark:text-blue-300 text-sm">
                        Start by creating your first note to stay organized and productive.
                      </p>
               </div>
             </Link>
         )}
           {totalPages > 1 && (
             <div className="flex justify-center mt-6 gap-4">
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    variant="outline"
                  >
                    Prev
                  </Button>
                  <span className="px-4 py-2 rounded text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    disabled={page === totalPages }
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    variant="outline"
                  >
                    Next
                  </Button>
             </div>
           )}

           <Button onClick={() => navigate("create-note")} size='icon' className='fixed bottom-6 right-6 bg-[#7C4DFF] text-white w-14 h-14 text-3xl rounded-full shadow-lg'>
                +
           </Button>
    </div>
    )
}

export default Home

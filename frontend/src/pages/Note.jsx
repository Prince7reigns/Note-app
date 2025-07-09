import React, { useEffect, useState } from 'react'
import NoteCard from '@/components/NoteCard'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { noteService } from '@/api/noteApi'
import { toast } from 'react-hot-toast'

const Note = () => {
  const {id} = useParams()
  const [note,setNote] = useState()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchNote = async () => {
  try {
    setLoading(true)
    const response = await noteService.getNoteById({ id });

    if (response.success) {
      setNote(response.data.data);
    } else {
      toast.error(response.message);
      console.error("Note fetch error:", response.error?.message, response.error?.status);
    }

  } catch (err) {
    toast.error("Something went wrong while fetching the note.");
    console.error("Unexpected fetchNote error:", err);
  }finally{
    setLoading(false)
  }
};


  const handleDelete = async (e) => {
  e.preventDefault();
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    const response = await noteService.deleteNote({ id });
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  } catch (err) {
    toast.error("Failed to delete note.");
    console.error("Delete error:", err);
  }
};

  useEffect(()=>{
    fetchNote()
  },[id])

  

  return (
    <div className='h-full'>
       <NoteCard
      title={note?.title}
      description={note?.description}
      type={note?.type}
      date={note?.updatedAt}
      show={true}
      /> 

      <div className='flex justify-between items-center m-5'>
         <Button onClick={handleDelete} size="new" className='w-auto px-16 py-3 rounded-md bg-red-500 '>Delete</Button>
         <Button onClick={()=>navigate(`/edit-note/${id}`)} size="new" className='w-auto px-16 py-3 rounded-md bg-green-500 '>Edit</Button>
      </div>
    </div>
  )
}

export default Note

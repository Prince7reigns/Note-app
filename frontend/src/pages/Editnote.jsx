import React, { useEffect, useState } from 'react'
import CreateNote from './CreateNote'
import { useParams } from 'react-router-dom'
import { noteService } from '@/api/noteApi'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const Editnote = () => {
  const { id } = useParams()
  const [note, setNote] = useState()
  const [loading, setLoading] = useState(false)

  const fetchNote = async () => {
    try {
      setLoading(true)
      const response = await noteService.getNoteById({ id })
      console.log(response.data)
      if (response.success) {
        setNote(response.data.data)
      } else {
        toast.error(response.message)
        console.error("Note fetch error:", response.error?.message, response.error?.status)
      }
    } catch (err) {
      toast.error("Something went wrong while fetching the note.")
      console.error("Unexpected fetchNote error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNote()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="animate-spin text-black w-8 h-8" />
      </div>
    )
  }

  return (
    <div>
      <CreateNote note={note} />
    </div>
  )
}

export default Editnote

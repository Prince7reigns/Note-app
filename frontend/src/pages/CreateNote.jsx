import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import toast from 'react-hot-toast'
import { noteService } from '@/api/noteApi'
import { Loader2 } from 'lucide-react'



const CreateNote = ({note = {}}) => {

  const [message, setMessage] = useState(null); // for success or error
  const [loading, setLoading] = useState(false);
  const[formData,setFormData] =
  useState({
        title: note.title || "",
        description: "" || note.description,
        type:"" || note.type
   })

  const handleChange = (efield, value) =>{
        setFormData((prev)=>({
          ...prev,
          [efield]:value
        }))
   }

        
  const handleSubmit = async(e) =>{
    e.preventDefault()
      if(Object.keys(note).length === 0){
         setLoading(true)
        try {
          const trimmedTitle = formData.title.trim();
          const trimmedDescription = formData.description.trim();

          const response = await noteService.createNote({
            title:trimmedTitle,
            description:trimmedDescription,
            type:formData.type
          })

          if(response.success){
            setMessage({type:"success" , text:response.message});
            setFormData({
              title:"",
              description:"",
              type:""
            })
            setLoading(false)

          }else{
            console.log(response)
            setMessage({type:"error" , text: response.message})
            toast.error(response.message)
            console.log(response.error?.message , response.error?.status)
          }
        } catch (err) {
          toast.error("Something went wrong while fetching the note.");
          console.error("Unexpected fetchNote error:", err);
        }

      }else{
         try {
          setLoading(true)
          const trimmedTitle = formData.title.trim();
          const trimmedDescription = formData.description.trim();
 
          const response = await noteService.updateNote(note._id , {trimmedTitle , trimmedDescription , type:formData.type})
 
          if(response.success){
             setMessage({type:"success" , text:response.message});
             setFormData({
               title:"",
               description:"",
               type:""
             })
             setLoading(false)
             toast.success(response.message)
          }else{
           setMessage({type:"error" , text: response.message})
           toast.error(response.message || "")
           console.log(response.error?.message , response.error?.status)
          }
         } catch (err) {
           toast.error("Something went wrong while fetching the note.");
           console.error("Unexpected fetchNote error:", err);
         }finally{
          setLoading(false)
         }
      }
    }

     if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="animate-spin text-black w-8 h-8" />
      </div>
    )
  }

  return (
 
       <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl">Add A New Note</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title of the note"
                      required
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Description</Label>
                    </div>
      
                    <Textarea
                    className="w-full h-40 resize-none p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1E293B] dark:text-white"
                    id="description"
                    placeholder="Type your message here."
                    value={formData.description }
                     onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Note Type</Label>
                    </div>
                    <Select onValueChange={(value) => handleChange('type', value)}>
                       <SelectTrigger className="w-[180px]">
                         <SelectValue placeholder={ formData.type || "Type"} />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Work">Work</SelectItem>
                         <SelectItem value="Personal">Personal</SelectItem>
                         <SelectItem value="Study">Study</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button  type="submit" onClick={handleSubmit} size="new">
                {Object.keys(note).length === 0 ? 'Create Note' : 'Update Note'}
              </Button>
              {message && (
                <p className={`text-center mt-4 font-medium ${ message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>
              )}
            </CardFooter>
          </Card>

  )
}

export default CreateNote

import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { validateNoteInput } from "@/utils/helpValidtion";


 class NoteService {

    async getAllNotes({page,limit}) {
     try {
       const res =  await axios.get(`${BASE_URL}/all?page=${page}&limit=${limit}`)
       console.log(res.data.data)
       return {
         success: true,
         message: "Note fetched successfully.",
         TotalCount: 13,
         data: res.data.data.allNotes,
      };

     } catch (error) {
        console.error("Backend Axios :: getAllNotes :: Error", error?.message);

      return {
         success: false,
         message: "Failed to fetch notes. Please try again later.",
         error: {
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || error.message || "Unknown error"
         }
      };
    }}

    async getNoteById({ id }) {
      try {
         const res = await axios.get(`${BASE_URL}/note/${id}`);
   
         return {
            success: true,
            message: "Note fetched successfully.",
            data: res.data,
         };
      } catch (error) {
         console.error("Backend Axios :: getNoteById :: Error", error?.message);
   
         return {
            success: false,
            message: "Failed to fetch note. Please try again later.",
            error: {
               status: error?.response?.status || 500,
               message: error?.response?.data?.message || error.message || "Unknown error"
            }
         };
      }
    }

    async createNote ({title,description,type}){
        const validationError = validateNoteInput({ title, description, type });

        if(validationError){
            return {
             success: false,
             message: validationError,
            };
        }

        try {
           await axios.post(`${BASE_URL}/create`,{
            title:title ,
            description:description ,
            type:type
           })

           return {
             success: true,
             message: "Note Created  successfully.",
           };
        } catch (error) {
            console.error("Backend Axios :: createNote :: Error", error?.message)
            return {
               success: false,
               message: "Failed to Create note. Please try again later.",
               error: {
                  status: error?.response?.status || 500,
                  message: error?.response?.data?.message || error.message || "Unknown error"
               }
            };
        }
    }

    async updateNote(id,{title,description,type}){
        const validationError = validateNoteInput({title,description,type})

        if(validationError){
            return{
                success: false,
                message: validationError,
            }
        }
       try {
        await axios.put(`${BASE_URL}/note/${id}`,{
            title:title ,
            description:description ,
            type:type
        })
        return {
             success: true,
             message: "Note Updated  successfully.",
        }
       } catch (error) {
        console.error("Backend Axios :: UpdateNote :: Error", error?.message)
        return {
            success: false,
            message: "Failed to Update note. Please try again later.",
            error: {
                status: error?.response?.status || 500,
                message: error?.response?.data?.message || error.message || "Unknown error"
            }
        }
       }
    }

    async deleteNote({id}){
        try {
            await axios.delete(`${BASE_URL}/note/${id}`)

            return{
                success: true,
                message: "Note Deleted  successfully.",
            }
        } catch (error) {
            console.error("Backend :: deleteNote :: Error", error?.message);

            return{
                success: false,
                message: "Failed to delete note. Please try again later.",
                error: {
                    status: error?.response?.status || 500,
                    message: error?.response?.data?.message || error.message || "Unknown error"
                }
            }
        }
    }
}

export const noteService = new NoteService();
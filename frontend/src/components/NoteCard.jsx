import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

const tagColors = {
    Work: "bg-[#4FC3F7] text-indigo-600",
    Personal: "bg-[#F06292] text-red-600",
    Study: "bg-[#81C784] text-green-600",
  };

const NoteCard = ({title,description,type,date,show=false}) => {
    const normalDate = new Date(date)
  return (

      <Card>
          <CardHeader>
            <CardTitle className='font-bold text-3xl'>{title}</CardTitle>
            <CardDescription> {show
                          ? description
                          : `${description.split(" ").slice(0, 20).join(" ")}...`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`inline-block  text-sm  font-bold  px-4 py-1 rounded-lg bg-opacity-30 ${tagColors[type]}`}>{type}</div>
          </CardContent>
          <CardFooter>
            <p>{normalDate.toLocaleDateString('en-US', {
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric'})}</p>
          </CardFooter>
      </Card>
  )
}

export default NoteCard

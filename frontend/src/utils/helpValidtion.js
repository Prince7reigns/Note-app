export function validateNoteInput({ title, description, type}){
    
    if(!title || typeof title !== "string" || title.trim().length < 3){
        return "Invalid title. Must be at least 3 characters.";
    }

    if (!description || typeof description !== "string" || description.trim().length === 0) {
     return "Description is required.";
    }

    const allowedTypes = ["Personal", "Work", "Study"];
     if (!allowedTypes.includes(type)) {
       return `Invalid type. Must be one of: ${allowedTypes.join(", ")}`;
     }

      return null; // Valid
}
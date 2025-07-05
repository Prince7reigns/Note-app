import {Router} from "express"

import {
    createNote,
    getAllNotes,
    deleteNote,
    updateNote,
    getNote
} from '../controllers/notes.controller.js'

const router = Router()

router.post('/create',createNote)
router.get('/all',getAllNotes)
router.route('/note/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

  export default router
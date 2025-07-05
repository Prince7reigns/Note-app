import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notes } from "../models/note.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, description,type } = req.body;

  if (!(title && description && type)) {
    throw new ApiError(400, "Please provide both title and description");
  }

  const note = await Notes.create({ title, description,type });
  const createdNote = await Notes.findById(note._id);

  if (!createdNote) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdNote, "Note created successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, description,type } = req.body;
  const noteId = req.params.id; // ✅ fixed

  if (!(title && type)) {
    throw new ApiError(400, "Title or type is missing");
  }

  const note = await Notes.findById(noteId);
  if (!note) {
    throw new ApiError(404, "No note found");
  }

  const updatedNote = await Notes.findByIdAndUpdate(
    noteId,
    { title, description,type },
    { new: true }
  );

  if (!updatedNote) {
    throw new ApiError(500, "Failed to update note");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id; // ✅ fixed

  const note = await Notes.findById(noteId);
  if (!note) {
    throw new ApiError(400, "No such note found");
  }

  await Notes.findByIdAndDelete(noteId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Note deleted successfully"));
});

const getAllNotes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const allNotes = await Notes.find().skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, allNotes, "All notes fetched successfully"));
});

const getNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id; // ✅ fixed

  const note = await Notes.findById(noteId);
  if (!note) {
    throw new ApiError(404, "No such note found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note fetched successfully"));
});

export { createNote, getNote, getAllNotes, deleteNote, updateNote };

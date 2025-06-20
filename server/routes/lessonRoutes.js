import express from 'express';
import { getLesson, createLesson } from '../controllers/lessonController.js';

const router =  express.Router();

//Get all lessons 
router.get('/', getLesson);

//post a new lesson
router.post('/', createLesson);

export default router;

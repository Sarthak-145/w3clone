import express from 'express';
import { getLesson, createLesson } from '../controllers/lessonController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router =  express.Router();

//Get all lessons 
router.get('/', getLesson);

//post a new lesson
router.post('/', authMiddleware, createLesson);

export default router;

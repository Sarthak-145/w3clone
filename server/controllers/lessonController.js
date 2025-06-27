import Lesson from '../models/Lesson.js';

//getLesson will find and then send user requested data from Lesson
export const getLesson = async (req, res) => {
    try {
        //find is in-built && it is from mongoose.
        const lessons = await Lesson.find();
        res.json(lessons);
    }
    catch (error) {
        res.status(500).json({message: 'Server error'})
    }
};

export const createLesson = async (req, res) => {
    //destructuring content from Lesson
    const { title, content, category } = req.body;

    try {
        const lesson = new Lesson({ title, content, category });
        const createdLesson = await lesson.save();
        res.status(201).json(createdLesson);
    }
    catch (error) {
        res.status(400).json({message: 'Invalid data' });
    }
};
import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'HTML',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;

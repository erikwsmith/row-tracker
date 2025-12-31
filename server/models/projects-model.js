import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    { timestamps: true }, { collection: 'projects' } 
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
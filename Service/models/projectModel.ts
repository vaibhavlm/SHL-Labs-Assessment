import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tech_skillset = new Schema({
    Frontend:{
        type: String
    },
    Backend: {
        type: String
    },
    Databases:{
        type: String
    },
    Infrastructre:{
        type: String
    }
})

const other_info = new Schema({
    Availability:{
        type : String
    }
})

const projectSchema = new Schema({
    Title:{
        type: String,
        required: true
    },
    Technologies:{
        type: String
    },
    Technical_Skillset: tech_skillset,
    Other_Information: other_info
})

export var Project = mongoose.model('Project',projectSchema);

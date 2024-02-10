// controller/image-controller.js

import File from "../model/file.js";

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname
    };
    try {
        const file = await File.create(fileObj);
        const filePath = `https://file-sharing-mxpa.onrender.com/uploads/${file._id}`;
        response.status(200).json({ path: filePath });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

// controller/image-controller.js

import File from "../model/file.js";

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findOne({ path: request.params.fileId }); // Query based on the path field
        if (!file) {
            return response.status(404).json({ error: "File not found" });
        }
        file.downloadContent++;
        await file.save();
        const fileUrl = `${file.path}`;
        response.redirect(fileUrl);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};


export const getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch files" });
    }
};

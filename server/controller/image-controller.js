import File from "../model/file.js";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

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

export const downloadImage = async (request, response) => {
    try {
        const fileId = request.params.fileId;
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return response.status(404).json({ error: "Invalid File ID" });
        }

        const file = await File.findById(fileId);
        if (!file) {
            return response.status(404).json({ error: "File not found" });
        }

        // Set the appropriate headers for file download
        response.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
        response.setHeader("Content-Type", "application/octet-stream");

        // Stream the file for download
        const filePath = path.join(__dirname, "..", file.path);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(response);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Internal Server Error" });
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

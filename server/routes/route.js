import express from "express"
import { uploadImage ,downloadImage,getAllFiles} from "../controller/image-controller.js"
import upload from "../utils/Upload.js"
const router=express.Router()
router.post("/upload",upload.single("file"),uploadImage)
router.get("/file/:fileId", downloadImage);
router.get("/files", getAllFiles);


export default router
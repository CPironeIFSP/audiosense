import express from "express"
import multer from 'multer'
import { createTagController, getAllTagsFromController, updateTagController, deleteTagController, getAudioController } from '../controllers/tagController.js'

const routes = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

routes.post("/", upload.fields([{ name: "audio1" }, { name: "audio2" }]), createTagController);
routes.get("/", getAllTagsFromController);
routes.patch("/", upload.fields([{ name: "audio1" }, { name: "audio2" }]), updateTagController);
routes.delete("/", deleteTagController);
routes.get("/audio", getAudioController);

export default routes;
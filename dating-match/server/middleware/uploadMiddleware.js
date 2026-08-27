import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

export const uploadsDir = fileURLToPath(new URL("../uploads", import.meta.url));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadsDir),
  filename: (_req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    callback(null, `${randomUUID()}${ext}`);
  },
});

export const uploadPhotoMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/"))
      return callback(new Error("INVALID_FILE_TYPE"));
    callback(null, true);
  },
}).single("photo");

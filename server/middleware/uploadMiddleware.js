import os from "os";
import path from "path";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir());
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname) || '.jpg';
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        }
    })
});

export default upload;

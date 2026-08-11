import os from "os";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir());
        }
    })
});

export default upload;

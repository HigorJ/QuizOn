import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(path.dirname(''), 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export default storage;
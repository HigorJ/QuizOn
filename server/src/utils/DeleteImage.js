import { unlink } from 'fs';
import path from 'path';

export default function deleteImage (filename) {
    unlink(path.resolve(path.resolve(), 'uploads', filename), (err) => {
        if(err) {
            console.log(err);
        }
    });
}
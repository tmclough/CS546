import { S3, S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3"
import multer from "multer";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
}
const s3 = new S3Client(config);
const newS3 = new S3(config);

export const deleteFile = async (url) => {
    let filename = url.substring(48, url.length);
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    }
    await newS3.deleteObject(params, function (err, data) {
        if (err) {
            throw "Error: AWS deletion error";
        }
    });

    return { deleted: true };
}

export const uploadImages = (req, res, next) => {
    const upload = multer({
        storage: multerS3({
            s3,
            acl: "public-read",
            bucket: process.env.AWS_BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
                cb(null, `${fileName}${path.extname(file.originalname)}`);
            }
        }),

        fileFilter: (req, file, cb) => {
            if (
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/png"
            ) {
                cb(null, true);
            } else {
                cb(new Error("Invalid file type!"), false);
            }
        }
    }).array("images", 4);

    upload(req, res, (error) => {
        if (error) {
            req.uploadError = {
                message: 'Upload unsuccessful',
                errorMessage: error.message,
                errorCode: error.code
            };
        }
        next();
    });

}
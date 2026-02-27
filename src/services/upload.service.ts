import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';

cloudinary.config({
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  cloud_name: config.cloudinary.name,
});

export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'sakuin/attachments',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}

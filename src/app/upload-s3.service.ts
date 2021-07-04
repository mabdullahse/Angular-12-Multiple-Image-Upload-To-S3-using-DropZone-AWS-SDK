import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root',
})
export class UploadS3Service {
  constructor() {}
  uploadFile(file: any, filePath: any) {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: 'AKIASNQ57G3KG34NQ7O6', // ACCESS_KEY_ID
        secretAccessKey: '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', // SECRET_ACCESS_KEY
        region: 'us-east-2', // BUCKET_REGION
      });
      const params = {
        Bucket: 'purpleappfood123', //BUCKET_NAME
        Key: filePath,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

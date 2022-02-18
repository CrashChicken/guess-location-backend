import {
  Bucket,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  private getClient() {
    return new S3Client({
      region: this.configService.get<string>('aws.bucketRegion'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKey'),
        secretAccessKey: this.configService.get<string>('aws.secretKey'),
      },
    });
  }

  uploadFile(key: string, extension: string) {
    const Key = key + '/original.' + extension;
    const contentType = 'image/' + extension;

    const client = this.getClient();

    return createPresignedPost(client, {
      Bucket: this.configService.get<string>('aws.bucketName'),
      Key,
      Expires: 300,
      Conditions: [
        { acl: 'public-read' },
        ['eq', '$Content-Type', contentType],
        ['content-length-range', 0, 800000],
      ],
      Fields: { acl: 'public-read' },
    });
  }

  deleteFile(key: string) {
    const client = this.getClient();

    const command = new DeleteObjectCommand({
      Bucket: this.configService.get<string>('aws.bucketName'),
      Key: key,
    });

    return client.send(command);
  }
}

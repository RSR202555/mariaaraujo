import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export class CloudinaryProvider {
  /**
   * Gera parâmetros de upload assinados para o cliente (direct upload)
   */
  static generateSignature(folder = 'maria-araujo/evaluations') {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    return {
      timestamp,
      folder,
      signature,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    };
  }

  /**
   * Upload direto via Server Side / Edge (quando necessário)
   */
  static async uploadFile(fileBase64: string, folder = 'maria-araujo/evaluations') {
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder,
      transformation: [
        { width: 1200, height: 1600, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      format: result.format,
      bytes: result.bytes,
    };
  }

  /**
   * Deleta um arquivo do Cloudinary pelo Public ID
   */
  static async deleteFile(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { CloudinaryProvider } from '@/providers/cloudinary.provider';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'maria-araujo/evaluations';

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const isCloudinaryConfigured = Boolean(
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET
    );

    // Converter arquivo para Base64 para envio ao Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    if (!isCloudinaryConfigured) {
      console.log('[Cloudinary Mock Upload] Arquivo recebido:', file.name, file.size, 'bytes');

      return NextResponse.json({
        success: true,
        mode: 'simulation',
        publicId: `mock_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`,
        secureUrl: base64Data, // Retorna Data URL em dev para preview imediato
        format: file.type.split('/')[1] || 'png',
        bytes: file.size,
      });
    }

    const uploadResult = await CloudinaryProvider.uploadFile(base64Data, folder);

    return NextResponse.json({
      success: true,
      mode: 'live',
      ...uploadResult,
    });
  } catch (error: any) {
    console.error('[Cloudinary Upload Route Error]:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar upload de imagem no Cloudinary', details: error.message },
      { status: 500 }
    );
  }
}

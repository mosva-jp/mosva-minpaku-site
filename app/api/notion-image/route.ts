import { NextRequest, NextResponse } from 'next/server';

/**
 * Notion画像プロキシAPI
 *
 * Notionの画像URLは数時間で期限切れになるため、
 * このAPIで画像を中継してキャッシュすることで：
 * - 画像が消える問題を防ぐ
 * - CDNキャッシュが効くようになる
 * - 表示速度が改善される
 */
export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}

import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  amazonUrl?: string;
  imageUrl?: string;
  description?: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not defined');
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const products: Product[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties.名前?.title?.[0]?.plain_text || properties.Name?.title?.[0]?.plain_text || '商品名',
        category: properties.カテゴリー?.select?.name || properties.Category?.select?.name || properties.カテゴリ?.select?.name || '未分類',
        price: properties.価格?.number || properties.Price?.number || undefined,
        amazonUrl: properties.購入リンク?.url || properties.AmazonURL?.url || properties.URL?.url || properties.リンク?.url || undefined,
        imageUrl: properties.画像?.files?.[0]?.file?.url || properties.画像?.files?.[0]?.external?.url || undefined,
        description: properties.説明?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || undefined,
      };
    });

    return products;
  } catch (error) {
    console.error('Error fetching products from Notion:', error);
    return [];
  }
}

// カテゴリーの表示順序（この順番でボタンが並びます）
const CATEGORY_ORDER = [
  'キッチン',
  'トイレ',
  'バス',
  'ランドリ',
  '日用品',
  '家具・家電',
  '掃除・リネン',
  'ステッカー',
  'その他',
];

export function getCategories(products: Product[]): string[] {
  const categories = Array.from(new Set(products.map(p => p.category)));

  // CATEGORY_ORDERに従ってソート。リストにないカテゴリーは末尾に追加
  return categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    // 両方ともリストにある場合
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // 片方だけリストにある場合、リストにある方を前に
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    // 両方ともリストにない場合はアルファベット順
    return a.localeCompare(b);
  });
}

export function filterProducts(products: Product[], category?: string, searchQuery?: string): Product[] {
  let filtered = products;

  if (category && category !== '全て') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
  }

  return filtered;
}

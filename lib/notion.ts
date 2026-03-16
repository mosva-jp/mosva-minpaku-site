import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  amazonUrl?: string;
  imageUrl?: string;
  description?: string;
  sortOrder?: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;

      // Notion内部の画像URL（一時URL）を取得
      const notionFileUrl = properties.画像?.files?.[0]?.file?.url;
      // 外部リンクの画像URL（期限切れしない）
      const externalUrl = properties.画像?.files?.[0]?.external?.url;

      // 画像URLを決定
      let imageUrl: string | undefined;
      if (notionFileUrl) {
        // Notionの一時URLはプロキシAPI経由にする（期限切れ対策）
        imageUrl = `/api/notion-image?url=${encodeURIComponent(notionFileUrl)}`;
      } else if (externalUrl) {
        // 外部URLはそのまま使う（期限切れしないため）
        imageUrl = externalUrl;
      }

      return {
        id: page.id,
        name: properties.商品名?.title?.[0]?.plain_text || '商品名',
        category: properties.カテゴリー?.select?.name || '未分類',
        price: properties.通常価格?.number || undefined,
        amazonUrl: properties.購入リンク?.url || undefined,
        imageUrl,
        description: properties.説明?.rich_text?.[0]?.plain_text || undefined,
        sortOrder: properties.おすすめ順?.number || undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export function getCategories(products: Product[]): string[] {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  
  const order = ['キッチン', 'トイレ', 'バス', 'ランドリー', '害虫対策', '寝具・リネン', '家電', '家具', 'ステッカー', 'その他'];
  
  return categories.sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });
}

export function filterProducts(
  products: Product[],
  category: string,
  searchQuery: string
): Product[] {
  return products.filter((product) => {
    const matchesCategory = category === '全て' || product.category === category;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });
}

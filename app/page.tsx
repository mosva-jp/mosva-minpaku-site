import { getProducts, getCategories } from '@/lib/notion';
import ProductList from './components/ProductList';
import styles from './page.module.css';

export const revalidate = 3600; // 1時間ごとに再検証

export default async function Home() {
  const products = await getProducts();
  const categories = getCategories(products);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>民泊備品・消耗品まとめ</h1>
          <p className={styles.subtitle}>
            民泊運営に必要な備品・消耗品をカテゴリ別にご紹介
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <ProductList products={products} categories={categories} />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 MOSVA. All rights reserved.</p>
        <p className={styles.disclaimer}>
          ※ 商品リンクにはアフィリエイトリンクが含まれています
        </p>
      </footer>
    </div>
  );
}

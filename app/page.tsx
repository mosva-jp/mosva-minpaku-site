import ProductList from './components/ProductList';
import ScrollHeader from './components/ScrollHeader';
import Header from './components/Header';
import ShareButtons from './components/ShareButtons';
import ScrollToTop from './components/ScrollToTop';
import BottomNavigation from './components/BottomNavigation';
import { getProducts, getCategories } from '@/lib/notion';
import styles from './page.module.css';

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();
  const categories = getCategories(products);

  return (
    <div className={styles.container}>
      <ScrollHeader />
      <ScrollToTop />
      <BottomNavigation />
      <header className={styles.header} id="header">
        <Header />
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>民泊備品・消耗品まとめ</h1>
          <p className={styles.heroSubtitle}>必要な備品がすぐ見つかる</p>
        </div>
        <ProductList products={products} categories={categories} />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <a href="https://mosva.jp/" target="_blank" rel="noopener noreferrer" className={styles.footerLogo}>
            <span className={styles.footerLogoText}>MOSVA</span>
          </a>
          
          <div className={styles.shareSection}>
            <h3>このサイトを共有</h3>
            <ShareButtons />
          </div>
          
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <h3>サービス</h3>
              <a href="https://mosva.jp/autominpaku" target="_blank" rel="noopener noreferrer">民泊運営代行</a>
              <a href="https://mosva.jp/omotenasi-chat" target="_blank" rel="noopener noreferrer">チャット代行</a>
              <a href="https://mosva.jp/mosvaclean" target="_blank" rel="noopener noreferrer">民泊清掃</a>
            </div>
            
            <div className={styles.footerSection}>
              <h3>&nbsp;</h3>
              <a href="https://mosva.jp/minpaku-kaketsuke" target="_blank" rel="noopener noreferrer">駆けつけ代行</a>
              <a href="https://mosva.jp/design" target="_blank" rel="noopener noreferrer">民泊空間デザイン</a>
              <a href="https://mosva.jp/minpaku-kanri" target="_blank" rel="noopener noreferrer">住宅宿泊管理</a>
            </div>
          </div>
          
          <p className={styles.copyright}>© 2026 株式会社MOSVA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import ProductList from './components/ProductList';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="https://mosva.jp/" target="_blank" rel="noopener noreferrer" className={styles.logo}>
            <img src="/mosva-logo.png" alt="MOSVA" className={styles.logoImage} />
          </a>
          <h1 className={styles.title}>民泊備品・消耗品まとめ</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>必要な備品がすぐ見つかる</h2>
          <p className={styles.heroSubtitle}>民泊運営に必要な備品・消耗品をカテゴリ別にご紹介</p>
        </div>
        <ProductList />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <a href="https://mosva.jp/" target="_blank" rel="noopener noreferrer">
              <img src="/mosva-logo.png" alt="MOSVA" className={styles.footerLogo} />
            </a>
            <p className={styles.footerDescription}>コンシェルジュ付き民泊運営会社</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerSection}>
              <h3>会社情報</h3>
              <a href="https://mosva.jp/" target="_blank" rel="noopener noreferrer">コーポレートサイト</a>
            </div>
            
            <div className={styles.footerSection}>
              <h3>サービス</h3>
              <p>民泊運営代行</p>
              <p>清掃サービス</p>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© 2026 株式会社MOSVA. All rights reserved.</p>
          <p className={styles.disclaimer}>
            ※ 商品価格・在庫状況は変動する場合があります。最新情報はリンク先でご確認ください。
          </p>
        </div>
      </footer>
    </div>
  );
}

import styles from './ProductCardSkeleton.module.css';

export default function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.content}>
        <div className={styles.categorySkeleton}></div>
        <div className={styles.nameSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
        <div className={styles.priceSkeleton}></div>
        <div className={styles.buttonSkeleton}></div>
      </div>
    </div>
  );
}

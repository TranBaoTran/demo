import { useState } from "react"
import styles from './ProductItem.module.css';

const ProductImage = ({src}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={styles.LoadContainer}>
            {loading && !error && (
                <div className={styles.loader}></div>
            )}

            <img src={src} 
                className={styles.ItemImg}
                style={{ opacity: loading ? 0 : 1 }}
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => {setError(true); setLoading(false)}}></img>
 
            {error && (
                <span>Image failed to load.</span>
            )}
        </div>
    )
}

export default ProductImage
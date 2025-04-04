import React from 'react';
import styles from './ProductItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar} from '@fortawesome/free-regular-svg-icons'
import { FaBookmark } from "react-icons/fa";
import { capitalizeFirstLetter } from '../../utils/util';

const ProductItem = ({product}) => {
  const averageRating = product.rating;
  const formattedRating = averageRating.toFixed(1);
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return(
    <>
      <div className={styles.ItemContainer}>
        <div className={styles.DiscountContainer}>
          <FaBookmark className={styles.BookmarkIcon}/>
          <span className={styles.DiscountPercent}>-{Math.ceil(product.discountPercentage * 10) / 10}%</span>
        </div>
        <img src={product.images[0]} className={styles.ItemImg}/>
        <p className={styles.ItemName}>{product.title}</p>
        <p className={styles.ItemTag}>
          {
            product.tags.map(tag => 
              capitalizeFirstLetter(tag) + " "
            )
          }
        </p>
        <div className={styles.RatingContainer}>
          {[...Array(fullStars).keys()].map(key => 
            <FontAwesomeIcon key={key} icon={faStar} className={styles.StarIcon} />
          )}
          {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className={styles.StarIcon} /> }
          {[...Array(emptyStars).keys()].map(key => 
            <FontAwesomeIcon key={key} icon={faRegStar} className={styles.StarIcon} />
          )}
          <p className={styles.ItemRate}>
            {formattedRating} ({product.reviews.length})
          </p>
        </div>
        <p className={styles.ItemPrice}><span className={styles.OriginalPrice}>{product.price}$</span> {Math.ceil((product.price*(100-product.discountPercentage)/100) * 100) / 100}$</p>  
        <button className={styles.ItemButton}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.CartIcon}/>
          Add to cart
        </button>
      </div>
    </>
  )
};

export default ProductItem;

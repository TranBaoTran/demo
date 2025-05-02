import { useCallback, useState, useRef } from 'react';
import styles from './DropDown.module.css';
import productApi from '../../api/productApi';
import productItemStyles from '../ProductItem/ProductItem.module.css';
import { useNavigate } from 'react-router-dom';
import clickOutSide from './ClickOutside';

const SearchDropDown = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    clickOutSide(dropdownRef, () => setIsOpen(false));

    const debounce = useCallback((func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func(...args), delay);
        };
    }, []);

    const fetchData = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResult([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await productApi.searchProduct(query);
            setSearchResult(res?.data.products || []);
        }catch(error){
            setError(error);
            setSearchResult([]);
            console.log('Error searching products: ',error);
        }finally{
            setIsLoading(false);
        }

    }, []);

    const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

    const handleInputChange = (event) => {
        const newSearchInput = event.target.value;
        setSearchInput(newSearchInput);
        debouncedFetchData(newSearchInput);
    };

    const handleItemClick = useCallback((productID) => {
        setSearchInput('');
        setSearchResult([]);
        navigate('/product/detail/' + productID);
    }, [navigate])

    return (
        <div className={styles.Dropdown}>
            <div className={styles.SearchBarContainer}>
                    <input type='text'
                           className={styles.SearchBarInput} 
                           placeholder='Search'
                           value={searchInput}
                           onChange={handleInputChange}
                           onClick={() => setIsOpen(true)}></input>
            </div>
            {isOpen && (<ul ref={dropdownRef} className={styles.SubMenu}>
                {error && (<li className={styles.SubMenuSearch}>Error: {error}</li>)}
                {isLoading && (<li className={styles.SubMenuSearch}>Searching...</li>)}
                {searchResult.length > 0 && !isLoading && (
                    searchResult.map(product => (
                        <li key={product.id} className={styles.SubMenuSearch} onClick={() => handleItemClick(product.id)}>
                            <img className={styles.SearchImage} src={product.thumbnail}></img>
                            <div style={{height: 'fit-content', gap: '5px'}}>
                                <p className={productItemStyles.ItemName}>{product.title}</p>
                                <p className={productItemStyles.ItemPrice} style={{fontSize: '16px'}}><span className={productItemStyles.OriginalPrice}>{product.price}$</span> {Math.ceil((product.price*(100-product.discountPercentage)/100) * 100) / 100}$</p>
                                <p className={productItemStyles.ItemPrice} style={{fontSize: '16px'}}>Quantity: {product.stock}</p>  
                            </div>
                        </li>
                    ))
                )}
                {!isLoading && !error && searchInput && searchResult.length === 0 && (
                    <li className={styles.SubMenuSearch}>No products found for "{searchInput}"</li>
                )}
            </ul>)}
        </div>
    )
}

export default SearchDropDown
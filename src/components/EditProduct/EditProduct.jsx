import React, { useEffect, useState } from 'react';
import styles from './EditProduct.module.css';
import { FaSave } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import headbarstyles from '../AdminProducts/AdminProducts.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import productApi from '../../api/productApi';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: 0.01,
    discount: 0.00,
    brand: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [finPrice, setFinPrice] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getById(id);
        setProduct(response.data);   
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id])

  useEffect(() => {
    if(product){
      setFormState({
        name: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        discount: product.discountPercentage?.toString() || '',
        brand: product.brand || '',
        category: product.category || ''
      });
      setSelectedThumbnail(product.thumbnail);
      const formattedImages = (product.images || []).map((url, index) => ({
        id: `img-${index}`,
        url
      }));
      setImageList(formattedImages);
    }
  }, [product])

  useEffect(() => {
    setFinPrice(formState.price - formState.price*(formState.discount/100))
  }, [formState.price, formState.discount])

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Product name is required';
    if (!formState.description.trim()) newErrors.description = 'Product description is required';
    if (!formState.price || formState.price <= 0) newErrors.price = 'Valid price is required';
    if (isNaN(formState.discount) || formState.discount < 0 || formState.discount > 100) newErrors.discount = '0<=Discount<100';
    if (!formState.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formState.category) newErrors.category = 'Category is required';
    if (imageList.length === 0) newErrors.images = 'At least one image is required';
    if (!selectedThumbnail) newErrors.thumbnail = 'Thumbnail must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.getAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedThumbnail(URL.createObjectURL(file)); // for preview only
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageList((prev) => [...prev, { id: uuidv4(), url: URL.createObjectURL(file), file }]);
    }
  }

  const deleteImage = (id) => {
    setImageList((prev) => prev.filter((img) => img.id != id))
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const productPayload = {
      title: formState.name,
      description: formState.description,
      price: parseFloat(formState.price),
      discountPercentage: parseFloat(formState.discount),
      brand: formState.brand,
      category: formState.category,
      thumbnail: selectedThumbnail,
      images: imageList.map((img) => img.url)
    };

    if(id){
      try {
        const response = await productApi.editProduct(productPayload, id);
        alert('Edit product successful');
        navigate('/admin/products');
      } catch (error) {
        console.error('Error edit products:', error);
      }
    }else{
      try {
        const response = await productApi.addProduct(productPayload);
        alert('Add product successful');
        navigate('/admin/products');
      } catch (error) {
        console.error('Error add products:', error);
      }
    }  
  };


  return(
    <div>
     <div className={headbarstyles.Headbar}>
        <p className={headbarstyles.HeadbarTitle}>{id ? "Edit Product" : "Add New Product"}</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button className={headbarstyles.HeadbarButton} onClick={handleSubmit}> 
          <FaSave />
            Save
          </button>
          <button className={headbarstyles.HeadbarCancelButton} onClick={() => {navigate('/admin/products')}}>
          <TbCancel />
            Cancel
          </button>
        </div>  
      </div>
      <div className={headbarstyles.ProductContainer}>
        <div className={styles.EditProduct}>
        <div style={{display: 'flex',
              flexDirection: 'column',
              gap: '30px'}}>
        <div className={styles.DivisionContainer}>
          <p>Thumbnail</p>
          <div className={styles.ThumbnailContainer}>
            <label htmlFor="thumbnailInput" className={styles.ThumbnailLabel}>
              {selectedThumbnail ? (
                <img src={selectedThumbnail} alt="Selected Preview" className={styles.Thumbnail} />
              ) : (
                <img src="/edit.svg" alt="Upload File" className={styles.Thumbnail} />
              )}
            </label>
            <input
              type="file"
              id="thumbnailInput"
              accept="image/*"
              onChange={handleThumbnailChange}
              style={{ display: 'none' }}
            />
          </div>
          {errors.thumbnail && (
            <FormHelperText sx={{ color: '#ff0000 !important', ml: 0 }}>
              {errors.thumbnail}
            </FormHelperText>
          )}

          <p>Images</p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            minWidth: '320px',
            maxWidth: '320px',
            flexWrap: 'wrap'
          }}>
            {imageList.map((image) => (
              <div className={styles.ThumbnailContainer} key={image.id}>
                <label htmlFor={`fileInput-${image.id}`} className={styles.ThumbnailLabel}>
                  <img src={image.url} alt="Uploaded" className={styles.SmallImage} />
                </label>
                <input
                  type="file"
                  id={`fileInput-${image.id}`}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <span className={styles.RemoveDot} onClick={() => deleteImage(image.id)}>-</span>
              </div>
            ))}

            <div className={styles.ThumbnailContainer}>
              <label htmlFor="newFileInput" className={styles.ThumbnailLabel}>
                <img src="/edit.svg" alt="Upload" className={styles.SmallImage} />
              </label>
              <input
                type="file"
                id="newFileInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {errors.images && (
            <FormHelperText sx={{ color: '#ff0000 !important', ml: 0 }}>
              {errors.images}
            </FormHelperText>
          )}
        </div>
        {id && 
        <div className={styles.DivisionContainer}>
          <p>Value</p>
          <div className={styles.ValueBox}>
            <span className={styles.ValueTitle}>ID</span><span>{id}</span>
          </div>
          <div className={styles.ValueBox}>
            <span className={styles.ValueTitle}>Stock</span><span>{product?.stock}</span>
          </div>
          <div className={styles.ValueBox}>
            <span className={styles.ValueTitle}>Status</span><span>{product?.availabilityStatus}</span>
          </div>
        </div>}
        </div>
          
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}
          >
            <Stack className={styles.DivisionContainer} style={{ minWidth: '500px' }}>
              <p>Display</p>
              <TextField
                required
                id="name"
                label="Product Name"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                sx={{
                  input: { color: 'black' },
                  label: { color: '#D4AF37', fontSize: '14px' }
                }}
              />
              <TextField
                required
                id="description"
                label="Product Description"
                multiline
                rows={4}
                value={formState.description}
                onChange={(e) => setFormState({...formState, description: e.target.value})}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                sx={{
                  input: { color: 'black'},
                  label: { color: '#D4AF37', fontSize: '14px' }
                }}
              />
              </Stack>

              <Stack className={styles.DivisionContainer} style={{ minWidth: '500px' }}>
              <p>Price</p>
              <FormControl fullWidth>
                <InputLabel htmlFor="finalPrice" sx={{ color: '#D4AF37', fontSize: '14px' }}>Price After Sale</InputLabel>
                <OutlinedInput
                  disabled
                  id="finalPrice"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Final Price"
                  type='number'
                  value={finPrice}
                />
              </FormControl>
              
              <div style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
              <FormControl error={!!errors.price}>
                <InputLabel htmlFor="price" sx={{ color: '#D4AF37', fontSize: '14px' }}>Selling Price</InputLabel>
                <OutlinedInput
                  id="price"
                  type='number'
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Price"
                  value={formState.price}
                  onChange={(e) => setFormState({...formState, price: e.target.value})}
                />
                {errors.price && (
                  <FormHelperText>{errors.price}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.discount}>
                <InputLabel htmlFor="discount" sx={{ color: '#D4AF37', fontSize: '14px' }}>Discount Percent</InputLabel>
                <OutlinedInput
                  id="discount"
                  type='number'
                  startAdornment={<InputAdornment position="start">%</InputAdornment>}
                  label="Price"
                  value={formState.discount}
                  onChange={(e) => setFormState({...formState, discount: e.target.value})}
                  error={!!errors.discount}
                  helperText={errors.discount}
                />
                {errors.discount && (
                  <FormHelperText>{errors.discount}</FormHelperText>
                )}
              </FormControl>
              </div>
              </Stack>

              <Stack className={styles.DivisionContainer} style={{ minWidth: '500px' }}>
                <p>Inventory</p>
                <TextField
                  id="brand"
                  label="Product Brand"
                  value={formState.brand}
                  onChange={(e) => setFormState({...formState, brand: e.target.value})}
                  error={!!errors.brand}
                  helperText={errors.brand}
                  fullWidth
                  sx={{
                    input: { color: 'black'},
                    label: { color: '#D4AF37', fontSize: '14px' }
                  }}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={formState.category}
                  onChange={(e) => setFormState({...formState, category: e.target.value})}
                  error={!!errors.category}
                  helperText={errors.category}
                  sx={{
                    input: { color: 'black'},
                    label: { color: '#D4AF37', fontSize: '14px' }
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.slug}>{category.name}</MenuItem>
                  ))}
                </TextField>
              </Stack>
          </Box>
          
                
        </div>
      </div>
    </div>
  )
};

export default EditProduct;

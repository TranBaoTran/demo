import React, { useEffect, useState } from 'react';
import styles from './AdminCategories.module.css';
import { FaPlusCircle } from "react-icons/fa";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { capitalizeFirstLetter } from '../../utils/util';
import productApi from '../../api/productApi';

const STORAGE_KEY = 'admin_categories_data';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Category Name' },
    { id: 'productCount', numeric: true, disablePadding: false, label: 'Product Count' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = ({ numSelected, onDeleteSelected }) => {
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Categories
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const AdminCategories = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const storedData = localStorage.getItem(STORAGE_KEY);
      
      if (storedData) {
        setCategories(JSON.parse(storedData));
      }
      else {
        const apiData = await productApi.getAllCategoriesWithCount();
        setCategories(apiData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apiData));
      }
    } 
    catch (error) {
      console.error('Error loading categories:', error);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = (newCategory) => {
    const formattedCategory = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      name: capitalizeFirstLetter(newCategory.name),
      productCount: 0
    };
    
    const updatedCategories = [...categories, formattedCategory];
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categories.map(cat => 
      cat.id === currentCategory.id ? { 
        ...cat,
        name: capitalizeFirstLetter(updatedCategory.name),
        id: updatedCategory.name.toLowerCase().replace(/\s+/g, '-')
      } : cat
    );
    
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  };;

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  };

  const deleteSelectedCategories = () => {
    const updatedCategories = categories.filter(cat => !selected.includes(cat.id));
    setCategories(updatedCategories);
    setSelected([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } 
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } 
    else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } 
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  if (loading) 
  {
    return <div className={styles.Loading}>Loading categories...</div>;
  }

  return (
    <div className={styles.AdminCategories}>
      <div className={styles.Headbar}>
        <p className={styles.HeadbarTitle}>Categories</p>
        <button 
          className={styles.HeadbarButton} 
          onClick={() => {
            setCurrentCategory(null);
            setOpenModal(true);
          }}
        >
          <FaPlusCircle />
          Add Category
        </button>
      </div>

      <div className={styles.CategoryContainer}>
        <Box sx={{ width: '80%', paddingTop: '50px', paddingBottom: '50px' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
              numSelected={selected.length} 
              onDeleteSelected={deleteSelectedCategories} 
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={categories.length}
                />
                <TableBody>
                  {categories
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.productCount}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentCategory(row);
                                setOpenModal(true);
                              }}
                              aria-label="edit"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCategory(row.id);
                              }}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </div>

      {openModal && (
        <div className={styles.Modal}>
          <div className={styles.ModalContent}>
            <h2>{currentCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');

              if (currentCategory) {
                updateCategory({ 
                  ...currentCategory,
                  name 
                });
              }
              else {
                createCategory({ name });
              }
              
              setOpenModal(false);
            }}>
              <div className={styles.FormGroup}>
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={currentCategory?.name || ''}
                  required
                />
              </div>
              <div className={styles.ModalActions}>
                <button 
                  type="button" 
                  onClick={() => setOpenModal(false)}
                  className={styles.CancelButton}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.SubmitButton}>
                  {currentCategory ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
import React, { useEffect, useState } from 'react';
import styles from './AdminProducts.module.css';
import { FaPlusCircle } from "react-icons/fa";
import productApi from '../../api/productApi';
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
import { useNavigate } from 'react-router-dom';

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
    { id: 'title', numeric: false, disablePadding: true, label: 'Product' },
    { id: 'brand', numeric: false, disablePadding: false, label: 'Brand' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price ($)' },
    { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
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

const EnhancedTableToolbar = ({ numSelected, selected }) => {
  const handleDelete = () => {
    if(selected){
      try{
        selected.forEach(id => {
          deleteProduct(id);
        })
        alert('Delte Successfully');
      }catch (error) {
        console.error(`Error delete ${id}:`, error);
      }
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await productApi.deleteProduct(id);
    } catch (error) {
      console.error('Error delete products:', error);
    }
  }

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Products
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleDelete}>
          <IconButton>
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

const AdminProducts = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`);
  };

  const createNewProduct = () => {
    navigate('/admin/addproduct');
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll(1, 194, '');
        setProducts(response?.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

    return (
      <div>
        <div className={styles.Headbar}>
          <p className={styles.HeadbarTitle}>Products</p>
          <button className={styles.HeadbarButton} onClick={createNewProduct}>
            <FaPlusCircle />
            Create Product
          </button>
        </div>
        <div className={styles.ProductContainer}>
          <Box sx={{ width: '80%' , paddingTop: '50px', paddingBottom: '50px'}}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} selected={selected}/>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={(event) => {
                      if (event.target.checked) {
                        const newSelecteds = products.map((n) => n.id);
                        setSelected(newSelecteds);
                        return;
                      }
                      setSelected([]);
                    }}
                    onRequestSort={handleRequestSort}
                    rowCount={products.length}
                  />
                  <TableBody>
                    {products
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
                              {row.title}
                            </TableCell>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{capitalizeFirstLetter(row.category)}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => handleEdit(row.id)} aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />}
              label="Dense padding"
            />
          </Box>
        </div>
      </div>
    )
};

export default AdminProducts;

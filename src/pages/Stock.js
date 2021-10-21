import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import EuroIcon from "@mui/icons-material/Euro";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { stockActions } from "../redux/actions";
import { addProductToStock, removeProductFromStock } from "../axios";

const columns = [
  "No",
  "Id",
  "Store Name",
  "Ean",
  "Price",
  "Item Count",
  "Description",
  "",
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Stock = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [productValues, setProductValues] = useState({
    id: "",
    ean: "",
    price: "",
    itemCount: "",
  });

  const [message, setMessage] = useState({
    severity: "",
    text: "",
  });

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { stockList } = useSelector((state) => state.stock);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();

  const { getProductsFromStock } = bindActionCreators(stockActions, dispatch);

  useEffect(() => {
    getProductsFromStock();
  }, [page, rowsPerPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProductToStock(productValues);

    getProductsFromStock();

    setMessage({
      severity: "success",
      text: "Product added to stock.",
    });

    setOpen(true);

    setProductValues({
      id: "",
      ean: "",
      price: "",
      itemCount: "",
    });
  };

  const removeProduct = async (id) => {
    const url = `https://bolbec.herokuapp.com/bolbol/stockList/${id}/`;

    await removeProductFromStock(url);

    getProductsFromStock();

    setMessage({
      severity: "error",
      text: "Product removed from stock.",
    });

    setOpen(true);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: 3,
        flexWrap: "wrap",
      }}
    >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.text}
        </Alert>
      </Snackbar>

      <Paper
        sx={{
          marginBottom: 2,
        }}
      >
        <TableContainer
          sx={{
            minHeight: 440,
            maxWidth: 1200,
            overflow: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} align="center">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="center">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.store_name}</TableCell>
                      <TableCell align="center">{row.ean}</TableCell>
                      <TableCell align="center">{row.price} €</TableCell>
                      <TableCell align="center">{row.item_count}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="medium"
                          onClick={() => removeProduct(row.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={stockList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box
        component="form"
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between", width: 500 }}
        >
          <TextField
            variant="outlined"
            type="number"
            required
            fullWidth
            label="Id"
            color="secondary"
            sx={{ marginBottom: 2, width: 240 }}
            value={productValues.id}
            onChange={(e) =>
              setProductValues({ ...productValues, id: e.target.value })
            }
          />

          <TextField
            variant="outlined"
            type="number"
            required
            fullWidth
            label="Ean"
            color="secondary"
            sx={{ marginBottom: 2, width: 240 }}
            value={productValues.ean}
            onChange={(e) =>
              setProductValues({ ...productValues, ean: e.target.value })
            }
          />
        </Box>

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Price"
          color="secondary"
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: <EuroIcon />,
          }}
          value={productValues.price}
          onChange={(e) =>
            setProductValues({ ...productValues, price: e.target.value })
          }
        />

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Item Count"
          color="secondary"
          sx={{ marginBottom: 2 }}
          value={productValues.itemCount}
          onChange={(e) =>
            setProductValues({ ...productValues, itemCount: e.target.value })
          }
        />

        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ marginBottom: 2 }}
          type="submit"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Add to Stock
        </Button>
      </Box>
    </Paper>
  );
};

export default Stock;

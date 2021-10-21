import React, { useState } from "react";
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
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { stockActions } from "../redux/actions";

const columns = [
  "No",
  "Id",
  "Store Name",
  "Ean",
  "Price",
  "Item Count",
  "Description",
];

const rows = [
  {
    id: 1,
    ean: "8719179782861",
    description: "zwart, mt 42-44",
    store_name: "Kruidvat Ladder Resist Mat 15 Den Pantyasdasdasdasdasd",
    price: 2.9925,
    item_count: 2,
    last_updated: "2021-10-20T15:27:35.154532Z",
    created_date: "2021-10-20T15:27:35.154565Z",
  },
];

const Stock = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();

  /* const { getProductsFromStock } = bindActionCreators(stockActions, dispatch);*/
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 3,
        flexWrap: "wrap",
      }}
    >
      <Paper>
        <TableContainer
          sx={{
            minHeight: 440,
            marginBottom: 2,
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
              {rows
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
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.item_count}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
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
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Store Name"
          color="secondary"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Ean"
          color="secondary"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Price"
          color="secondary"
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: <EuroIcon>$</EuroIcon>,
          }}
        />

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Item Count"
          color="secondary"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          variant="outlined"
          label="Description"
          color="secondary"
          sx={{ marginBottom: 2 }}
          fullWidth
          inputProps={{ max: 20 }}
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

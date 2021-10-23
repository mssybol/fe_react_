import React from "react";
import {
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StockListTable = ({
  tableRef,
  columns,
  page,
  rowsPerPage,
  removeProduct,
  stockList,
}) => {
  return (
    <TableContainer
      sx={{
        height: 567,
        width: 900,
        overflow: "auto",
      }}
      ref={tableRef}
    >
      <Table stickyHeader size="small">
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
          {stockList.map((row, index) => {
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
  );
};

export default StockListTable;

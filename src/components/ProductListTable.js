import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ProductListTable = ({
  tableRef,
  headerRows,
  products,
  page,
  rowsPerPage,
  handleOpen,
}) => {
  return (
    <div>
      <TableContainer
        sx={{ maxHeight: "72vh", scrollBehavior: "smooth" }}
        ref={tableRef}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headerRows.map((item) => (
                <TableCell align="center" key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((row, index) => (
              <TableRow key={row.id} tabIndex={-1}>
                <TableCell align="center">
                  <IconButton href={row.url} target="_blank">
                    <LinkIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => handleOpen(row.image)}
                  sx={{ cursor: "pointer" }}
                >
                  <img src={row.image} height="70" alt="" />
                </TableCell>
                <TableCell align="center">{row.ean}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.subtitle}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.item_count}</TableCell>
                <TableCell align="center">{`${row.price} ${row.priceCurrency}`}</TableCell>
                <TableCell align="center">{row.mpn}</TableCell>
                <TableCell align="center">{row.sku}</TableCell>
                <TableCell align="center">{row.ratingValue}</TableCell>
                <TableCell align="center">{row.reviewCount}</TableCell>
                <TableCell align="center">{row.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductListTable;

import React, { createRef, useState } from "react";
import {
  Modal,
  Box,
  TablePagination,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productActions } from "../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const DataTable = () => {
  const { products, nextUrl, previousUrl, totalNumberOfProducts } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const tableRef = createRef();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleOpen = (urlProps) => {
    setOpen(true);
    setUrl(urlProps);
  };

  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { fetchProducts } = bindActionCreators(productActions, dispatch);

  const headerRows = [
    "Url",
    "No",
    "Id",
    "Image",
    "Ean",
    "Brand",
    "Title",
    "Subtitle",
    "Description",
    "Price",
    "Mpn",
    "Sku",
    "RatingValue",
    "ReviewCount",
    "Seller",
  ];

  const leftIconHandler = () => {
    setPage(page - 1);
    fetchProducts(previousUrl);
    tableRef.current.scrollTop = 0;
  };

  const rightIconHandler = () => {
    setPage(page + 1);
    fetchProducts(nextUrl);
    tableRef.current.scrollTop = 0;
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer
        sx={{ maxHeight: "72vh", scrollBehavior: "smooth" }}
        ref={tableRef}
      >
        <Table stickyHeader>
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
                <TableCell align="center">{page * 25 + index + 1}</TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => handleOpen(row.image)}
                  sx={{ cursor: "pointer" }}
                >
                  <img src={row.image} height="80" alt="" />
                </TableCell>
                <TableCell align="center">{row.ean}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.subtitle}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
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

      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={totalNumberOfProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        backIconButtonProps={{
          onClick: leftIconHandler,
        }}
        nextIconButtonProps={{
          onClick: rightIconHandler,
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img src={url} height="400" alt="" />
        </Box>
      </Modal>
    </Paper>
  );
};

export default DataTable;

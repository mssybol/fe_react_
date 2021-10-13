import React, { useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
};

const DataTable = () => {
  const { products, nextUrl, previousUrl } = useSelector(
    (state) => state.products
  );

  const [page, setPage] = useState(0);

  const tableRef = React.createRef();

  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState("");

  const handleOpen = (urlProps) => {
    setOpen(true);
    setUrl(urlProps);
  };
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const { fetchProducts } = bindActionCreators(productActions, dispatch);

  const headerRows = [
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
                <TableCell align="center">{page * 25 + index + 1}</TableCell>
                <TableCell align="center">
                  <a href={row.url}> {row.id} </a>
                </TableCell>
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

      <Box
        component="div"
        sx={{ padding: 2, display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton
          color="secondary"
          onClick={leftIconHandler}
          disabled={previousUrl && page !== 0 ? false : true}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          color="secondary"
          onClick={rightIconHandler}
          disabled={nextUrl ? false : true}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img src={url} alt="" height="400" />
        </Box>
      </Modal>
    </Paper>
  );
};

export default DataTable;

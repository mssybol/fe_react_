import React, { createRef, useEffect, useState } from "react";
import {
  Modal,
  Box,
  TablePagination,
  Paper,
  LinearProgress,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productActions } from "../redux/actions";
import ProductListTable from "./ProductListTable";

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
  const { products, totalNumberOfProducts, currentCategory } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const tableRef = createRef();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const { fetchProducts } = bindActionCreators(productActions, dispatch);

  useEffect(() => {
    fetchProducts(currentCategory, rowsPerPage, page * rowsPerPage);
  }, [page, rowsPerPage, currentCategory]);

  const handleOpen = (urlProps) => {
    setOpen(true);
    setUrl(urlProps);
  };

  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    tableRef.current.scrollTop = 0;
  };

  const leftIconHandler = () => {
    setPage(page - 1);
    tableRef.current.scrollTop = 0;
  };

  const rightIconHandler = () => {
    setPage(page + 1);
    tableRef.current.scrollTop = 0;
  };

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
    "Item Count",
    "Price",
    "Mpn",
    "Sku",
    "Rating Value",
    "Review Count",
    "Seller",
  ];

  return (
    <React.Fragment>
      {products?.length ? (
        <React.Fragment>
          <Paper sx={{ overflow: "hidden" }}>
            <ProductListTable
              tableRef={tableRef}
              headerRows={headerRows}
              products={products}
              page={page}
              rowsPerPage={rowsPerPage}
              handleOpen={handleOpen}
            />

            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
            align="center"
            variant="h6"
            sx={{ marginBottom: 3 }}
            component="div"
          >
            Data's Loading...
          </Typography>
          <LinearProgress />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DataTable;

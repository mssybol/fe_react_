import React, { createRef, useEffect, useState } from "react";
import {
  Modal,
  Box,
  TablePagination,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productActions } from "../redux/actions";
import TableBodyComponent from "./TBody";
import TableHeaderComponent from "./THeader";

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
  const { products, totalNumberOfProducts } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const tableRef = createRef();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    fetchProducts(rowsPerPage, page * rowsPerPage);
  }, [page, rowsPerPage]);

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

  const leftIconHandler = () => {
    setPage(page - 1);
    tableRef.current.scrollTop = 0;
  };

  const rightIconHandler = () => {
    setPage(page + 1);
    tableRef.current.scrollTop = 0;
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      {products?.length ? (
        <>
          <TableContainer
            sx={{ maxHeight: "72vh", scrollBehavior: "smooth" }}
            ref={tableRef}
          >
            <Table stickyHeader>
              <TableHeaderComponent />
              <TableBodyComponent
                products={products}
                page={page}
                handleOpen={handleOpen}
                rowsPerPage={rowsPerPage}
              />
            </Table>
          </TableContainer>

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
        </>
      ) : null}
    </Paper>
  );
};

export default DataTable;

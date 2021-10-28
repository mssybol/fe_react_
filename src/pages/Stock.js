import React, { useEffect, useState, createRef } from "react";
import { Divider, Paper, TablePagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { stockActions } from "../redux/actions";
import { addProductToStock, removeProductFromStock } from "../axios";
import StockListTable from "../components/StockListTable";
import StockListForm from "../components/StockListForm";
import AlertComponent from "../components/Alert";

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

const Stock = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const tableRef = createRef();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { stockList, totalNumberOfStockList } = useSelector(
    (state) => state.stock
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const leftIconHandler = () => {
    setPage(page - 1);
    tableRef.current.scrollTop = 0;
  };

  const rightIconHandler = () => {
    setPage(page + 1);
    tableRef.current.scrollTop = 0;
  };

  const dispatch = useDispatch();

  const { getProductsFromStock } = bindActionCreators(stockActions, dispatch);

  useEffect(() => {
    getProductsFromStock(rowsPerPage, page * rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProductToStock(productValues);

    getProductsFromStock(rowsPerPage, page * rowsPerPage);

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
    const url = `http://185.237.253.254:8000/bolbol/stockList/${id}/`;

    await removeProductFromStock(url);

    getProductsFromStock(rowsPerPage, page * rowsPerPage);

    setMessage({
      severity: "error",
      text: "Product removed from stock.",
    });

    setOpen(true);
  };

  return (
    <>
      <Typography variant="h5" component="div">
        Stock List
      </Typography>{" "}
      <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: 1,
        }}
      >
        <AlertComponent
          open={open}
          handleClose={handleClose}
          message={message}
        />
        <Paper
          sx={{
            marginBottom: 2,
            marginRight: 2,
          }}
        >
          <StockListTable
            tableRef={tableRef}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            removeProduct={removeProduct}
            stockList={stockList}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalNumberOfStockList}
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
        </Paper>
        <StockListForm
          handleSubmit={handleSubmit}
          productValues={productValues}
          setProductValues={setProductValues}
        />
      </Paper>
    </>
  );
};

export default Stock;

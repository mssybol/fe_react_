import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, TablePagination, Box } from "@mui/material";

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

const DataTable = ({ products }) => {
  console.log(
    "🚀 ~ file: DataTable.js ~ line 24 ~ DataTable ~ products",
    products
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState("");

  const handleOpen = (urlProps) => {
    setOpen(true);
    setUrl(urlProps);
  };
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const objectKeys = Object.keys(products[0]);

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "72vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell> {/* duzenlenecek */}
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Ean</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Mpn</TableCell>
              <TableCell>Sku</TableCell>
              <TableCell>RatingValue</TableCell>
              <TableCell>ReviewCount</TableCell>
              <TableCell>Seller</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow key={row.id} role="checkbox" tabIndex={-1}>
                <TableCell>{index + 1}</TableCell> {/* duzenlenecek */}
                <TableCell>
                  <a href={row.url}> {row.id} </a>
                </TableCell>
                <TableCell onClick={() => handleOpen(row.image)}>
                  <img src={row.image} height="80" alt="" />
                </TableCell>
                <TableCell>{row.ean}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.subtitle}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{`${row.price}${row.priceCurrency}`}</TableCell>
                <TableCell>{row.mpn}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.ratingValue}</TableCell>
                <TableCell>{row.reviewCount}</TableCell>
                <TableCell>{row.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={products?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img src={url} alt="" height="400" />
        </Box>
      </Modal>
    </Paper>
  );
};

export default DataTable;

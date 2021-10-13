import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Modal, Box, IconButton } from "@mui/material";
import {  useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
  const { products } = useSelector((state) => state.products);
  

  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState("");

  const handleOpen = (urlProps) => {
    setOpen(true);
    setUrl(urlProps);
  };
  const handleClose = () => setOpen(false);

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

  const leftIconHandler = () => {};

  const rightIconHandler = () => {};

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "72vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headerRows.map((item) => (
                <TableCell component="tr" align="center" key={item}>
                  {item}
                </TableCell>
              ))}
              {/* <TableCell align="center">Id</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Ean</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Subtitle</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Mpn</TableCell>
              <TableCell align="center">Sku</TableCell>
              <TableCell align="center">RatingValue</TableCell>
              <TableCell align="center">ReviewCount</TableCell>
              <TableCell align="center">ReviewCount</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => (
              <TableRow key={row.id} tabIndex={-1}>
                <TableCell align="center">{index + 1}</TableCell>
                {/* duzenlenecek */}
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

            <TableRow>
              <TableCell sx={{ display: "flex" }}>
                <IconButton color="secondary" onClick={leftIconHandler}>
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton color="secondary" onClick={rightIconHandler}>
                  <ChevronRightIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img src={url} alt="" height="400" />
        </Box>
      </Modal>
    </Paper>
  );
};

export default DataTable;

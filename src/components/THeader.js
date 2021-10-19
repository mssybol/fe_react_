import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeaderComponent = () => {
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
    <TableHead>
      <TableRow>
        {headerRows.map((item) => (
          <TableCell align="center" key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaderComponent;

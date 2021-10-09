import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataTable = ({ products }) => {
  const objectKeys = Object.keys(products[0]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {objectKeys.map((item) => {
              if (item !== "price_history")
                return (
                  <TableCell align="center">
                    {item[0].toUpperCase() + item.substring(1)}
                  </TableCell>
                );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => {
            let filteredRow = Object.values(row);

            return (
              <TableRow key={row.id}>
                {filteredRow.map((item, i) => {
                  if (i === 0) return null;
                  if (typeof item === "number")
                    return (
                      <TableCell
                        align="center"
                        sx={{ maxWidth: 130, wordWrap: "break-word" }}
                      >
                        {item}
                      </TableCell>
                    );
                  else if (item === null)
                    return (
                      <TableCell
                        align="center"
                        sx={{ maxWidth: 130, wordWrap: "break-word" }}
                      >
                        -
                      </TableCell>
                    );
                  else if (item.startsWith("https"))
                    return (
                      <TableCell
                        align="center"
                        sx={{ maxWidth: 130, wordWrap: "break-word" }}
                      >
                        <img src={item} height="80" alt="" />
                      </TableCell>
                    );
                  else
                    return (
                      <TableCell align="center" sx={{ maxWidth: 130, wordWrap: "break-word" }}>
                        {item}
                      </TableCell>
                    );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

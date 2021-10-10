import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

const DataTable = ({ products }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const objectKeys = Object.keys(products[0]);

  console.log(products);

  return (
    <Paper sx={{ overflow: "hidden", maxWidth: "1395px" }}>
      <TableContainer sx={{ maxHeight: "72vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>

              {objectKeys.map((item) => {
                if (
                  item !== "price_history" &&
                  item !== "last_updated" &&
                  item !== "created_date"
                )
                  return (
                    <TableCell align="center" key={item}>
                      {item[0].toUpperCase() + item.substring(1)}
                    </TableCell>
                  );
                else return null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                let filteredRow = Object.values(row);

                return (
                  <TableRow key={row.id} role="checkbox" tabIndex={-1}>
                    <TableCell
                      align="center"
                      sx={{ wordWrap: "break-word", maxWidth: 100 }}
                    >
                      {index}
                    </TableCell>
                    {filteredRow.map((item, i) => {
                      if (i === 0 || i === 15 || i === 16) return null;
                      if (typeof item === "number")
                        return (
                          <TableCell
                            align="center"
                            sx={{ wordWrap: "break-word", maxWidth: 100 }}
                            key={i}
                          >
                            {item}
                          </TableCell>
                        );
                      else if (item === null)
                        return (
                          <TableCell
                            align="center"
                            sx={{ wordWrap: "break-word", maxWidth: 100 }}
                            key={i}
                          >
                            -
                          </TableCell>
                        );
                      else if (item.startsWith("https"))
                        return (
                          <TableCell
                            align="center"
                            sx={{ wordWrap: "break-word", maxWidth: 100 }}
                            key={i}
                          >
                            <img src={item} height="80" alt="" />
                          </TableCell>
                        );
                      else
                        return (
                          <TableCell
                            align="center"
                            sx={{ wordWrap: "break-word", maxWidth: 100 }}
                            key={i}
                          >
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
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={products?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;

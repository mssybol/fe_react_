import React, { useState } from "react";
import {
  Badge,
  Divider,
  Typography,
  Box,
  LinearProgress,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../components/DataTable";

const TableLayout = () => {
  const [filterValue, setFilterValue] = useState("");
  const { products, currentCategory, totalNumberOfProducts } = useSelector(
    (state) => state.products
  );

  const Search = (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Title..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );

  return (
    <>
      {currentCategory ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="div">
              {currentCategory}
              <Badge
                sx={{ marginLeft: 3 }}
                badgeContent={products?.length}
                max={products?.length}
                color="secondary"
              ></Badge>
            </Typography>

            {Search}
          </Box>

          <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
        </>
      ) : (
        <>
          {totalNumberOfProducts ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="div">
                  All products ({totalNumberOfProducts}) are showing
                </Typography>
                {Search}
              </Box>
              <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
            </>
          ) : (
            <>
              <Typography
                align="center"
                variant="h6"
                sx={{ marginBottom: 3 }}
                component="div"
              >
                Data's Loading...
              </Typography>
              <LinearProgress />
            </>
          )}
        </>
      )}

      <DataTable />
    </>
  );
};

export default TableLayout;

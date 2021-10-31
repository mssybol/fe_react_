import React, { useState } from "react";
import {
  Divider,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
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
      elevation={5}
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
    <React.Fragment>
      {currentCategory ? (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="div">
                {currentCategory}
              </Typography>
              <Stack sx={{ marginLeft: 2 }}>
                <Chip
                  sx={{ marginTop: 0.5 }}
                  label={products?.length}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Box>

            {Search}
          </Box>

          <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {totalNumberOfProducts ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : null}
        </React.Fragment>
      )}

      <DataTable />
    </React.Fragment>
  );
};

export default TableLayout;

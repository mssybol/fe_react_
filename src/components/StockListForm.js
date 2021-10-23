import React from "react";
import EuroIcon from "@mui/icons-material/Euro";
import { Button, TextField, Box, Typography } from "@mui/material";

const StockListForm = ({ handleSubmit, productValues, setProductValues }) => {
  return (
    <Box
      component="form"
      sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Typography variant="h4" component="div">
        Add To Stock
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 500,
          marginTop: 5,
        }}
      >
        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Id"
          color="secondary"
          sx={{ marginBottom: 2, width: 240 }}
          value={productValues.id}
          onChange={(e) =>
            setProductValues({ ...productValues, id: e.target.value })
          }
        />

        <TextField
          variant="outlined"
          type="number"
          required
          fullWidth
          label="Ean"
          color="secondary"
          sx={{ marginBottom: 2, width: 240 }}
          value={productValues.ean}
          onChange={(e) =>
            setProductValues({ ...productValues, ean: e.target.value })
          }
        />
      </Box>

      <TextField
        variant="outlined"
        type="number"
        required
        fullWidth
        label="Price"
        color="secondary"
        sx={{ marginBottom: 2 }}
        InputProps={{
          endAdornment: <EuroIcon />,
        }}
        value={productValues.price}
        onChange={(e) =>
          setProductValues({ ...productValues, price: e.target.value })
        }
      />

      <TextField
        variant="outlined"
        type="number"
        required
        fullWidth
        label="Item Count"
        color="secondary"
        sx={{ marginBottom: 2 }}
        value={productValues.itemCount}
        onChange={(e) =>
          setProductValues({ ...productValues, itemCount: e.target.value })
        }
      />

      <Button
        variant="contained"
        size="large"
        color="secondary"
        sx={{ marginBottom: 2 }}
        type="submit"
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Add
      </Button>
    </Box>
  );
};

export default StockListForm;

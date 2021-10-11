import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, LinearProgress } from "@mui/material";
import { bindActionCreators } from "redux";
import { productActions, userActions } from "../redux/actions";
import { purple } from "@mui/material/colors";
import DataTable from "../components/DataTable";
import colors from "../colors/index";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Home = () => {
  const { userInfo } = useSelector((state) => state.users);
  const { products, currentCategory } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const { userLogout } = bindActionCreators(userActions, dispatch);

  const { fetchProducts, selectCategory } = bindActionCreators(
    productActions,
    dispatch
  );

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchCompanyNames = () => {
    const sellerCompanies = [];
    for (let i = 0; i < products?.length; i++) {
      const product = products[i];

      if (!sellerCompanies.includes(product.seller))
        sellerCompanies.push(product.seller);
    }

    return sellerCompanies;
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {userInfo?.user.first_name} - {userInfo?.user.last_name}
            </Typography>

            <ColorButton variant="contained" onClick={userLogout}>
              Sign Out
            </ColorButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Typography
          variant="p"
          align="center"
          sx={{ marginTop: 3, marginBottom: 3, fontSize: 18 }}
        >
          {open ? (
            `Companies (${fetchCompanyNames().length})`
          ) : (
            <Badge
              color="secondary"
              badgeContent={fetchCompanyNames().length}
              showZero
            >
              <BusinessIcon />
            </Badge>
          )}
        </Typography>
        <Divider />
        <List>
          {fetchCompanyNames().map((text, i) => (
            <ListItem
              button
              key={text}
              sx={{
                backgroundColor: fetchCompanyNames().find(
                  (item) => item === currentCategory
                )
                  ? "#F5F5F5"
                  : "#FFF",
              }}
              onClick={() => selectCategory(text)}
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: colors[i],
                    width: 40,
                    height: 40,
                  }}
                >
                  <Typography
                    align="center"
                    sx={{ marginTop: 1, color: "white" }}
                  >
                    {text[0].toUpperCase()}
                  </Typography>
                </Box>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {currentCategory ? (
          <>
            <Box>
              <Typography variant="h5" component="div">
                {currentCategory}
                <Badge
                  sx={{ marginLeft: 3 }}
                  badgeContent={
                    products?.filter((item) => item.seller === currentCategory)
                      .length
                  }
                  max={
                    products?.filter((item) => item.seller === currentCategory)
                      .length
                  }
                  color="secondary"
                ></Badge>
              </Typography>
            </Box>

            <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
          </>
        ) : (
          <>
            {products?.length ? (
              <Typography variant="h6" sx={{ marginBottom: 3 }} component="div">
                All products ({products?.length}) are showing
              </Typography>
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

        {products?.length ? <DataTable products={products} /> : null}
      </Box>
    </Box>
  );
};

export default Home;

import React, { useState } from "react";
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
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button } from "@mui/material";
import { bindActionCreators } from "redux";
import { productActions, userActions } from "../redux/actions";
import colors from "../colors/index";
import TableLayout from "./TableLayout";
import Stock from "./Stock";

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

  const { currentCategory } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const { userLogout } = bindActionCreators(userActions, dispatch);

  const { selectCategory } = bindActionCreators(productActions, dispatch);

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const [showStock, setShowStock] = useState(false);

  const [sellerCompanies] = useState(["Kruidvat", "Drogist", "Etos"]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit" 
      >
        <Toolbar>
          <IconButton
            color="inherit"
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

            <Button variant="outlined" onClick={userLogout}>
              Sign Out
            </Button>
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

        <List>
          <ListItem>
            <ListItemIcon sx={{ marginLeft: 1 }}>
              <Badge color="secondary" badgeContent={sellerCompanies.length}>
                <BusinessIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {sellerCompanies.map((text, i) => (
            <ListItem
              button
              key={text}
              sx={{
                backgroundColor:
                  !showStock && sellerCompanies[i] === currentCategory
                    ? "#F5F5F5"
                    : "#FFF",
              }}
              onClick={() => {
                selectCategory(text);
                setShowStock(false);
              }}
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

        <List>
          <ListItem
            button
            onClick={() => setShowStock(true)}
            sx={{
              backgroundColor: showStock ? "#F5F5F5" : "#FFF",
            }}
          >
            <ListItemIcon sx={{ marginLeft: 1 }}>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {showStock ? <Stock /> : <TableLayout />}
      </Box>
    </Box>
  );
};

export default Home;

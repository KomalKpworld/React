import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
const SideNavBar = (setMobileOpen) => {
  const theme = useTheme();
  const classes = useStyles();
  const categories = [
    { label: "Popular", value: "popular" },
    { label: "TopRating", value: "top-rating" },
    { label: "Price", value: "price" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Trending", value: "trending" },
  ];
  const demoCategories = [
    { label: "Horror", value: "horror" },
    { label: "Comedy", value: "comedy" },
    { label: "Action", value: "action" },
    { label: "Animation", value: "animation" },
    { label: "Old", value: "old" },
  ];

  const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

  const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="film-fire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader> Categories </ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.Links} to="/">
            <ListItem onClick={() => { }} button>
              {/*     <ListItemIcon>
<img src={redLogo} className = {classes.genreImages} height={30} />
                </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader> SubCategories </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.Links} to="/">
            <ListItem onClick={() => { }} button>
              {/*     <ListItemIcon>
<img src={redLogo} className = {classes.genreImages} height={30} />
                </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideNavBar;

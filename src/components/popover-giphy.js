import Popover from "@mui/material/Popover";
import React from "react";
import gif_image from "../assets/images/gif-icon.png";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

const PopoverGif = ({ sendGif }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onGifClick = (gif) => {
    sendGif(gif.images.fixed_height_small.url);
    handleClose();
  };

  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);
  const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div id="gif-search-button">
      <div onClick={handleClick}>
        <img className={"gif-image"} src={gif_image} alt={"gif"} />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: 400,
          horizontal: "center",
        }}
        sx={{
          height: "400px",
        }}
      >
        <Grid
          width={400}
          columns={3}
          fetchGifs={fetchGifs}
          noLink={true}
          onGifClick={onGifClick}
        />
      </Popover>
    </div>
  );
};

export default PopoverGif;

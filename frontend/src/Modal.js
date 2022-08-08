import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Popup from "reactjs-popup";

const Modal = () => {
  return (
    <Popup trigger={<button className="button">Station Info</button>} modal>
      <Card sx={{ minWidth: 750 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            [Station name here]
          </Typography>
        </CardContent>
      </Card>
    </Popup>
  );
};

export default Modal;

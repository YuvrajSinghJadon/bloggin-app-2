import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentCard = ({ username, date, commentText }) => {
  const isUserComment = true;
  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 40, height: 40 }}>
          <AccountCircleIcon />
        </Avatar>
        <div>
          <Typography variant="subtitle2">username</Typography>
          <Typography variant="body2" color="textSecondary">
            date
          </Typography>
        </div>
        {isUserComment && (
          <IconButton sx={{ marginLeft: "auto" }} color="error" size="large">
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
      <CardContent>
        <Typography variant="body1">commentText</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;

import { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../services";
const CommentCard = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async () => {
    await deleteComment(comment._id);
    setToggle((prev) => !prev);
  };

  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AccountCircleIcon color="primary" fontSize="large" />

        <div>
          <Typography variant="subtitle2">{comment.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {comment.date}
          </Typography>
        </div>
        {comment.name === account.username && (
          <IconButton sx={{ marginLeft: "auto" }} color="error" size="large">
            <DeleteIcon onClick={() => removeComment()} />
          </IconButton>
        )}
      </CardContent>
      <CardContent>
        <Typography variant="body1">{comment.comments}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;

import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const BlogCard = ({ imageSrc, title, description }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageSrc}
        alt="Card Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const BlogCard = ({ imageSrc, title, description, _id }) => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate(`/read/${_id}`);
  };
  return (
    <div onClick={handleChange} style={{ cursor: "pointer" }}>
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={imageSrc}
          alt="Card Image"
          sx={{
            height: 200,
            objectPosition: "center top",
          }}
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
    </div>
  );
};

export default BlogCard;

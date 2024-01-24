import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import { createPost } from "../../services/";
import Carousel from "react-material-ui-carousel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { DataContext } from "../../context/DataProvider";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreateBlog = () => {
  // Sample list of small cards (you can replace this with your data)

  const { account } = useContext(DataContext);
  const [post, setPost] = useState(initialPost);
  const [error, showError] = useState("");
  const navigate = useNavigate();
  post.username = account.username;

  const cardList = [
    {
      id: 1,
      title: "Card 1",
      description: "Description 1",
      imageSrc:
        "https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Card 2",
      description: "Description 2",
      imageSrc:
        "https://images.pexels.com/photos/2007395/pexels-photo-2007395.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=252&fit=crop&h=408",
    },
    {
      id: 3,
      title: "Card 3",
      description: "Description 3",
      imageSrc:
        "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  //publish post
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const savePost = async () => {
    if (post.title && post.description && post.categories) {
      const response = await createPost(post);
      console.log(post);
      if (response) {
        navigate("/");
        showError("");
      } else {
        showError("Something went wrong! please try again later");
      }
    } else {
      showError("Please fill all the fields");
    }
  };

  return (
    <div>
      {/* Banner Image */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          backgroundImage:
            "url(https://images.pexels.com/photos/1093946/pexels-photo-1093946.jpeg?auto=compress&cs=tinysrgb&w=800)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          border: "1px solid #ccc",
          mt: 2,
          borderRadius: "8px", // Replace with your desired border radius
          padding: "16px",
        }}
      >
        <Grid container spacing={5}>
          {/* Left part (3/4) */}
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                //   marginBottom: 4,
                gap: 2,
              }}
            >
              <span>
                <AddCircleIcon color="primary" fontSize="large" />
              </span>

              <TextField
                fullWidth
                label="Title"
                name="title"
                variant="standard"
                onChange={(e) => handleChange(e)}
              />

              {/* <InputLabel htmlFor="category">Category</InputLabel> */}
              <Select
                id="category"
                sx={{ width: "10rem", height: "2.4rem" }}
                color="primary"
                name="categories"
                value={post.categories}
                onChange={(e) => handleChange(e)}
                displayEmpty // This is the key to show the placeholder
                inputProps={{ "aria-label": "Category" }}
              >
                <MenuItem value="" disabled>
                  category
                </MenuItem>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                {/* Add more MenuItems as needed */}
              </Select>
              <Button variant="contained" sx={{ px: 5 }} onClick={savePost}>
                {" "}
                Publish
              </Button>
            </Box>
            {/* Add your content for the main part of the page here */}
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              multiline
              rows={10}
              placeholder="So, what's in your mind...."
              onChange={(e) => handleChange(e)}
              name="description"
              margin="dense"
            />
          </Grid>

          {/* Carousel */}
          <Grid item xs={12} md={12}>
            <Carousel animation="fade" swipe="vertical" slidesToShow={2}>
              {cardList.map((card) => (
                <Card
                  key={card.id}
                  sx={{ width: "50%", margin: "0 auto", boxShadow: 3 }}
                >
                  <div
                    style={{
                      paddingTop: "56.25%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={card.imageSrc}
                      alt="Card Image"
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateBlog;

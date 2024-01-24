import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentCard from "../commentCard";
import { DataContext } from "../../context/DataProvider";
import { getPostByid, deletePost } from "../../services/";
import Comments from "../comments";
const ReadBlog = () => {
  // Sample list of small cards (you can replace this with your data)

  const { account } = useContext(DataContext);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPostByid(_id);
      if (response) {
        setPost(response);
      }
    };
    fetchData();
  }, []);

  // const deleteBlog = async () => {
  //   await deletePost(post._id);
  //   navigate("/");
  // };

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
                justifyContent: "space-between",
                alignItems: "flex-end",
                //   marginBottom: 4,
                gap: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  wordWrap: "break-word", // Word wrap to new line
                  overflowWrap: "break-word", // Word wrap to new line
                  overflow: "hidden", // Hide overflowing content
                }}
              >
                {post.title}
              </Typography>
              <Box style={{ float: "right" }}>
                {post.username === account.username && (
                  <>
                    <Link to={`/update/${post._id}`}>
                      <EditIcon fontSize="large" color="primary" />
                    </Link>
                    <DeleteIcon
                      fontSize="large"
                      onClick={() => deleteBlog()}
                      color="error"
                    />
                  </>
                )}
              </Box>
            </Box>
            {/* Add your content for the main part of the page here */}
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">{post.description}</Typography>
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
        <Comments post={post} />
      </Container>
    </div>
  );
};

export default ReadBlog;

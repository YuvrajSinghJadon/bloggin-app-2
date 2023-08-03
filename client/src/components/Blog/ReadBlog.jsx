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
const ReadBlog = () => {
  // Sample list of small cards (you can replace this with your data)

  const { account } = useContext(DataContext);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPostByid(_id);
      console.log(response);
      if (response) {
        setPost(response);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate("/");
  };
  const Comments = [
    {
      username: "JohnDoe",
      date: "2023-08-02",
      text: "Great article! I really enjoyed reading it.",
    },
    {
      username: "JaneSmith",
      date: "2023-08-03",
      text: "This is very helpful information. Thanks for sharing!",
    },
    {
      username: "Mike123",
      date: "2023-08-04",
      text: "I completely agree with your points. Well said!",
    },
    {
      username: "Emily25",
      date: "2023-08-05",
      text: "I have been looking for this information everywhere. Thanks a lot!",
    },
    {
      username: "Alex87",
      date: "2023-08-06",
      text: "Amazing post! I'll definitely be sharing this with my friends.",
    },
    {
      username: "Sara12",
      date: "2023-08-07",
      text: "Your writing style is so engaging. I couldn't stop reading!",
    },
    {
      username: "Mark34",
      date: "2023-08-08",
      text: "I learned a lot from this article. Looking forward to more.",
    },
  ];

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
        {Comments.map((comment, index) => (
          <CommentCard
            key={index}
            username={comment.username}
            date={comment.date}
            commentText={comment.text}
            accountUsername="your-account-username" // Replace with the account username
          />
        ))}
      </Container>
    </div>
  );
};

export default ReadBlog;

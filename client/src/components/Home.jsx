import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "./Navbar";
import CategoriesTable from "./CategoriesTable";
import { Container, Grid } from "@mui/material";
import BlogCard from "./blogCard";
import { getAllPosts } from "../services/";
// const cards = [
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/15445009/pexels-photo-15445009/free-photo-of-kitten-in-the-window-sill.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Card 1",
//     description: "Description for Card 1",
//   },
//   {
//     imageSrc:
//       "https://images.pexels.com/photos/3257811/pexels-photo-3257811.jpeg?auto=compress&cs=tinysrgb&w=800",
//     title: "Card 2",
//     description: "Description for Card 2",
//   },
//   // Add more cards as needed
// ];

const Home = () => {
  const [posts, getPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    const fetchData = async () => {
      let response = await getAllPosts();
      if (response) {
        getPosts(response);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
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
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <CategoriesTable />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {posts.map((card) => (
                <Grid key={card._id} item xs={12} sm={6} md={4}>
                  <BlogCard
                    _id={card._id}
                    imageSrc={card.imageSrc}
                    title={card.title}
                    description={card.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Home;

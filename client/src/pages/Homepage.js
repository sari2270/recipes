import React from "react";
import Cards from "../components/Cards";
import HeaderCard from "../components/UI/HeaderCard";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardItem from "../components/CardItem";
import axios from "axios";
import { useState } from "react";
import SearchBox from "../components/SearchBox";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/recipes?page=1");
      console.log(response);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.log("errorrrr");
    }
  };



  // useEffect(() => {
  //   (async () => {
  //     setAppState({ ...appState, loading: true });
  //     let accessToken = localStorage.getItem("accessToken");
  //     if (accessToken) {
  //       try {
  //         const res = await api.getProtected();
  //         console.log(res.data);
  //         setAppState({
  //           ...appState,
  //           display: "show",
  //           isLoggedIn: true,
  //           user: res.data.user,
  //           loading: false,
  //         });
  //         setFormState({ ...formState, display: "hide" });
  //       } catch (error) {
  //         console.error(error);
  //         alert(error.response.data.error);
  //         setAppState({ ...appState, loading: false });
  //       }
  //     }
  //   })();
  // }, []);




  useEffect(() => {
    fetchRecipesHandler();
  }, []);
  return (
    <>
      <HeaderCard />
      <SearchBox />
      <Cards recipes={recipes} />
    </>
  );
};

export default Homepage;

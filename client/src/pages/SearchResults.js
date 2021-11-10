import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Cards from '../components/Cards';
import SearchBox from '../components/SearchBox';

const baseUrl = process.env.REACT_APP_BASE_URL;

const SearchResults = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    const location = useLocation()

    const searchQuery = new URLSearchParams(location.search).get('q')

    const fetchSearchRecipesHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response =await axios.get(`${baseUrl}recipes/search?q=${searchQuery}`); 
          setRecipes(response.data);
        } catch (error) {
          console.log("errorrrr");
        }
      };
      useEffect(() => {
        fetchSearchRecipesHandler();
      }, [searchQuery]);
    return (
        <>
        <SearchBox/>
            <Cards recipes={recipes}/>
        </>
    )
}

export default SearchResults

import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MyLogo from "./movie-icon.svg";
import SearchLogo from "./search-icon.svg";
import MovieInfoComponent from "./components/MovieInfoComponent";

const API_KEY= "9cacffd5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: fit-content;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;


function App() {

  const [searchQuery,updateSearchQuery]=useState("");
  const [timeoutId,updateTimeoutId]=useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie,onMovieSelect]=useState();

  const fetchData= async (searchString)=>
  {
    const response=await Axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search);
    // console.log(movieList);
  };

  const onTextChange=(event)=>
  {
    // setTimeout(() => {
    //   updateSearchQuery(event.target.value);
    // }, 1000);
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),1000);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src={MyLogo}/>
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src={SearchLogo}/>
          <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange}/>//s
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer> 
        {
          movieList?.length ? movieList.map((movie,index)=>(<MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>)):"No Movie Search"
        }
      </MovieListContainer>
    </Container>
    
  );
}

export default App;

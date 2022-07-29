import React from "react";
import styled from "styled-components";

const MovieContainer=styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 280px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const MovieComponent=(props)=>
{
    // console.log(props);
    return(
        <MovieContainer onClick={()=> {
            props.onMovieSelect(props.movie.imdbID);
            // console.log(props.movie.imdbID);
        }}>
            <CoverImage src={props.movie.Poster}/>
            <MovieName>{props.movie.Title}</MovieName>
            <InfoColumn>
                <span>Year: {props.movie.Year}</span>
                <span>Type: {props.movie.Type}</span>
            </InfoColumn>
        </MovieContainer>
    )
}


export default MovieComponent;
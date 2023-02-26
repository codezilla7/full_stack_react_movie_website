import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Typography } from 'antd';
import '../Styles/Pagination.css'
import useMoviesContext from '../Hooks/useMoviesContext';

export default function Movies() {
  const [current, setCurrent] = useState(1);
  const { state } = useMoviesContext()
  const { Text } = Typography;
  const moviesPerPage = 21
  const movies = state.movies

  // Calculate the index of the first and last movie to display
  const indexOfLastMovie = current * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);



  const onChange = (page) => {
    setCurrent(page);
  };

  return (
    <div className='movies-mother-div'>
      <h1 className='nowstreaming'>Now Streaming</h1>
      <div className='movies-main-div'>
        {currentMovies.length === 0 ? (
          <p className='NMF' style={{ height: '60vh', textAlign: 'center' }}>
            <h1 style={{ display: 'inline', margin: '10px' }}>
              <i class='bi bi-exclamation-circle-fill'></i>
            </h1>
            {`Sorry, we couldn't find the matching movie.`}
          </p>
        ) : (
          currentMovies.map((film) => {
            return (
              <Link to={`/moviedetails/${film._id}`} className='movies-card'>
                <img
                  alt={`couldn't load`}
                  src={film.Poster}
                  className='movies-poster'
                ></img>
                <div className='movies-detail'>
                  <Text style={{ width: 100 }}
                    ellipsis={{ tooltip: film.Title }} className='movies-title'>{film.Title}</Text>
                  <p className='movies-runtime'>Runtime: {film.Runtime}</p>
                  <p className='movies-year'>Released: {film.Year}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
        <Pagination
          current={current}
          onChange={onChange}
          total={movies.length}
          pageSize={moviesPerPage}
          hideOnSinglePage
        />
    </div>
  );
}
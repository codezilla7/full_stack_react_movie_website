import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import "../Styles/Favourites.css"
import { Pagination } from 'antd';
import useFavContext from '../Hooks/useFavContext';

export default function Favourites() {
    const {state} = useFavContext()
    const [current, setCurrent] = useState(1);
    const moviesPerPage = 27
    const movies = state.movies

    const indexOfLastMovie = current * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const movie = state.movies
    return (
        <>
            <Navbar></Navbar>
            <div className='favSecdiv'>
                <div className='fav-1st-div'>
                    <h1 className='fav-txt'>All your Favourites</h1>
                    <p className='fav-txt'>Total Movies: {movie.length}</p>
                </div>
                <div className='movies-main-div'>
                    {currentMovies.length === 0 ? (
                        <p className='NMF' style={{ height: '60vh', textAlign: 'center' }}>
                            <h1 style={{ display: 'inline', margin: '10px' }}>
                                <i class='bi bi-exclamation-circle-fill'></i>
                            </h1>
                            {`No movies Added to favourites`}
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
                                        <p className='movies-title'>{film.Title}</p>
                                        <p className='movies-runtime'>Runtime: {film.Runtime}</p>
                                        <p className='movies-year'>Released: {film.Year}</p>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
                {currentMovies.length < moviesPerPage ? null : (
                    <Pagination
                        current={current}
                        onChange={onChange}
                        total={movies.length}
                        pageSize={moviesPerPage}
                    />
                )}
            </div>
            <Footer></Footer>
        </>
    )
}

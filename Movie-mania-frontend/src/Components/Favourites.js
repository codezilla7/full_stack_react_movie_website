import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import "../Styles/Favourites.css"
import Loader from './Dashboard/Loader';
import { Pagination } from 'antd';
import useMoviesContext from '../Hooks/useMoviesContext';

export default function Favourites() {

    const {state} = useMoviesContext()
    // const [movie, setMovie] = useState('');
    const [current, setCurrent] = useState(1);
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
                    {movie.length === 0 ? <p className='NMF'><h1 style={{ display: 'inline', margin: "10px" }}><i class="bi bi-exclamation-circle-fill"></i></h1>{`Sorry, we couldn't find the matching movie.`}</p> :
                        movie.map(film => {
                            return (
                                <Link to={`/moviedetails/${film._id}`} className='movies-card'>
                                    <img alt={film.Title} src={film.Poster} className='movies-poster'></img>
                                    <div className='movies-detail'>
                                        <p className='movies-title'>{film.Title}</p>
                                        <p className='movies-runtime'>Runtime: {film.Runtime}</p>
                                        <p className='movies-year'>Released: {film.Year}</p>
                                    </div>
                                </Link>
                            )
                        })}
                </div>
                {movie.length === 0 ? <Pagination style={{display:"none"}}/> : <Pagination current={current} onChange={onChange} total={movie.length} /> }
            </div>
            <Footer></Footer>
        </>
    )
}

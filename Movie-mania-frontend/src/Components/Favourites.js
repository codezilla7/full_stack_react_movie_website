import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import "../Styles/Favourites.css"
import { Pagination , Button } from 'antd';
import {CaretRightOutlined} from '@ant-design/icons'
import useFavContext from '../Hooks/useFavContext';

export default function Favourites() {
    const { state, dispatch } = useFavContext()
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

    const handleRemove = (e) => {
        console.log(dispatch)
        dispatch({type:'remove-movie' , payload:e})
    }
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
                                <div className='movies-card'>
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
                                        <Button onClick={()=>{handleRemove(film._id)}} type="primary" danger>
                                            remove
                                        </Button>
                                        <Link to={`/moviedetails/${film._id}`}><Button type="primary">Watch <CaretRightOutlined /></Button></Link>
                                </div>
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
            <Footer></Footer>
        </>
    )
}

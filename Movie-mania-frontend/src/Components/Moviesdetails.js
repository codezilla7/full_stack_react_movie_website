import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Moviesdetails() {
    let {id} = useParams();
    let [data, setdata] = useState('');
    let [error, seterror] = useState('');
    let [pending, setpending] = useState(true);

    useEffect(() => {
        try {
        axios.get(`http://localhost:8000/movies/${id}`)
        .then(response => {
            setdata(response.data);
            setpending(false);
        })

        } catch (error) {
        seterror(error.message);
        setpending(false);
        }
        }, [id]);
    return (
        <>
        <Navbar />
        <div className='movies-details-maindiv'>
            {pending && <h1>Loading....</h1>}
            {
                data && 
                        <div className='md-mother-div'>
                            <iframe className='md-video' width="876" height="465" src="https://youtu.be/cYplvwBvGA4" title="The Dictator - Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div className='movies-details-second'>
                            <div className='md-poster-div'>
                                <img src={data.Poster} className='md-poster'></img>
                            </div>
                            <div className='md-details'>
                                <h1 className='md-title'>{data.Title}</h1>
                                <p className='md-description'>{data.Description}</p>
                                <p className='md-category'>Category: {data.Category}</p>
                                <p className='md-runtime'>Runtime: {data.Runtime}</p>
                                <p className='md-released'>Released: {data.Year}</p>
                                <div className='md-buttons'>
                                    <button className='md-add' ><i class="bi bi-plus-lg"></i> Add</button>
                                </div>
                            </div>
                            </div>
                        </div>
            }
            {error && <h1>{error}</h1>}
        </div>
        <Footer />
        </>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useMoviesContext from "../Hooks/useMoviesContext"

export default function Categories() {
  const { dispatch } = useMoviesContext()
  let [data, setData] = useState('');
  let [pending, setPending] = useState(true);
  let [error, setError] = useState('');
  let [next, setNext] = useState('abc');
  let [movie, setMovie] = useState('');
  let [category, setCategory] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/Categories')
      .then((response) => {
        setData(response.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error);
        setPending(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/movies')
      .then(response => {
        setMovie(response.data)
        setNext('fill')
        dispatch({ type: "updateCat", payload: movie })
      })
      .catch(error => console.log(error));
  }, [next]);

  const allmovies = () => {
    setNext('')
  }

  useEffect(() => {
    if (!category) {
      return;
    }

    axios
      .get(`http://localhost:8000/movies`)
      .then(response => {
        const filteredMovies = response.data.filter(
          movie => movie.Category === category
        );
        setMovie(filteredMovies);
        dispatch({ type: 'updateCat', payload: filteredMovies });
      })
      .catch(error => {
        setError(error.message);
      });
  }, [category]);

  return (
    <>
      {pending && <h1>...Loading</h1>}
      <div className='Categories-main-div'>
        <h1 className='Categories'>Categories</h1>
        <div className='Categories-second-div'>
          <span onClick={(e) => { allmovies() }} className='Categories-name'><i className="bi bi-circle"></i>All movies</span>
          {
            data && data.sort((a, b) => a.Name.localeCompare(b.Name)).map(category => {
              return (
                <span onClick={(e) => { setCategory(e.target.outerText) }} className='Categories-name'><i className="bi bi-circle"></i>{category.Name}</span>
              )
            })
          }
        </div>
        {error && <h1>{error}</h1>}
      </div>
    </>
  )
}

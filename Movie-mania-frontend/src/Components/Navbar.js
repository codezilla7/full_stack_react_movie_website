import React, { useEffect, useState } from 'react'
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import useMoviesContext from "../Hooks/useMoviesContext"
import { Badge } from 'antd';

export default function Navbar() {
  const { dispatch } = useMoviesContext()
  let [data, setData] = useState('');
  let [pending, setPending] = useState(true);
  let [error, setError] = useState('');
  let [next, setNext] = useState('abc');
  let [movie, setMovie] = useState('');
  let [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/Categories')
      .then((response) => {
        setData(response.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
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
        dispatch({ type: 'updateCat', payload: filteredMovies });
      })
      .catch(error => {
        setError(error.message);
      });
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault()
    if (!search) {
      axios
        .get(`http://localhost:8000/movies`)
        .then(response => {
          dispatch({ type: 'search', payload: response.data })
        })
        .catch(error => {
          setError(error.message)
        })
    }
    axios
      .get(`http://localhost:8000/movies`)
      .then(response => {
        const searchedMovies = response.data.filter(
          movie => movie.Title.toUpperCase().includes(search.toUpperCase())
        );
        dispatch({ type: 'search', payload: searchedMovies });
        console.log(search)
        console.log(searchedMovies)
      })
      .catch(error => {
        setError(error.message);
      });
  }

  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg">
      <div className="container-fluid">
        <Link to='/' className='brand-name'>Movie Mania</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <i class="bi bi-list"></i>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <Link to='/' className='brand-name'>Movie Mania</Link>
            <button type="button" className="bi bi-x-lg" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start d-flex align-items-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className='navButtons' to='/contactus'>Contact us</Link>
              </li>
              <li className="nav-item">
                <Badge count={5} title="Total movies" size='small' style={{backgroundColor:"cadetblue"}}>
                  <Link className='navButtons' to='/favourites'>Favourites</Link>
                </Badge>
              </li>
              <li className="nav-item dropdown mt-0 " id='dropdown'>
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={(e) => { allmovies() }} className="dropdown-item" data-bs-dismiss="offcanvas" href="#">All movies</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <ul className='pl-3'>
                    {pending && <p>Loading...</p>}
                    {
                      data && data.sort((a, b) => a.Name.localeCompare(b.Name)).map(category => {
                        return (
                          <span onClick={(e) => { setCategory(e.target.outerText) }} className='catItem' data-bs-dismiss="offcanvas" >{category.Name}</span>
                        )
                      })
                    }
                    {error && <h1>{error}</h1>}
                  </ul>
                </ul>
              </li>
            </ul>
            <form onSubmit={handleSearch} id='search1' className="d-flex align-items-center" role="search">
              <input onChange={(e) => { setSearch(e.target.value) }} className="form-control me-2" id='searchInp' type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" data-bs-dismiss="offcanvas" id='searchBt' type="submit"><i class="bi bi-search"></i></button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

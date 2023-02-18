import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Loader from './Loader';

export default function Addmovies() {
    let [Title, setTitle] = useState("");
    let [Description, setDescription] = useState("");
    let [Year, setYear] = useState("");
    let [Runtime, setRuntime] = useState("");
    let [Poster, setPoster] = useState("");
    let [Category, setCategory] = useState("");
    let [data, setdata] = useState("");
    let [pending, setpending] = useState("");
    let [error, seterror] = useState("");
  
    let navigate = useNavigate();
    
  
    let handleClick = (e) => {
      e.preventDefault();
      let all = { Title,  Year,  Runtime,  Poster, Description, Category };

      if(Title, Year, Runtime, Poster, Description === ''){
        alert('input cannot be empty')
      }
      else{
        axios.post("http://localhost:8000/movies", all, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                navigate("/dashboard/viewmovie");
            })
            .catch(error => {
                console.log(error.message);
            });        
      }
  
    };
    useEffect(() => {
      let getData = async (resource) => {
        let response = await fetch(resource);
        let data = await response.json();
        return data;
      };
      getData("http://localhost:8000/categories")
        .then((data) => {
          setdata(data);
          setpending(false);
        })
        .catch((error) => {
          seterror(error.message);
          setpending(false);
        });
    }, []);
    return (
        <div style={{ display: "flex" }}>
            {pending && <h1>{<Loader></Loader>}</h1>}
            <div style={{ margin: "auto", width: "800px", padding: "20px" ,}}>
                <div className="card-header bg-dark">
                    <h3 className="card-title">Add Movie</h3>
                </div>
                <form
                    onSubmit={(e) => {
                        handleClick(e);
                    }}
                    style={{
                        backgroundColor:'#C6D8E4'
                    }}
                >
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie Title</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie Title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie year</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                    setYear(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie year"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie Runtime</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                    setRuntime(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie Runtime"
                            />
                        </div>
                        <div
                            class="form-group"
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            <label>Select Category</label>
                            <select class="form-control">
                                {data && data.map((categories) => (<option>{categories.Name}</option>))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie poster</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                    setPoster(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie poster URL"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie Description</label>
                            <textarea
                                type="text"
                                className="form-control"
                                cols="30"
                                rows="10"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie Description..."
                            />
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
            </div>
            {error && <h1>{error}</h1>}
        </div>
    )
}

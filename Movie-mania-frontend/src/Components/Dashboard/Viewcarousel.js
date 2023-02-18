import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function Viewcarousel() {
    let [data, setdata] = useState("");
    let [error, seterror] = useState("");
    let [pending, setpending] = useState(true);
    let [edit, setedit] = useState("");
    
    const getData = async(url) => {
        try{
            const res = await axios.get(url)
            setdata(res.data)
            setpending(false)
        } catch (error) {
            seterror(error.message)
            setpending(false)
        }
    }
    useEffect(() => {
        getData("http://localhost:8000/Carousel")
    },[edit])
  
    let handleDelete = (id) => {
        setedit("");
        axios.delete(`http://localhost:8000/Carousel/${id}`)
            .then((del) => {
                setedit("changed");
            })
            .catch((error) => {
                alert(error.message);
            })
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">All movies</h3>
                                <div className="card-tools">
                                    <div
                                        className="input-group input-group-sm"
                                        style={{ width: 150 }}
                                    ></div>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Released</th>
                                            <th>Poster</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pending && <Loader />}
                                        {data &&
                                            data.map((movie) => (
                                                <tr className="w-100">
                                                    <td>{movie.id}</td>
                                                    <td>{movie.title}</td>
                                                    <td>{movie.released}</td>
                                                    <td>
                                                        <a href={movie.poster} target="_blank">
                                                            View Poster
                                                        </a>
                                                    </td>
                                                    <td style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{movie.Description}</td>
                                                    <td>
                                                        <Link
                                                            to={`/dashboard/editcarousel/${movie.id}`}
                                                            className="btn btn-primary"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                handleDelete(movie.id);
                                                            }}
                                                            className="btn btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
            {error && <h1>{error}</h1>}
        </>
    )
}

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Button, Result } from 'antd';

export default function Viewmovie() {
    const [data, setdata] = useState("");
    const [error, seterror] = useState("");
    const [pending, setpending] = useState(true);
    const [edit, setedit] = useState("");

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
        getData("http://localhost:8000/contactus")
    },[edit])
    

    let handleDelete = (id) => {
        setedit("");
        axios.delete(`http://localhost:8000/contactus/${id}`)
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
                                <h3 className="card-title">All contacts</h3>
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
                                            <th>fullname</th>
                                            <th>email</th>
                                            <th>socialmedia</th>
                                            <th>introduction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pending && <Loader />}
                                        {data ? 
                                          <Result
                                          style={{textAlign:'center'}}
                                          title="No contacts at the moment"
                                        /> : data &&
                                            data.map((contact , index) => (
                                                <tr className="w-100">
                                                    <td>{index}</td>
                                                    <td>{contact.fullname}</td>
                                                    <td>{contact.email}</td>
                                                    <td>
                                                        <a href={contact.socialmedia} rel='noreferrer' target="_blank">
                                                            {contact.socialmedia}
                                                        </a>
                                                    </td>
                                                    <td>{contact.description}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                handleDelete(contact._id);
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

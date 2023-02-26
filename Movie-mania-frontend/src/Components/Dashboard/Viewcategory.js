import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";


export default function Viewcategory() {
  let [update, setupdate] = useState('')
  let [data, setdata] = useState('')
  let [pending, setpending] = useState(true)
  let [error, seterror] = useState('')

  const getData = async (url) => {
    try {
      const res = await axios.get(url)
      setdata(res.data)
      setpending(false)
    } catch (error) {
      seterror(error.message)
      setpending(false)
    }
  }
  useEffect(() => {
    getData("http://localhost:8000/Categories")
  }, [update])

  let handleDelete = (id) => {
    setupdate("");
    axios.delete(`http://localhost:8000/Categories/${id}`)
        .then((del) => {
            setupdate("changed");
        })
        .catch((error) => {
            alert(error.message);
        })
};
  return (
    <div>
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
                      </tr>
                    </thead>
                    <tbody>
                      {pending && <Loader />}
                      {data &&
                        data.map((category) => (
                          <tr className="w-100">
                            <td>{category._id}</td>
                            <td>{category.Name}</td>
                            <td>
                              <Link to={`/dashboard/editcategory/${category._id}`} className="btn btn-primary">Edit</Link>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  handleDelete(category._id)
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
    </div>
  );
}

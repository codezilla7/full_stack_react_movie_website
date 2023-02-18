import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Editcategory() {
    let { id } = useParams();
    let navigate = useNavigate();
    let [data, setData] = useState("");
    let [pending, setPending] = useState("");
    let [error, setError] = useState("");
    let [Name, setName] = useState(data.Name);

    
    const getData = async(url) => {
      try{
          const res = await axios.get(url)
          setData(res.data)
          setPending(false)
      } catch (error) {
          setError(error.message)
          setPending(false)
      }
  }
  useEffect(() => {
      getData(`http://localhost:8000/categories/${id}`)
  },[])
  
    let handleSubmit = (e) => {
      e.preventDefault();
  
      fetch(`http://localhost:8000/categories/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Name }),
      }).then((e) => {
        navigate("/dashboard/viewcategory");
      });
    };
    return (
      <div style={{ display: "flex" }}>
        {pending && <h1>....Loading</h1>}
        <div style={{ margin: "auto", width: "800px" }}>
          <div className="card-header bg-dark">
            <h3 className="card-title">Edit category</h3>
          </div>
          {data && 
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="exampleInputEmail1"
                      defaultValue={data.Name}
                    />
                </div>
              </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="submit" className="w-100 btn btn-success">
                Update
              </button>
            </div>
          </form>
                }
        </div>
        {error && <h1>{error}</h1>}
      </div>
  );
}

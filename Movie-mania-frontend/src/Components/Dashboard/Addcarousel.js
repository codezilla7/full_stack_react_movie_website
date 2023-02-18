import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Addcarousel() {
    let [title, setTitle] = useState("");
    let [released, setReleased] = useState("");
    let [poster, setPoster] = useState("");
    
  
    let navigate = useNavigate();
    
  
    let handleClick = (e) => {
      e.preventDefault();
      let all = { title, released,  poster };

      if(title, released, poster === ''){
        alert('Input section cannot be empty')
      }
      else{
          fetch("http://localhost:8000/Carousel", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(all),
          })
            .then((data) => {
              navigate("/dashboard/viewcarousel");
            })
            .catch((error) => {
              console.log(error.message);
            });
      }
  
    };

    return (
        <div style={{ display: "flex" , justifyContent: "center" , alignItems: "center"}}>
            <div style={{ width: "800px", margin: "20px", backgroundColor: "#C6D8E4"}}>
                <div className="card-header bg-dark">
                    <h3 className="card-title">Add Movie to Carousel</h3>
                </div>
                <form
                    onSubmit={(e) => {
                        handleClick(e);
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
                                placeholder="Enter movie Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Movie year</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                    setReleased(e.target.value);
                                }}
                                id="exampleInputEmail1"
                                placeholder="Enter movie year"
                            />
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
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

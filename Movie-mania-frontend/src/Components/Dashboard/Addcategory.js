import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Addcategory() {
  let [Name,setName] = useState('')

  let navigate = useNavigate()
  let handleClick = (e) => {
    e.preventDefault()

    if(Name === ''){
      alert('Input cannot be empty')
    }
    else{
      fetch('http://localhost:8000/categories',{
        method:'POST',
        headers:{"content-type":"application/json"},
        body: JSON.stringify({Name})
      })
      .then(()=>{
        navigate('/dashboard/viewcategory')
      })
    }
  }
  return (
    <div style={{'display':'flex',}}>
            <div style={{'margin':'auto', 'width':'800px' , backgroundColor: "#C6D8E4" }}>
                <div className="card-header bg-dark">
                    <h3 className="card-title">Add Category</h3>
                </div>
                <form  onSubmit={(e)=>{handleClick(e)}}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Add Category</label>
                            <input type="text" className="form-control" onChange={(e)=>{setName(e.target.value)}} id="exampleInputEmail1" placeholder="Enter Category Name" />
                        </div>
                      </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

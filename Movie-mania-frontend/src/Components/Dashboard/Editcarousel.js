import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Editcarousel() {
    let {id} = useParams()
    let navigate = useNavigate()
    let [data,setData] = useState('');
    let [pending,setPending] = useState('');
    let [error,setError] = useState('');
    let [title,setTitle] = useState('');
    let [released,setReleased] = useState('');
    let [poster,setPoster] = useState('')

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
      getData(`http://localhost:8000/Carousel/${id}`) 
  },[])

    let handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/Carousel/${id}`,{
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({poster,title,released})
        })
        .then((e)=>{
            navigate('/dashboard/viewcarousel')
        })
    }
    return (
        <>
        {pending && <h1>Loading....</h1>}
        <div style={{'display':'flex',}}>
        <div style={{'margin':'auto', 'width':'800px'}}>
            <div className="card-header bg-dark">
                <h3 className="card-title">Update Carousel movie</h3>
            </div>
            {error && <h1>{error}</h1>}
            {data&&<form onSubmit={(e)=>{handleSubmit(e)}}>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">movie Title</label>
                      <input type="text"   defaultValue={data.title} className="form-control" id="exampleInputEmail1" placeholder="Enter Title"  onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">movie Released</label>
                      <input type="text"   defaultValue={data.released} className="form-control" id="exampleInputEmail1" placeholder="Enter Released Year"  onChange={(e)=>{setReleased(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Movie poster</label>
                      <input type="text"   defaultValue={data.poster} className="form-control" id="exampleInputEmail1" placeholder="URL"  onChange={(e)=>{setPoster(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-success w-100">Update</button>
                  </div>
                </form>}
        </div>
    </div>
    </>
      )
}

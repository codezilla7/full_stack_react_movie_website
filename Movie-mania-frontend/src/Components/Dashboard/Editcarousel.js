import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

export default function Editcarousel() {
  let {id} = useParams()
  let navigate = useNavigate()
  let [data,setData] = useState('');
  let [pending,setPending] = useState('');
  let [error,setError] = useState('');
  let [Title,setTitle] = useState(data.Title);
  let [Year,setReleased] = useState(data.Year);
  let [Runtime,setRuntime] = useState(data.Runtime);
  let [Category,setCategory] = useState(data.Category);
  let [Poster,setPoster] = useState(data.Poster)
  let [Description,setDescription] = useState(data.Description);

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
    getData(`http://localhost:8000/slider/${id}`)
},[])

  let handleSubmit = (e) => {
      e.preventDefault();

      fetch(`http://localhost:8000/slider/${id}`,{
          method:'PATCH',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({Title,Year,Runtime,Category,Poster,Description})
      })
      .then((e)=>{
          navigate('/dashboard/viewmovie')
      })
  }
  return (
    <>
      {pending && <Loader />}
      <div style={{ 'display': 'flex', }}>
        <div style={{ 'margin': 'auto', 'width': '800px' }}>
          <div className="card-header bg-dark">
            <h3 className="card-title">Update movie</h3>
          </div>
          {error && <h1>{error}</h1>}
          {data && <form onSubmit={(e) => { handleSubmit(e) }}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">movie Title</label>
                <input type="text" defaultValue={data.Title} className="form-control" id="exampleInputEmail1" placeholder="Enter Title" onChange={(e) => { setTitle(e.target.value) }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">movie Released</label>
                <input type="text" defaultValue={data.Year} className="form-control" id="exampleInputEmail1" placeholder="Enter Released Year" onChange={(e) => { setReleased(e.target.value) }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">movie Runtime</label>
                <input type="text" defaultValue={data.Runtime} className="form-control" id="exampleInputEmail1" placeholder="Enter Runtime" onChange={(e) => { setRuntime(e.target.value) }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Movie poster</label>
                <input type="text" defaultValue={data.Poster} className="form-control" id="exampleInputEmail1" placeholder="URL" onChange={(e) => { setPoster(e.target.value) }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">movie Category</label>
                <input type="text" defaultValue={data.Category} className="form-control" id="exampleInputEmail1" placeholder="Enter Category" onChange={(e) => { setCategory(e.target.value) }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">movie Description</label>
                <textarea className="form-control" defaultValue={data.Description} name="" id="" cols="30" rows="10" onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter Description'>
                </textarea>
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

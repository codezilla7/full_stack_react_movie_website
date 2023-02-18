import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Loader from './Loader';

export default function Viewmoviedes() {
    const {id} = useParams();

    const [data,setdata] = useState();
    const [pending,setpending] = useState();
    const [error,seterror] = useState();

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
      getData(`http://localhost:8000/movies/${id}`)
  },[])
  return (
    <div style={{'height':'85vh' , 'display': 'flex' , 'justifyContent': 'center' , 'alignItems': 'center'}}>
        {pending && <Loader />}
        {data &&  <p style={{'width': '900px', 'padding': '20px' , 'backgroundColor': '#C6D8E4' , 'borderRadius': '10px'}}>{data.Description}</p>}
        {error && <h1>{error}</h1>}
    </div>
  )
}

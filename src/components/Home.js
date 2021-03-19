import React, { useState,useEffect }from 'react';
import { useHistory } from "react-router-dom";

function Home() {
 const history = useHistory();
 const [loading,setLoading] =useState(false);
 const [data,setData] = useState({});
 const url= 'https://api.nasa.gov/planetary/apod?api_key=JINMCPXXDXgTJJMOUhSQ9gYsqvchtvgx5lWyafQc';
 useEffect(()=>{
  const fetchData = async()=>{
   const response =await  fetch(url);
   const result = await response.json();
   setData(result);
   console.log(data);
   setLoading(true); 
  }
  fetchData();
 },[])
 const  handleClick = () =>{
  const search = document.getElementById("search").value
  
  console.log(search);
  history.push({pathname:'/search/go',state:{query:search}});
 }
 return (
  loading? 
  (<div className='container'>
   <h1 id="title">Nasa media search</h1>
   <div className='header-Contaier'>
     <h1 id='image-title'>{data.title}</h1>
     <div id='header-left'>
     <input id="search" type="text"/>
     <button onClick={handleClick}>search</button>
     </div>
   </div>
   
   
   <img id='img' src={data.hdurl} alt="" width="1000" height="800"/>
   <p id='description'>{data.explanation}</p>
   <h1 id='date'>{data.date}</h1>
  </div>):
  (<div>
   <h3>Loading...</h3>
  </div>)
 )
}

export default Home

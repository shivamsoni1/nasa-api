import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Search() {
 const [loading,setLoading] = useState(false);
 const [item,setItem] = useState([]);
 const [pageCount,setPageCount] = useState(0);
 const [pageNumber,setPageNumber]=useState(0);
 const userPerPage=10;
 const pageVisited = pageNumber*userPerPage;
 const location = useLocation();
 const query= location.state.query;
 const url=`${'https://images-api.nasa.gov/search'}?q=${query}`;
 console.log(url);
 const displayPost = item.slice(pageVisited,pageVisited+userPerPage).map((data)=>{
    
    const src = data.hasOwnProperty('links')?data.links[0].href:'';
    return (
     <div className='item'>
      <img src={src} className="thumbnail" alt="img" width="100" height="80"/>
      <div>
       <h2>Title: {data.data[0].title}</h2>
       <p>Date: {data.data[0].date_created}</p>
      </div>
     </div>
    );
   });
   
 const changePage =({selected})=>{
   setPageNumber(selected);
 }
 
 useEffect(()=>{
  const fetchData = async()=>{ 
   const response =await  fetch(url);
   const result = await response.json(); 
   console.log(result);
   setItem(result.collection.items);
   
   setLoading(true);
  }
  fetchData();
 },[])
 return (
  
  loading ? ( 
   
  /*<div className='container'>
   <h1>Nasa Media Search</h1>
   <h3>Search result's for {query}</h3>
   {item.map((data)=>{
    console.log(data.links);
    const src = data.hasOwnProperty('links')?data.links[0].href:'';
    return (
     <div className='item'>
      <img src={src} className="thumbnail" alt="img" width="100" height="80"/>
      <div>
       <h2>Title: {data.data[0].title}</h2>
       <p>Date: {data.data[0].date_created}</p>
      </div>
     </div>
    )
   })}
  </div> */
  <div className='container'>
   <h1>Nasa Media Search</h1>
   <h3>Search result's for {query}</h3>
  {displayPost}
  <ReactPaginate 
   previousLabel={'Previous'}
   nextLabel ={'Next'}
   pageCount={10}
   onPageChange={changePage}
   containerClassName={'paginationBttns'}
   previousLinkClassName={"previousBttn"}
   nextLinkClassName={"nextBttn"}
   disabledClassName={"paginationDisabled"}
   activeClassName={"paginationActive"}
  />
  </div>):(
   <div>Loading...</div>
  )
 )
}

export default Search


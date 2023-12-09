import React from 'react'
import Axios from 'axios'
import { API_KEY } from './API'
import { imageUrl } from './API'
import "./App.css"
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

function NetflixOriginals()
 {
 
    const [originalsData, setOriginalData] = React.useState([])
    const [myID, setMYID] = React.useState("")

    React.useEffect(function()
    {
        //Logic to makr request
        Axios.get(`https://api.themoviedb.org/3/discover/tv/?api_key=${API_KEY}&with_network=123`)
        .then(function(output)
        {
            setOriginalData(output.data.results)
        })
        .catch(function(error)
        {
                console.log(error)
        })
    }, [])

    function handleClick(movieData)
    {
        const movieName = movieData.name

        movieTrailer(movieName)
        .then(function(output)
        {
            setMYID(new URLSearchParams(new URL(output).search).get("v"))
        })
        .catch(function(error)
        {
            console.log(error)
        })
    }

  return (
   <div>
    <h2 style={{color:"white"}}>NETFLIX ORIGINALS</h2>
     <div className='allImages'>
        {
            originalsData.map(function(info)
            {
                // console.log( imageUrl + info.poster_path)
                return <img width="250px" height="250px" src={ imageUrl + info.poster_path} onClick={()=>{
                    handleClick(info)
                }}/>
            }) 
        }
    </div>
    {myID ? <Youtube videoId={myID}></Youtube> : null}
   </div>
  )
    }

export default NetflixOriginals
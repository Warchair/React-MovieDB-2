import React, { Component, useEffect, useState } from 'react';
import { fetchCast, fetchCrews, fetchDetails, fetchSimilar, fetchTrailer, fetchRecommendMovie, fetchGenre, fetchImages } from '../Component/data/data-api';
import NavbarMovie from '../Component/Navbar';

import { Link } from 'react-router-dom';

import RatingStars from 'react-rating-stars-component';
import ReactPlayer from 'react-player';

import GradeIcon from '@material-ui/icons/Grade';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FooterMovie from '../Component/FooterMovie';
import { Modal } from 'react-bootstrap';
import FormSearch from '../Component/formSearch';
import Sticky from '../Component/sticky';

function Details({match}) {
    const params = match.params;

    const [details, setDetails] = useState([]); 
    const [trailer, setTrailer] = useState([]);
    const [casts, setCasts] = useState([]); 
    const [crews, setCrews] = useState([]); 
    const [similar, setSimilar] = useState([]);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [images, setImages] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetails(await fetchDetails(params.id, params.type));
            setTrailer(await fetchTrailer(params.id, params.type));
            setCasts(await fetchCast(params.id, params.type));
            setCrews(await fetchCrews(params.id, params.type));
            setSimilar(await fetchSimilar(params.id, params.type));
            setRecommendMovie(await fetchRecommendMovie(params.id, params.type));
            setImages(await fetchImages(params.type, params.id));
            // setMovieGenre(await fetchGenre());
        }
        fetchAPI();
    },[params.id, params.type]);

    // const handleGenreClick = async (id) => {
    //     setMovieGenre(await fetchGenre(id));
    // }

    const ImagesList = images.map((item, index) => {
        return (
            <div class="backdrops" key={index}>
                <div class="backdrops-image">
                    <img src={item.backdrop_path} alt=""/>
                </div>
            </div>
        )
    })


    const castList = casts.slice(0,10).map((item, index) => {
        return (
            <div class="casts items" key={index} >
                <div class="poster">
                    <img src={item.image} alt=""/>
                </div>
                <div class="desc text-center">
                    <p className="bold">{item.name}</p>
                    <p className="text-muted">{item.character}</p>
                </div>
            </div>
        )
    });

    const RecommendMovieList = recommendMovie.slice(0,15).map((item, index) => {
        return (
            <div class="items" key={index}>
                <Link to={`${item.id}`}>
                    <div class="poster">
                        <img src={item.poster} alt=""/>
                    </div>
                    <p>{item.title}</p>
                </Link>
            </div>
        )
    })

    const SimilarMovie = similar.slice(0,12).map((item, index) => {
        return (
            <div class="list-movie ml-auto" key={index}>
                <Link to={`${item.id}`}>
                    <div class="poster">
                        <img src={item.poster} alt=""/>
                    </div>
                    <p className="text-center">{item.title}</p>
                </Link>
            </div>
        )
    })

    let temp = [];
    let director = [];
    let screenplay = [];
    let story = [];
    let producer = [];
    let exproducer = [];
    let music = [];
    let DoP = [];
    
    crews.map((items) => {
        if(items.job === 'Director') {
            director.push(items.name);
        } else if(items.job === 'Screenplay') {
            screenplay.push(items.name);
        } else if(items.job === 'Story') {
            story.push(items.name);
        } else if(items.job === 'Producer') {
            producer.push(items.name);
        } else if(items.job === 'Executive Producer') {
            exproducer.push(items.name);
        } else if(items.job === 'Original Music Composer') {
            music.push(items.name);
        } else if(items.job === 'Director of Photography') {
            DoP.push(items.name);
        }

    });


    // genres 
    console.log(details);
    const genre = details.genres;
    let genreMovie;
    if(genre) {
        genreMovie = genre.map((val,i) => {
            return (
                <a href={`../genres/${params.type}/${val.id}/page=1`}>
                    <span className="" key={i}>{val.name}, </span>
                </a>
            )
        })
    }   

    const runtime = details.runtime / 60 ;
    const hour = Math.floor(runtime);
    const minute = details.runtime % 60;

    // trailer
    console.log(trailer);
    
   
    const TrailerMovie = (props) => {
        const YoutubeUrl = 'https://www.youtube.com/watch?v=';
        const reactplayer = () => {
            if(trailer === undefined) {
                return <h6 className="text-center" style={{color:'white'}}>Trailer is not Available</h6>
            } else {
                return (
                    <ReactPlayer
                    url={YoutubeUrl + trailer.key}
                    playing
                    width="100%"
                    />
                )
            }
        }

        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{color:"#000000", fontWeight:"bolder" }}
                    >
                        {details.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{backgroundColor:"#000000"}}
                >   
                    {reactplayer()}
                </Modal.Body>
            </Modal>
        )
    }

    // console.log(details.production_companies);
    return (
        <>
            <div class="movie-details">
                <NavbarMovie/>
                <TrailerMovie
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false)
                    }}
                />
                <div class="container">
                    <div class="image-full mt-3" style={{maxHeight:'400px', overflow:'hidden'}}>
                        <img src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} className="img-fluid" alt=""/>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-8">
                            <div class="details">
                                <img style={{maxHeight:'240px'}} src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}  alt="" className="img-fluid"/>

                                <div class="desc">
                                    <p className="title">{params.type === 'movie' ? details.title  : details.name}</p>
                                    <div class="detailing mt-1">
                                        <li>
                                            {genreMovie}
                                        </li>
                                        <li>
                                            {hour}h {minute}m
                                        </li>
                                    </div>
                                    <RatingStars count={details.vote_average} size="30" color="orange" />
                                    <div class="btn-click my-auto">    
                                        <div class="icons">
                                            <button>
                                                <BookmarkIcon fontSize="medium" />
                                            </button>
                                            <button>
                                                <FavoriteIcon fontSize="medium"/>
                                            </button>
                                            <button>
                                                <GradeIcon fontSize="medium"/>
                                            </button>
                                        </div>
                                        <button className="btn btn-trailer " onClick={() => setIsOpen(true)} >
                                            <PlayArrowIcon fontSize="large"/>
                                            Watch Trailer
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="other-details mt-4">
                                <div class="overview mt-2">
                                    <p className="title">Overview</p>
                                    <div class="desc">
                                        {details.overview}
                                    </div>
                                </div>

                                <div class="actor  mt-4">
                                    <p className="title">Actor & Actress</p>
                                    <div class="castList slider">
                                        {castList}
                                    </div>
                                </div>

                                <div class="photos  mt-4">
                                    <p className="title">Photos</p>
                                    <div class="p-image">
                                        {ImagesList}
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div class="col-md-4">
                        <div class="crews">
                                    <p className="title">Crews</p>
                                    <div className="crews-data">
                                        <div className="items">
                                            <p className="font-weight-bold">Director</p>
                                            <p className="mt-n2 text-muted">{director.length === 0 ? '-' : director.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Producer</p>
                                            <p className="mt-n2 text-muted">{producer.length === 0 ? '-' : producer.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Executive Producer</p >
                                            <p className="mt-n2 text-muted">{exproducer.length === 0 ? '-' : exproducer.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Music of Photography</p>
                                            <p className="mt-n2 text-muted">{music.length === 0 ? '-' : music.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Director of Photography</p>
                                            <p className="mt-n2 text-muted">{DoP.length === 0 ? '-' : DoP.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Screenplay</p>
                                            <p className="mt-n2 text-muted">{screenplay.length === 0 ? '-' : screenplay.join(', ')}</p>
                                        </div>
                                        <div className="items">
                                            <p className="font-weight-bold">Story</p>
                                            <p className="mt-n2 text-muted">{story.length === 0 ? '-' : story.join(', ')}</p>
                                        </div>
                                    </div>

                                    <div class="more-info">
                                        <p className="title">Other Informations</p>
                                        <div class="items">    
                                            <p className="font-weight-bold">Budget</p>
                                            <p className="mt-n2 text-muted">${details.budget}</p>
                                        </div>
                                        <div class="items">
                                            <p className="font-weight-bold">Revenue</p>
                                            <p className="mt-n2 text-muted">${details.revenue}</p>
                                        </div>
                                        <div class="items">
                                            <p className="font-weight-bold">Original Language</p>
                                            <p className="mt-n2 text-muted">{details.original_language}</p>
                                        </div>
                                        <div class="items">
                                            <p className="font-weight-bold">Production Companies</p>
                                            
                                            {details.production_companies === undefined ? '-': details.production_companies.map((item,index) => {
                                                return (
                                                        <span key={index} className="text-muted">{item.name}, </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            
                        </div>

                    </div>
                    <div className="similar-movie">    
                            <p className="title ml-auto mt-4">Similar Movie</p>
                        <div class="sider">
                            {SimilarMovie}
                        </div>
                    </div>
                    <div class="recommend-movie">
                        <p className="title">Recommendations Movies</p>
                        <div class="sider">
                            {RecommendMovieList}
                        </div>
                    </div>
                    <Sticky/>
                </div>
                    <FooterMovie/>
            </div>
        </>
    )
}

export default Details;
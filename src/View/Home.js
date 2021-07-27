import React, { Component, useState, useEffect } from 'react';
import NavbarMovie from '../Component/Navbar';
import { InputGroup, Input, InputGroupAddon, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FormSearch} from '../Component/formSearch';
import FooterMovie from '../Component/FooterMovie';
import Sticky from '../Component/sticky';
import CarouselMovies from '../Component/carousel';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { fetchPlaying, fetchTopRated, fetchTVPopular, fetchUpComing, carousel, fetchTVTopRated, fetchTVLatest, fetchTVOnTheAir, fetchTVAiringToday } from '../Component/data/data-api';
import sticky from '../Component/sticky';

function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [inicarousel, setInicarousel] = useState([]);
    const [state,setState] = useState('movie');


    const [tvPopular, setTvPopular] = useState([]);
    const [tvTopRated, setTvTopRated] = useState([]);
    const [tvLatest, setTvLatest] = useState([]);
    const [tvOnTheAir, setTvOnTheAir] = useState([]);
    const [tvAiringToday, setTvAiringToday] = useState([]);
    const [autocarousel, setAutocarousel] = useState(0);

    const [times, setTimes] = useState();

        useEffect(() => {
            const fetchAPI = async () => {
                // setAutocarousel(await 1);
                setNowPlaying(await fetchPlaying());
                setTopRated(await fetchTopRated());
                setUpComing(await fetchUpComing());
                
                setTvPopular(await fetchTVPopular());
                setTvTopRated(await fetchTVTopRated());
                setTvLatest(await fetchTVLatest());
                setTvOnTheAir(await fetchTVOnTheAir());
                setTvAiringToday(await fetchTVAiringToday());
                setInicarousel(await carousel());
            }
            fetchAPI();
        },[]);

        const MoviesPlaying = nowPlaying.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        })

        const MovieTopRated = topRated.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}> 
                    <div class="poster">
                        <img src={item.poster} alt={item.title}/>
                    </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        })

        
        const MovieUpComing = upComing.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        })

        // fetch category TV Shows

        const tvShowsPopular = tvPopular.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        });

        const tvShowsTopRated = tvTopRated.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        });

        const tvShowsOnTheAir = tvOnTheAir.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        });

        const tvShowsAiringToday = tvAiringToday.slice(0,15).map((item, index) => {
            return(
                <div className="items" key={index}>
                    <Link to={`${state}/${item.id}`}>
                        <div class="poster">
                            <img src={item.poster} alt={item.title}/>
                        </div>
                        <p className="text-center mt-2">{item.title}</p>
                    </Link>
                </div>
            )
        });
        const MovieList = (
            <div>
                <div class="movie-list mt-2">
                    <p className="title">Now Playing</p>
                    <div class="slider">
                    {MoviesPlaying}
                    </div>
                </div>

                <div class="movie-list mt-1">
                    <p className="title">Up Coming Movies</p>
                    <div class="slider">
                    {MovieUpComing}
                    </div>
                </div>

                <div class="movie-list mt-1">
                    <p className="title">Top Rated Movies</p>
                    <div class="slider">
                    {MovieTopRated}
                    </div>
                </div>
            </div>
        );

        const TvShowsList = (
            <div>
                <div class="movie-list mt-2">
                    <p className="title">TV Popular</p>
                    <div class="slider">
                    {tvShowsPopular}
                    </div>
                </div>

                <div class="movie-list mt-1">
                    <p className="title">TV Shows Top Rated</p>
                    <div class="slider">
                    {tvShowsTopRated}
                    </div>
                </div>

                <div class="movie-list mt-1">
                    <p className="title">TV Shows On The Air</p>
                    <div class="slider">
                    {tvShowsOnTheAir}
                    </div>
                </div>

                <div class="movie-list mt-1">
                    <p className="title">TV Shows Airing Today</p>
                    <div class="slider">
                    {tvShowsAiringToday}
                    </div>
                </div>
            </div>
        );
        
            return (
            <>
                <NavbarMovie id="header"/>
                <div class="container ">
                    <FormSearch/>
                    <div class="news mt-4">
                        <p className="title">Trailer Movies</p>
                    </div>
                </div>
                <CarouselMovies carouselFetch={inicarousel} />
                <div class="container mb-4">
                    <div class="choose mx-auto">
                        <button className={`${state === 'movie' ? 'actived choose-movie' : 'choose-movie'}`} onClick={() => setState('movie')}>Movie</button>
                        <button className={`${state === 'tv' ? 'actived choose-tv' : 'choose-tv'}`} onClick={() => setState('tv')}>TV Shows</button>                        
                    </div>
                        {state === 'movie' ? MovieList : TvShowsList}
                        <Sticky/>
                </div>
                <FooterMovie id="about-us" />
            </>
        )
}

export default Home;
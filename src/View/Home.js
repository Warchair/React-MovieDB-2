import React, { Component, useState, useEffect } from 'react';
import NavbarMovie from '../Component/Navbar';
import { InputGroup, Input, InputGroupAddon, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FormSearch} from '../Component/formSearch';
import FooterMovie from '../Component/FooterMovie';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { fetchPlaying, fetchTopRated, fetchTVPopular, fetchUpComing, carousel, fetchTVTopRated, fetchTVLatest, fetchTVOnTheAir, fetchTVAiringToday } from '../Component/data/data-api';

function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [inicarousel, setInicarousel] = useState([]);
    const [state,setState] = useState('movie');
    // const [search, setSearch] = useState([]);


    const [tvPopular, setTvPopular] = useState([]);
    const [tvTopRated, setTvTopRated] = useState([]);
    const [tvLatest, setTvLatest] = useState([]);
    const [tvOnTheAir, setTvOnTheAir] = useState([]);
    const [tvAiringToday, setTvAiringToday] = useState([]);

        useEffect(() => {
            const fetchAPI = async () => {
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

        const input1 = inicarousel.slice(0,5).map((item,index) => {
            return (
                <input type="radio" name="slider" key={index} id={item.no} checked />
            )
        });

        const label1 = inicarousel.slice(0,5).map((item) => {
            return (
                <label className="w-75" for={item.no} id={item.slide}> 
                    <img src={item.backposter} alt={item.title} height="100%" width="100%"/>
                    <p className="mt-n5 text-center p-2">{item.title}</p>
                </label>
            )
        });

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

        // const tvShowsLatest = tvLatest.map((item, index) => {
        //     return(
        //         <div className="items" key={index}>
        //             <Link to={`tv/${item.id}`}>
        //                 <div class="poster">
        //                     <img src={item.poster} alt={item.title}/>
        //                 </div>
        //                 <p className="text-center mt-2">{item.title}</p>
        //             </Link>
        //         </div>
        //     )
        // });


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

        const AllCategoryMovie = [MoviesPlaying, MovieTopRated, MovieUpComing];
        console.log(AllCategoryMovie);

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
                <NavbarMovie/>
                <div class="container mb-4">
                    <FormSearch/>
                    <div class="news mt-4">
                        <p className="title">News Trailer Movies</p>
                        <div id="slider">
                            {input1}
                            {label1}
                        </div>
                    </div>
                    <div class="choose mx-auto mt-5">
                        <button className={`${state === 'movie' ? 'actived choose-movie' : 'choose-movie'}`} onClick={() => setState('movie')}>Movie</button>
                        <button className={`${state === 'tv' ? 'actived choose-tv' : 'choose-tv'}`} onClick={() => setState('tv')}>TV Shows</button>                        
                    </div>
                    {state === 'movie' ? MovieList : TvShowsList}
                    <a className="square text-center">
                        <ArrowUpwardIcon/>
                    </a>
                </div>

                <FooterMovie/>
            </>
        )
}

export default Home;
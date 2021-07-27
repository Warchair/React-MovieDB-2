import React, { Component, useState, useEffect } from 'react';
import { fetchGenre } from '../Component/data/data-api';
import {Link } from 'react-router-dom';
import NavbarMovie from '../Component/Navbar';
import { Pagination } from 'react-bootstrap';
import Sticky from '../Component/sticky';

function Genres({match}) {

    const params = match.params;
    const [movieGenres, setMovieGenres] = useState([[]]);
    const [active, setActive] = useState(1);
    const [currentPage, setCurrentPage] = useState([]);

    const [resultsGenres, totalPages] = movieGenres;
    let items = [];
    const test  = 15;
    for (let number = 1; number <= totalPages; number++) {
        items.push(number);
    }

    useEffect(() => {
        const fetchAPI = async () => {
            setCurrentPage(await Number(params.page));
            setMovieGenres(await fetchGenre(params.id, params.type, params.page));
        }

        fetchAPI();
    },[currentPage]);

    const pageLimit = (item) => {
        let dotinitial = '...';
        let dotleft = '...';
        let dotright = '...';

        if(item.length < 6) {
            return item;
        } else if(currentPage >= 1 && currentPage <= 3) {
            return [1, 2, 3, 4, dotinitial, item.length]
        } else if(currentPage === 4) {
            const sliced = item.slice(0,5);
            console.log(sliced);
            return [...sliced, dotinitial, item.length];
        } else if(currentPage > 4 && currentPage < item.length - 2) {
            const sliced1 = item.slice(currentPage - 2, currentPage + 1);
            console.log(sliced1);
            return [1, dotleft, ...sliced1, dotright, item.length]
        } else if(currentPage > item.length - 3) {
            const sliced = item.slice(item.length - 4);
            return [1, dotleft, ...sliced];
        } 
    };
    console.log(pageLimit(items));

    const page = pageLimit(items).map((number) => {
        return (
            <Pagination.Item 
                key={number} 
                id={number} 
                active={Number(params.page) === number} 
                // onClick={e => pageNumberClick(e)}
                href={`page=${number}`}
                
                className={number === '...' ? 'disabled' : 'actived'}>
                {number}
                </Pagination.Item>
        )
    })



    const paginations = (
        <div class="">
            <Pagination>
                <a 
                className="btn-prev" 
                href={`page=${currentPage === 1 ? currentPage : currentPage - 1}`}>
                Prevs
                </a>
                {page}
                <a 
                className="btn-next" 
                // onClick={e => setPageNextClick(e)}
                href={`page=${currentPage === items.length ? currentPage : currentPage + 1}`}>
                Next
                </a>
            </Pagination>
        </div>
    )

    const MovieData = resultsGenres.map((item,index) => {
        return (
            <div key={index} className="list-movie">
                <Link to={`../../../movie/${item.id}`}>
                    <div class="poster">
                        <img src={item.poster} alt=""/>
                    </div>
                    <p className="p-1 text-center">{item.title}</p>
                </Link>
            </div>
        )
    })

    return (
        <>
            <NavbarMovie/>
            <div class="container">
                <div class="movie-genres mt-4">
                    {MovieData}
                </div>
                {paginations}
                <Sticky/>
            </div>
        </>
    )
}

export default Genres;
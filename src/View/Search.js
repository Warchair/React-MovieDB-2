import React, { Component, useEffect, useState } from 'react';
import NavbarMovie from '../Component/Navbar';
import { fetchSearch, fetchTVSearch} from '../Component/data/data-api';
import {Link, useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Sticky from '../Component/sticky';

function DataSearch({match}) {


    // const { pages } = useParams();
    // console.log(pages);

    const params = match.params;

    const [resultSearch, setResultSearch] = useState([[]]);
    const [resultTVSearch, setResultTVSearch] = useState([[]]);
    const [inputValue,setInputValue] = useState('');

    const [currentPage, setCurrentPage] = useState();
    const [inputSearch, totalPages] = resultSearch;
    const [inputTVSearch, totalPagesTV] = resultTVSearch;
    const [state,setState] = useState(params.type);

    const pages = 122 ;
    let test = Math.floor(Math.random() * pages);
    console.log(totalPages);

    let items = [];

    if(params.type === 'movie') {
        for(let number = 1; number <= totalPages; number++ ) {
            items.push(number);
        }
    } else if(params.type === 'tv') {
        for(let number = 1; number <= totalPagesTV; number++ ) {
            items.push(number);
        }
    }

     useEffect(() => {
         const fetchAPI = async () => {
             setInputValue(await params.id.replace('+',' '));
             setCurrentPage(await Number(params.page));
             setResultSearch(await fetchSearch(params.id.replace('+',' '), params.page));
             setResultTVSearch(await fetchTVSearch(params.id.replace('+',' '), params.page));
        }
        fetchAPI();
    },[currentPage]);

    // // console.log(totalpages.length);
    const pageLimit = (items1) => {
            let dotinitial = '...';
            let dotleft = '...';
            let dotright = '...';

            if(items1.length < 6) {
                return items1;
            } else if(currentPage >= 1 && currentPage <= 3) {
                return [1, 2, 3, 4, dotinitial, items1.length]
            } else if(currentPage === 4) {
                const sliced = items1.slice(0,5);
                console.log(sliced);
                return [...sliced, dotinitial, items1.length];
            } else if(currentPage > 4 && currentPage < items1.length - 2) {
                const sliced1 = items1.slice(currentPage - 2, currentPage + 1);
                console.log(sliced1);
                return [1, dotleft, ...sliced1, dotright, items1.length]
            } else if(currentPage > items1.length - 3) {
                const sliced = items1.slice(items1.length - 4);
                return [1, dotleft, ...sliced];
            } 
    };

    const page = pageLimit(items).map((number) => {
            return (
                <a 
                key={number} 
                // id={number} 
                id={Number(params.page) === number ? 'active' : 'disactive'} 
                // onClick={e => pageNumberClick(e)}
                href={`page=${number}`}
                className={number === '...' ? 'disabled' : 'actived'}>
                {number}
                </a>
            )
        
    })

    console.log(pageLimit(items));

    const paginations = (
        <div >
            <div className="pagin mb-4">
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
            </div>
        </div>
    )

    const dataSearch = inputSearch.map((item,index) => {
        return (
            <div class="list-film" key={index}>
                <Link to={`../../../movie/${item.id}`}>
                    <div class="poster">
                        <img src={item.poster} alt=""/>
                    </div>
                    <p className="text-center p-1">{item.title}</p>
                </Link>
            </div>
        )
    })

    const dataTVSearch = inputTVSearch.map((item,index) => {
        return (
            <div class="list-film" key={index}>
                <Link to={`../../../tv/${item.id}`}>
                    <div class="poster">
                        <img src={item.poster} alt=""/>
                    </div>
                    <p className="text-center p-1">{item.title}</p>
                </Link>
            </div>
        )
    })

    const handleForm = async (e) => {
        e.preventDefault();
        window.location.href = `../q=${inputValue.replace(' ','+')}/page=1`;
        // setResultSearch(await fetchSearch(inputValue,currentPage));
    }

    return(
        <>
            <NavbarMovie/>
            <div class="container">
                <form onSubmit={e => handleForm(e)}>
                        <div class="search input-group mt-4">
                            <input type="text" className="" placeholder="Search..." value={inputValue} onChange={e => setInputValue(e.target.value)} />
                            <button  type="submit" className="ml-auto" value="submit" >Search</button>
                        </div>
                    </form>
                <p className="mt-2">Hasil Pencarian dari {params.id.replace('+',' ')}</p>
                <div class="type-search mt-1">
                        <Link className={`${state === 'movie' ? 'actived type-search-movie ' : 'type-search-movie'}`} onClick={() => setState('movie')} to={`../../movie/q=${inputValue.replace(' ','+')}/page=1`}>Movie <span>{totalPages}</span></Link>
                        <Link className={`${state === 'tv' ? 'actived type-search-tv ml-2' : 'type-search-tv ml-2'}`} onClick={() => setState('tv')} to={`../../tv/q=${inputValue.replace(' ','+')}/page=1`}>TV Shows <span>{totalPagesTV}</span></Link>                        
                    </div>
                <div class="hasil-input mt-3">
                    {params.type === 'movie' ? dataSearch : dataTVSearch}
                </div>
                {paginations}
                <Sticky/>
            </div>
        </>
    )
}


export default DataSearch;
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { fetchSearch } from './data/data-api';
import DataSearch from '../View/Search';

import { Link } from 'react-router-dom';
import { Search } from '@material-ui/icons';

export function FormSearch(props) {

    const [inputValue,setInputValue] = useState('');

    useEffect(() => {
        const fetchAPI = () => {
            // setSearch(await fetchSearch(inputValue));
        }
        fetchAPI();
    },[])

    const page = 1;
    const type = 'movie';
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `./search/${type}/q=${inputValue.replace(" ", "+")}/page=${page}`;
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div class="search input-group mt-4">
                    <input type="text" className="" placeholder="Search..." value={inputValue} onChange={e => setInputValue(e.target.value)} />
                     <button  type="submit" value="submit" className='ml-auto' >Search</button>
                </div>
            </form>
        </>
    )
}


export function FormSubmit() {


}
import React, { Component, useState } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function Sticky(props) {
    
    const handleClick = (e) =>  {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
    const [valueScroll, setValueScroll] = useState(0);
    window.addEventListener("scroll", function(event) {
        event.preventDefault();
        // this.scrollY = props.scrollOn;
        // this.scroll(props.scrollOn);
        setValueScroll(this.scrollY);
    }, false);
    
    return (
        <a className={`${valueScroll > 100 ? 'square show' : 'square'}`}  onClick={(e) => handleClick(e)}>
            <ArrowUpwardIcon/>
        </a>
    )
}

export default Sticky;
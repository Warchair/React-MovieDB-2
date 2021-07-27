import React, { Component, useState, useEffect, useRef } from 'react';
import { carousel} from '../Component/data/data-api';

// function useInterval(callback, delay) {
//     const savedCallback = useRef();
  
//     // Remember the latest callback.
//     useEffect(() => {
//       savedCallback.current = callback;
//     }, [callback]);
  
//     // Set up the interval.
//     useEffect(() => {
//       let id = setInterval(() => {
//         savedCallback.current();
//       }, delay);
//       return () => clearInterval(id);
//     }, [delay]);
//   }

function CarouselMovies(props) {

    const [selected, SetSelected] = useState(0);
    const [carouselMovies, setCarouselMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            setCarouselMovies(await carousel());
            const timer = setInterval(() => {
                SetSelected(selected => selected === 4 ? selected = 0 : selected + 1);
            },5000);
            return () => clearInterval(timer);
        }
        fetchMovies();
        
    },[]);


    const input1 = carouselMovies.slice(0,5).map((item,index) => {
        let i = 0;
        // let testing = document.getElementsByName('slider');
        // testing[selected].checked = true;
            
        // testing[index].addEventListener('click', function() {
        //     SetSelected(select => select = index);
        // })

        // console.log(console.log(testing[i]));
        // setInterval(function() {
        //     for(let a = 0; a < testing.length; a++) {
        //     testing[a].addEventListener('click', function() {
        //         // i = a;
        //         i = a;
        //     })
        // }
        //     if(i < testing.length) {
        //         testing[i].checked = true;
        //     } else if (i === 5) {
        //         i = 0;
        //         testing[i].checked = true;
        //     } else {
        //         testing[i].checked = true;
        //     }
        //     i++
        // },5000);
        return (            
            <input type="radio" name="slider" key={index} id={item.no} checked={index === selected} onClick={() => SetSelected(select => select = index)} className="carousel"/>
        )
    });

    const label1 = carouselMovies.slice(0,5).map((item) => {
        return (
            <label className="" for={item.no} id={item.slide}>
                <img src={item.backposter} alt={item.title}/>
                <p className="mt-n5 text-center">{item.title}</p>
            </label>
        )
    });

    return (
        <div className="trailer-news">
            {/* <p>Selected {selected} </p> */}
            <div id="slider">
                {input1}
                {label1}
            </div>
        </div>
    )
}


export default CarouselMovies;
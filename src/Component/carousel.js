import React, { Component, useState, useEffect, useRef } from 'react';
import { carousel} from '../Component/data/data-api';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ReactPlayer from 'react-player';
import {fetchTrailer} from '../Component/data/data-api';
import { Modal } from 'react-bootstrap';

function CarouselMovies(props) {

    const [selected, SetSelected] = useState(0);
    const [carouselMovies, setCarouselMovies] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [valueTrailer, setValueTrailer] = useState({id:'', type:'',title:''});
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const fetchMovies = async () => {
            setCarouselMovies(await carousel());
            setTrailer(await fetchTrailer(valueTrailer.id, valueTrailer.type));
            // const timer = setInterval(() => {
            //     SetSelected(selected => selected === 4 ? selected = 0 : selected + 1);
            // },5000);
            // return () => clearInterval(timer);
        }
        fetchMovies();
        
    },[valueTrailer.id]);

    const input1 = carouselMovies.slice(0,5).map((item,index) => {
        return (            
            <input type="radio" name="slider" key={index} id={item.no} checked={index === selected} onClick={() => SetSelected(select => select = index)} className="carousel"/>
        )
    });

    const handleClick = (id, type, title) => { 
        setValueTrailer({id:id, type:type, title:title});
        setIsOpen(true);
    }

    const label1 = carouselMovies.slice(0,5).map((item) => {
        return (
            <label className="" for={item.no} id={item.slide}>
                <div className="icons" >
                    <PlayCircleOutlineIcon className="trailer-icons" id="playbutton" onClick={() => handleClick(item.id, 'movie', item.title)} />
                </div>
                <img src={item.backposter} alt={item.title}/>
                <p className="mt-n5 text-center">{item.title}</p>
            </label>
        )
    });

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
                        {valueTrailer.title}
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

    // console.log(valueTrailer.id, valueTrailer.type);

    return (
        <>
            <TrailerMovie
                show={isOpen}
                onHide={() => {
                    setIsOpen(false)
                }}
                />

            <div className="trailer-news">
                {/* <p>Selected {selected} </p> */}
                <div id="slider">
                    {input1}
                    {label1}
                </div>
            </div>
        </>
    )
}


export default CarouselMovies;
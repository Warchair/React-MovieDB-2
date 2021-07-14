import { ContactsOutlined } from '@material-ui/icons';
import axios from 'axios';

const apikey = '421b76897a0a25d2886c0ec4f0e51942';
const url = 'https://api.themoviedb.org/3';
const nowPlaying = `${url}/movie/now_playing`;
const TopRated = `${url}/movie/top_rated`;
const UpComing = `${url}/movie/upcoming`;
const MoviesUrl = `${url}/movie`;
const discoverUrl = `${url}/discover`;
const searchUrl = `${url}/search/movie`;

const TVUrl =   `${url}/tv`;
const TVPopular =  `${url}/tv/popular`;
const TVTopRated = `${url}/tv/top_rated`;
const TVLatest = `${url}/tv/latest`;
const TVOnTheAir = `${url}/tv/on_the_air`;
const TVAiringToday = `${url}/tv/airing_today`;
const searchTVUrl = `${url}/search/tv`;



// data for images 

export const fetchImages = async (type, id) => {
    try {
        const { data } = await axios.get(`${MoviesUrl}/${id}/images`, {
            params: {
                api_key:apikey,
            }
        });
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['backdrops'].map((m) => ({
            backdrop_path: image +  m['file_path']
        }))

        console.log(type, id);
        return modifiedData;
    } catch(error) {}
}


// data for input Search
export const fetchSearch = async (keyword, pages) => {
    try {
        const { data } = await axios.get(searchUrl, {
            params: {
                api_key:apikey,
                language:'en_US',
                query:keyword,
                page:pages
            }
        })
        const totalpages = data['total_pages'];
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({

            id:m['id'],
            poster:image + m['poster_path'],
            title:m['title']
        }))
        return [modifiedData, totalpages];
    } catch(error) {}
}

export const fetchTVSearch = async (keyword, pages) => {
    try {
        const { data } = await axios.get(searchTVUrl, {
            params: {
                api_key:apikey,
                language:'en_US',
                query:keyword,
                page:pages
            }
        })
        const totalpages = data['total_pages'];
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({

            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name']
        }))
        return [modifiedData, totalpages];
    } catch(error) {}
}


// data for Genre Movies
export const fetchGenre = async (genre_id, genre_type, genre_page) => {
    try {
        const { data } = await axios.get(`${discoverUrl}/${genre_type}`,  {
            params: {
                api_key:apikey,
                language:'en_US',
                with_genres:genre_id,
                page:genre_page,
            }
        })

        const image = 'https://image.tmdb.org/t/p/original/';
        const totalpages = data['total_pages'];
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            title:m['title'],
            poster:image + m['poster_path']
        }))
        // console.log(totalpages);

        return [modifiedData, totalpages];
    } catch(error) {}
}


// data for Carousel News Trailer
export const carousel = async () => {
    try {
        const { data } = await axios.get(nowPlaying, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })

        for(let i = 0; i<5; i++) {
            data['results'][i]['no'] = `s${i}`;
            data['results'][i]['slide'] = `slide${i}`;
        }

        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
                    id:m['id'],
                    poster: image + m['poster_path'],
                    title:m['title'],
                    no:m['no'],
                    backposter: image + m['backdrop_path'],
                    vote_average:m['vote_average'],
                    slide:m['slide'],
        }));

        return modifiedData;
    }catch(error) {}
}


// data for Movies


export const fetchPlaying = async () => {
    try {
        const { data } = await axios.get(nowPlaying, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })

        // const md = data['results'];
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster: image + m['poster_path'],
            title:m['title'],
            // slider:slide,
            backposter: image + m['backdrop_path'],
            vote_average:m['vote_average']
        }));
        
        // console.log(modifiedData);
        return modifiedData;

    } catch(error) {

    }
}

export const fetchTopRated = async () => {
    try {
        const { data } = await axios.get(TopRated, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })

        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['title'],
            vote_average:m['vote_average']
        }))

        return modifiedData;

    } catch(error ) {

    }
}

export const fetchUpComing = async () => {
    try {
        const { data } = await axios.get(UpComing, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })

        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['title'],
            vote_average:m['vote_average']
        }))

        return modifiedData;

    } catch(error ) {

    }
}




export const fetchDetails = async (id, type) => {
    try {
        const { data } = await axios.get(`${url}/${type}/${id}`, {
            params: {
                api_key:apikey,
                language:'en_US',
            }
        })
        return data;

    } catch(error) {}
}

export const fetchTrailer = async (id, type) => {
    try {
        const { data } = await axios.get(`${url}/${type}/${id}/videos`, {
            params: {
                api_key: apikey,
                language:'en_US',
            }
        })

        return data['results'][0];
    } catch(error) {}
}

export const fetchCast = async (id, type) => {
    try {
        const { data } = await axios.get(`${url}/${type}/${id}/credits`, {
            params: {
                api_key: apikey,
                language:'en_US',
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['cast'].map((m) => ({
            id:m['id'],
            name:m['name'],
            character:m['character'],
            image: image + m['profile_path'],
        }))

        return modifiedData;
    } catch(error) {}
}

export const fetchCrews = async (id, type) => {
    try {
        const { data } = await axios.get(`${url}/${type}/${id}/credits`, {
            params: {
                api_key: apikey,
                language:'en_US',
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['crew'].map((m) => ({
            id:m['id'],
            name:m['name'],
            known_for_department:m['known_for_department'],
            image: image + m['profile_path'],
            job: m['job'],
            
        }));

        return modifiedData;
    } catch(error) {}
}


export const fetchSimilar = async (id, type) => {
    try {
        const { data } = await axios.get(`${url}/${type}/${id}/similar`, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            title:m['title'],
            poster:image + m['poster_path'],
            vote_average: m['vote_average']
        }))

        return modifiedData;
    } catch(error) {}
}

export const fetchRecommendMovie = async (id, type) => {

    const { data } = await axios.get(`${url}/${type}/${id}/recommendations`, {
        params: {
            api_key:apikey,
            language:'en_US',
            page:1,
        }
    })
    const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            title:m['title'],
            poster:image + m['poster_path'],
            vote_average: m['vote_average']
        }))
    return modifiedData;
}



// data fro TV Shows

export const fetchTVPopular = async () => {
    try {
        const { data } = await axios.get(TVPopular, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })

        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name'],
            vote_average:m['vote_average']
        }))

        return modifiedData;

    } catch(error ) {

    }
}


export const fetchTVTopRated = async () => {
    try {
        const { data } = await axios.get(TVTopRated, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name']
        }))
        return modifiedData;

    } catch(error) {

    }
}

export const fetchTVOnTheAir = async () => {
    try {
        const { data } = await axios.get(TVOnTheAir, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name']
        }))
        return modifiedData;

    } catch(error) {

    }
}

export const fetchTVLatest = async () => {
    try {
        const { data } = await axios.get(TVLatest, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data.map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name']
        }))
        return modifiedData;

    } catch(error) {

    }
}

export const fetchTVAiringToday = async () => {
    try {
        const { data } = await axios.get(TVAiringToday, {
            params: {
                api_key:apikey,
                language:'en_US',
                page:1
            }
        })
        const image = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id:m['id'],
            poster:image + m['poster_path'],
            title:m['name']
        }))
        return modifiedData;

    } catch(error) {

    }
}


export const fetchDetailsTV = async (id) => {
    try {
        const { data } = await axios.get(`${TVUrl}/${id}${id}`, {
            params: {
                api_key:apikey,
                language:'en_US'
            }
        });

        return data;
    } catch(error) {

    }
}


// export const fetchCrews = async (id) => {
//     try {
        
//     } catch(error) {

//     }
// }

// export const fetchCrews = async (id) => {
//     try {
        
//     } catch(error) {
        
//     }
// }

// export const fetchCrews = async (id) => {
//     try {
        
//     } catch(error) {
        
//     }
// }

// export const fetchCrews = async (id) => {
//     try {
        
//     } catch(error) {
        
//     }
// }

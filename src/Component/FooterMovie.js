import React, { Component } from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';


class FooterMovie extends Component {

    render() {
    // console.log('hello');

        return(
            <>
            <div class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7">
                            <h1>About <strong>US</strong></h1>
                            <div className="desc mt-3">
                                <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque pariatur debitis similique quisquam totam deserunt rerum, dicta asperiores voluptates nobis, ut voluptate provident cum facere velit, vel reprehenderit voluptatibus!</p>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quisquam iure? Excepturi, modi iure doloremque cupiditate sed temporibus harum. Laudantium, placeat! Cupiditate sapiente enim est.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione nemo sapiente necessitatibus dolor vero ex cupiditate facilis aspernatur pariatur? Illum vel itaque temporibus unde repudiandae tempore debitis animi porro? Fuga deserunt est id inventore tenetur.</p>
                            </div>
                        </div>
                        <div class="col-md-5 my-auto">
                            <div className="location">
                                <p className="text-center my-2">Serang, Banten, Indonesia</p>
                            </div>

                            <div class="info mt-5">
                                <a href="/React-MovieDB-2/">Information</a>
                                <a href="/React-MovieDB-2/">Ratings</a>
                                <a href="/React-MovieDB-2/">Language</a>
                                <a href="/React-MovieDB-2/">Blogs</a>
                                <a href="/React-MovieDB-2/">Contact Us</a>
                                <a href="/React-MovieDB-2/">Privacy Policy</a>
                                <a href="/React-MovieDB-2/">Faq</a>
                                <a href="https://www.github.com/Warchair">Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-2">
                    <div class="container">
                        <p className="">Movie<strong>GO</strong></p>
                        <div class="sosmed">
                            <a href="https://www.instagram.com/anwar.chair">
                                <InstagramIcon fontSize="medium"/>  
                            </a>
                            <a href="https://web.facebook.com/profile.php?id=100012292504457">
                                <FacebookIcon fontSize="medium"/>   
                            </a>
                            <a href="https://www.twitter.com/people_bngsd">
                                <TwitterIcon fontSize="medium"/>
                            </a>
                        </div>
                    </div>
            </div>
            </>
        )
    }
}

export default FooterMovie;
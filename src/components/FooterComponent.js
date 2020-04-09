import React from 'react';
import {Link} from 'react-router-dom';

const Footer = (props) => {
  return (
      <>
        <div className="nbmf-page-divider"></div>
        <div className="main-wrapper">
          <div className="footer">
            <div className="container">
              <div className="row-fluid clearfix text-center">
                <div className="col-sm-12">
                  <h3 className="white">Our Supporters</h3>
                  <div className="sponsor-strip">
                    <img src="/assets/images/sponsors/ava.jpg"/>
                    <img src="/assets/images/sponsors/ffwoin.gif"/>
                    <img src="/assets/images/sponsors/moshtix.gif"/>
                    <img src="/assets/images/sponsors/mvm.jpg"/>
                    <img src="/assets/images/sponsors/warringah-square.jpg"/>
                    <img src="/assets/images/sponsors/mdingle.gif"/>
                    <img src="/assets/images/sponsors/beachclub.jpg"/>
                    <img src="/assets/images/sponsors/cslsc.jpg"/>
                    <img src="/assets/images/sponsors/yha-logo.png"/>
                    <img src="/assets/images/sponsors/the_collaroy.png"/>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xs-12 col-sm-4">
                    <div className="front-page-shout-out white add-flags text-center">
                      <h4>Latest News</h4>
                      <ul className="list-unstyled">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/contactus">Contact</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <div className="front-page-shout-out white add-flags text-center">
                      <h4>Throw us a like</h4>
                      {/*<iframe*/}
                      {/*    src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fnorthernbeachesmusicfestival&amp;width&amp;height=258&amp;colorscheme=dark&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=192324187581423"*/}
                      {/*    scrolling="yes" frameborder="0" height="258" allowTransparency="true"></iframe>*/}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <div className="front-page-shout-out white add-flags">
                      <h4>Contact</h4>
                      <div className="info">
                        <p><b>LOCATION:</b>&nbsp; Collaroy Surf Club Pittwater Road, Collaroy NSW 2097</p>
                        <p><b>Paul Robertson(EP) email:</b> ffwoin23@optusnet.com.au</p>
                        <p><b>Follow us</b></p>
                      </div>
                      <p className="social-icons">
                        <a href="http://facebook.com/northernbeachesmusicfestival" title="NBMF Facebook"
                           target="_blank"><i
                            className="icon-facebook"></i></a>
                        <a href="https://twitter.com/nbmf1" title="NBMF Twitter" target="_blank"><i
                            className="icon-twitter"></i></a>
                        <a href="http://youtube.com/nbmusicfestival" title="NBMF Youtube" target="_blank"><i
                            className="icon-youtube"></i></a>
                        <a href="https://plus.google.com/+NorthernbeachesmusicfestivalOrgsydney" title="NBMF Google +"
                           target="_blank"><i className="icon-google-plus"></i></a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <p>© Copyright 2018 Ristorante Con Fusion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Footer;
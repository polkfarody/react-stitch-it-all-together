import React from 'react';
import {Link} from 'react-router-dom';

const Footer = (props) => {
  return (
      <>
        <div className="stitch-page-divider"></div>
        <div className="main-wrapper">
          <div className="footer">
            <div className="container">
              <div className="row-fluid clearfix text-center">
                <div className="col-sm-12">
                  <h3 className="white">Cool Things</h3>
                  <div className="sponsor-strip">

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
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <div className="front-page-shout-out white add-flags">
                      <h4>Contact</h4>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <p>&copy; Copyright 2020 Stitch It All Together</p>
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

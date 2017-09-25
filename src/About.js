import React from 'react';

const About = () => (
  <div className="container">
    <div className="row">
      <div className="heading">
        <h1>Tesla Model S/X Options Decoder</h1>
        <p className="lead">All rights belong to Tesla Motors. Option codes and descriptions pulled directly from their web site.</p>
      </div>
      <div className="col-md-6 col-md-offset-3">
        <p>
          I came across Fredrik Fjeld&apos;s original options decoder
          at <a href="http://options.teslastuff.net/">http://options.teslastuff.net/</a>. After making some
          improvements, I decided I wanted to reimplment the project in React, both to learn React
          some more and also so I could add more features to the decoder. So that&apos;s the
          story :)
        </p>
      </div>
    </div>
  </div>
);

export default About;

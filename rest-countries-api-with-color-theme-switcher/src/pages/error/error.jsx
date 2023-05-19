import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error-body">
      <header className="top-header"></header>

      {/* dust particle */}
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      {/* Dust particle end */}

      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      {/* END Lamp  */}
      <section className="error">
        {/* Content  */}
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We&apos;re sorry, the page you were looking for isn&apos;t found
              here. The link you followed may either be broken or no longer
              exists. Please try again, or take a look at our.
            </p>
          </div>
          <div className="error__nav e-nav">
            <Link to="/" className="e-nav__link" />
          </div>
        </div>
        {/* END Content  */}
      </section>
    </div>
  );
}

export default Error;

import flipjawn from "../logos/flipside.png";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        <a
          href="https://twitter.com/web3_analyst"
          className="footer-links"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jess the Analyst{" "}
        </a>
        &{" "}
        <a
          href="https://twitter.com/dawbyinz"
          className="footer-links"
          target="_blank"
          rel="noopener noreferrer"
        >
          d0bby
        </a>
      </h3>
      <div className="logo-footer">
        <h2 className="footer-bigtxt">Powered by</h2>
        <a
          href="https://flipsidecrypto.xyz/"
          className="footer-links"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={flipjawn} className="flipside-logo" alt="flipside" />{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;

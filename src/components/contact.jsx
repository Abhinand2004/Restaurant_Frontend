import "./css/contact.css";
import Logo from "./images/logo3.png";

export default function Contact() {
  return (
    <div className="contactBody" id="contact">
      <div className="contactBodyGrid1">
        <h5>CONNECT WITH US</h5>
        <p>
          <i className="fas fa-phone"></i> <span>+ 91 9567843340</span>
        </p>
        <p>
          <i className="fas fa-envelope"></i> <span>info@deepnetsoft.com</span>
        </p>
      </div>
      <div className="contactBodyGrid2">
        <img src={Logo} alt="logo" />
        <h1>
          <span className="deep">DEEP</span>
          <span className="net"> NET </span>
          <span className="soft">SOFT</span>
        </h1>
        <div className="icons">
          <div className="icon1">
            <i className="fab fa-facebook-f"></i>
          </div>
          <div className="icon2">
            <i className="fab fa-twitter"></i>
          </div>
          <div className="icon3">
            <i className="fab fa-youtube"></i>
          </div>
          <div className="icon4">
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
      <div className="contactBodyGrid3">
        <h5>FIND US</h5>
        <p>
          <i className="fas fa-map-marker-alt mapIcon"></i>
          <span>First floor, Geo infopark<br />Infopark EXPV, Kakkanad</span>
        </p>
      </div>
    </div>
  );
}
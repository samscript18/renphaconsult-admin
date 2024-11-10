import Image from "next/image";
import logo from "../../../public/images/logos/logo1.png";

const Navbar = () => {
  return (
    <>
      <nav className="relative">
        <Image src={logo} width={150} height={100} alt="logo" />
        <button
          className="nav-btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
      <div
        className="offcanvas offcanvas-top"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            <Image src={logo} width={200} height={150} alt="logo" />
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <a href="index.html">
              <li>Home</li>
            </a>
            <a href="service.html">
              <li>Our Service</li>
            </a>
            <a href="about.html">
              <li>About</li>
            </a>
            <a href="#faq">
              <li>FAQ</li>
            </a>
            <a href="blog.html">
              <li>Blog</li>
            </a>
            <a href="review.html">
              <li>Review</li>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;

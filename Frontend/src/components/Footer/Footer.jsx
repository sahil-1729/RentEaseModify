// import "../App.css"
const Footer = () => {
  return (
    <div
      className="Footer"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#040F0F",
        color: "#F5FBEF",
        padding: "1rem",
        paddingTop: "2.5rem",
        paddingBottom: "7rem",
        gap: "7rem",
        color: " #F6F6F6",
        marginTop : "2rem"
      }}
    >
      <div
        className="Section1"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "700",
          }}
        >
          RentEase
        </h1>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Our Services
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Post your Property{" "}
          </a>
        </div>
        <div style={{}}>
          <a
            style={{
              color: "#F5FBEF",
              fontSize: 21.82,
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
            href="url"
          >
            {" "}
            Articles
          </a>
        </div>
        <div style={{}}>
          <a
            style={{
              color: "#F5FBEF",
              fontSize: 21.82,
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
            href="url"
          >
            {" "}
            Customer Service
          </a>
        </div>
        <div style={{}}>
          <a
            style={{
              color: "#F5FBEF",
              fontSize: 21.82,
              fontFamily: "Poppins",
              fontWeight: "400",
            }}
            href="url"
          >
            {" "}
            Sitemap
          </a>
        </div>
      </div>
      <div
        className="Section2"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "700",
          }}
        >
          Company
        </h1>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            About us
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Contact us
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Request Info{" "}
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Feedback{" "}
          </a>
        </div>{" "}
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Report a problem{" "}
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#F5FBEF" }} href="url">
            {" "}
            Testimonials{" "}
          </a>
        </div>
      </div>
      {/* <div className="Section3">
        <h1
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "700",
          }}
        >
          Feedback
        </h1>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#D8F3DC" }} href="url">
            {" "}
            Report a problem
          </a>
        </div>
        <div
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}
        >
          <a style={{ color: "#D8F3DC" }} href="url">
            {" "}
            Testimonials{" "}
          </a>
        </div>
      </div> */}

      {/* <div className="Line1" style={{width: '50%', height: '50%', borderLeft: 'thick white solid 0.78px'}}></div> */}

      <div
        className="Section4"
        style={{
          width: "31%",
          fontSize: 18.7,
          fontFamily: "Poppins",
          fontStyle: "italic",
          fontWeight: "300",
        }}
      >
        <h1
          style={{
            fontSize: 21.82,
            fontFamily: "Poppins",
            fontWeight: "700",
          }}
        >
          About RentEase
        </h1>
        <p>
          RentEase is a comprehensive platform dedicated to streamlining the
          real estate journey for both sellers and buyers. Offering a range of
          services tailored to the needs of property sellers and buyers,
          RentEase provides a seamless experience from listing properties and
          connecting with potential buyers to various services, including
          property valuations, expert advice, and legal assistance. Our platform
          simplifies every step of the real estate process, ensuring
          transparency and efficiency. With a growing database of property
          listings and a strong community of users, RentEase is the ultimate
          destination for those seeking a hassle-free real estate experience.
        </p>
      </div>
    </div>
  );
};
export default Footer;

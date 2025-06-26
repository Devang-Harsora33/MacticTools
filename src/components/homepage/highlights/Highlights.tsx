import Links from "./Links";
import VideoCarousel from "./VideoCarousel";
// import VideoCarousel from "./VideoCarousel";
// import "../../styles/fonts.css";

function Highlights() {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden h-full bg-[#73573f] w-full"
    >
      <div className="screen-max-width mb-20">
        <div className="mb-8 w-full md:flex items-end justify-between md:mt-20">
          <h1
            id="title"
            className="section-heading"
            style={{
              color: "#fdfbf7",
              marginBottom: "2rem",
              marginLeft: "4rem",
            }}
          >
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end font-sf-pro gap-5">
            <Links />
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
}

export default Highlights;

import izabel from "/profilePictures/izabel.jpg";
import linda from "/profilePictures/linda.jpg";
import martin from "/profilePictures/martin.jpg";


export const AboutUs = () => {
  return (
    <>
      <section className="text-text-light w-3/4 tablet:max-w-screen-tablet m-auto pt-40">
        <h2 className="font-heading text-2xl text-center my-8">The idea</h2>
        <p className="font-body text">
          glim was founded on the principle that finding personalized products
          should be simpler. By filling out your profile, you receive tailored
          recommendations, allergy warnings, and products that are compatible
          with your needs, ensuring they work for you, not against you.
        </p>
        <h2 className="font-heading text-2xl text-center my-8">About us</h2>
        <p className="font-body">
          We are the ones that made this crazy website. It was made during three
          weeks as a final project for the Technigo bootcamp.
        </p>

        <p className="font-body my-14 text-center">
          If you are interested in getting in contact with us you can do so
          below.
        </p>

        <div className="flex m-10 justify-around">
          <div>
            <img
              src={linda}
              alt="Backend Extraordinair"
              className="w-20 rounded-full"
            />
            <h3 className="font-heading text-center text-xl my-2">Linda</h3>
            <div className="flex flex-col text-center">
              <a
                aria-label="Link to Linda's Linkedin"
                className="hover:opacity-75 active:opacity-50
               my-2"
                href="https://www.linkedin.com/in/lindafrischknecht/"
              >
                Contact me
              </a>
              <a
                aria-label="Link to Linda's Portfolio"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://linda-f-project-portfolio.netlify.app/"
              >
                Portfolio
              </a>
              <a
                aria-label="Link to Linda's Github"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://github.com/linda-f"
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <img
              src={izabel}
              alt="Designer Extraordinair"
              className="w-20 rounded-full "
            />
            <h3 className="font-heading text-center text-xl my-2">Izabel</h3>
            <div className="flex flex-col text-center">
              <a
                aria-label="Link to Izabel's Linkedin"
                className="hover:opacity-75 active:opacity-50
               my-2"
                href="https://www.linkedin.com/in/izabel-lind-f%C3%A4rnstrand-6336071a2/"
              >
                Contact me
              </a>
              <a
                aria-label="Link to Izabel's Portfolio"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://izabellindfarnstrand.netlify.app/"
              >
                Portfolio
              </a>
              <a
                aria-label="Link to Izabel's Github"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://github.com/Izzibizz"
              >
                GitHub
              </a>
            </div>
          </div>
          <div>
            <img
              src={martin}
              alt="Jack of all trades"
              className="w-20 rounded-full"
            />
            <h3 className="font-heading text-center text-xl my-2">Martin</h3>
            <div className="flex flex-col text-center">
              <a
                aria-label="Link to Martin's Linkedin"
                className="hover:opacity-75 active:opacity-50
               my-2"
                href="https://www.linkedin.com/in/martin-j%C3%B6nsson-058064163/"
              >
                Contact me
              </a>
              <a
                aria-label="Link to Martin's Portfolio"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://martin-joensson-portfolio.netlify.app/"
              >
                Portfolio
              </a>
              <a
                aria-label="Link to Martin's Github"
                className="hover:opacity-75 active:opacity-50
              "
                href="https://github.com/Martin-Joensson"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        {/* add the X of the bg-main-X to the aboveColor to make the Footer match*/}
      </section>
    </>
  );
};

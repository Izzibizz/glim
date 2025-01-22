import glim from "/glim-logo.svg";
import face1 from "/mockupimages/mockup-face1.png";
import face2 from "/mockupimages/mockup-face2.png";
import wideImage from "/mockupimages/mockup-faces.png";
import swoop from "/statement-swoop.svg";

export const Statements = ({ data }) => {
  return (
    <div className="bg-main-white text-text-dark leading-loose tablet:text-2xl ">
      <img className="w-full object-cover" src={swoop} alt="Section border" />
      <div className="p-6 tablet:p-10 laptop:p-20 desktop:mr-20">
        <div className="flex mb-8 items-end tablet:justify-center laptop:justify-end">

          

          <h2 className="font-heading text-4xl text-text-dark ml-6">{data.title}</h2>{" "}
          <img alt="picture of women" className="w-20 ml-10" src={glim} />

        </div>
        <p className="font-body tablet:text-center laptop:text-right">
          {data.subTitle}
        </p>
        <img alt="picture of women" className="my-10 mx-auto" src={wideImage} />
        <div>

          <img alt="picture of women" className="float-right w-1/4 mx-4" src={face1} />
           <p className="text-justify desktop:max-w-[1000px] font-body m-4">{data.text}</p>
        </div>
        <img alt="picture of women" className="w-2/3 tablet:w-1/3 m-auto my-20" src={face2} />
           <h3 className="text-4xl font-body text-center w-44 m-auto mb-4">{data.lastlineLarge}</h3>
        <p className="font-body text-2xl text-center font-light w-44 leading-loose m-auto">

          {data.lastLines}
        </p>
      </div>
    </div>
  );
};




import { Slideshow } from "./WhyUsSlideshow";
import data2 from "../data.en.json";

export const Footer = ({ providedData }) => {
  let data = null;

  if (!providedData) data = data2.homepage.footer;
  else data = providedData;

  const missionStatement = data.missionStatement;
  const contact = data.contactInfo;

  const perkArray = missionStatement.perks;

  return (
    <>
      <section className="bg-main-red laptop:w-9/12 mx-auto">
        <div className=" text-text-light">
          <div className="p-6 tablet:p-10 laptop:p-20">
            <div className="flex mb-8 items-end justify-center">
              <h2 className="font-heading text-3xl tablet:text-4xl text-center pt-2">
                {missionStatement.title}
              </h2>
            </div>

            <Slideshow items={perkArray} />
            <div className="grid grid-cols-2 ">
              {missionStatement.perks &&
                missionStatement.perks.map((item, index) => (
                  <div
                    key={index}
                    className="text-center my-8 hidden laptop:block"
                  >
                    <h3 className="font-heading text-2xl my-2">{item.perk}</h3>
                    <p className="hidden font-extralight w-[45ch] tablet:block m-auto">
                      {item.comment}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-main-green text-text-light p-4 laptop:p-10">
        <h2 className="font-heading text-2xl laptop:text-3xl text-center mb-6">
          {contact.title}
        </h2>

        <div className="flex whitespace-pre text-body flex-col items-center laptop:flex-row laptop:justify-around laptop:w-2/3 laptop: m-auto align-center">
          {contact.contactRoute.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-1/5 my-6">
              <img className="w-8" src={item.icon} alt={item.altText} />
              <p className="text-center font-extralight">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          {contact.socialMedia.map((item, index) => (
            <img
              key={index}
              className="w-6 hover:opacity-75 hover:cursor-pointer active:opacity-50"
              src={item.icon}
              alt={item.altText}
            />
          ))}
        </div>
      </section>
    </>
  );
};

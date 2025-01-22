import { Loading } from "../components/Loading";

export const NotFound = ({ reason }) => {

  console.log(reason)
  return (
    <div className="bg-main-red pt-24 ">
      <h2 className="text-center font-heading py-40 text-text-light text-2xl">
        The {reason} you are looking for was not found.
      </h2>
      <Loading />


    </div>
  );
};

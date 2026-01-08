import React from "react";
import Greetings from "../components/shared/Home/Greetings";
import {BsCashCoin} from "react-icons/bs"
import {GrInProgress} from "react-icons/gr"
import MiniCard from "../components/shared/Home/minicard";
const Home = () => {
  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-64px)] overflow-visible flex flex-row gap-4 p-3 ">
      {/* left div */}
      <div className="flex-3 rounded-xl min-h-[300px]">
      <Greetings/>
      <div className="flex items-center w-full gap-3 px-8 mt-5">
        <MiniCard title = "Total earnings" icon = {<BsCashCoin/>} number={512} footernum={1.6}/>
        <MiniCard title = "In Progress" icon={<GrInProgress/>} number={16} footernum={1.6} />
      </div>
      </div>
      {/* right div */}
      <div className="flex-2 bg-[#1a1a1a] rounded-xl min-h-[300px]"></div>
    </section>
  );
};

export default Home;

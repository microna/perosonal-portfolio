import TechIcon from "../components/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { iconsList } from "../constants";

const TechStack = () => {
  return (
    <div className="w-full h-full">
      <div className="">
        <div className="container mx-auto md:p-0 px-0">
          <TitleHeader
            title={"MY TECH STACK"}
            number={"02"}
            text={"Mu Go-To Tools for Crafting Excellence"}
          />
        </div>
        <div className="md:mt-20 mt-10 relative">
          <div className="marquee h-52 ">
            <div className="marquee-box md:gap-12 gap-5">
              {iconsList.map((icon, index) => (
                <TechIcon key={index} icon={icon} />
              ))}
              {iconsList.map((icon, index) => (
                <TechIcon key={index} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;

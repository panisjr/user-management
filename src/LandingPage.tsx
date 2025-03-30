import { Typewriter } from "react-simple-typewriter";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-5">
      <div>
        <h1 className="text-3xl font-bold">
          <Typewriter
            words={[
              "Hi, I'm Ramel!",
              "Building with React-Typescript Application",
              "Hope you like!",
            ]}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1000}
          />
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative w-[430px] max-w-[430px] aspect-[430/310.41] flex flex-col justify-around">
          <img
            src="/images/robot.jpg"
            className="rounded-md"
            alt="Blog Image"
          />
        </div>
        <div>
          <i>Better to wait than force things to happen :)</i>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

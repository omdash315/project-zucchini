import LeftLightString from "./left-light-string";
import RightLightString from "./right-light-string";

export function LightStrings() {
  return (
    <>
      {/* Left light string - positioned relative to logo */}
      <div className="md:block hidden absolute top-[5vw] -left-[35vw] md:-left-[35vw] w-[50vw] md:w-[40vw] h-[40vw] md:h-[30vw] pointer-events-none z-[-1]">
        <LeftLightString />
      </div>

      {/* Right light string - positioned relative to logo */}
      <div className="md:block hidden absolute top-[5vw] -right-[35vw] md:-right-[25vw] w-[50vw] md:w-[40vw] h-[40vw] md:h-[30vw] pointer-events-none z-[-1]">
        <RightLightString />
      </div>
    </>
  );
}

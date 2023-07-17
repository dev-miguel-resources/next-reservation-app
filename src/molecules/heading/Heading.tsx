"use client";
import HeadingProps from "@molecules/heading/interfaces/headingProps.interface";

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => (
  <div className={center ? "text-center" : "text-start"}>
    <div className="text-2x1 font-bold">{title}</div>
    <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
  </div>
);

export default Heading;

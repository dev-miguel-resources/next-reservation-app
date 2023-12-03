"use client";

import Image from "next/image";
import { AvatarProps } from "./interfaces/avatarProps.interface";

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <Image className="rounded-full" height="30" width="30" alt="Avatar" src={src || "/images/placeholder.jpg"} />
);

export default Avatar;

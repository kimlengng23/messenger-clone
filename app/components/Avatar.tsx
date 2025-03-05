"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "@/app/hooks/useActiveList";
interface AvatarProps {
  user?: User;
}
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) != -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-12 w-12 md:h-12 md:w-12">
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-1 right-1 h-3 w-3 md:h-3 md:w-3" />
      )}
    </div>
  );
};
export default Avatar;

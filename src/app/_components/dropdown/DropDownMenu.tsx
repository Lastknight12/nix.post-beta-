import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function DropDownMenu({
  userName,
  email,
  image,
}: {
  userName: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}) {
  return (
    <>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="user">
          <div className=" flex items-center gap-3 border-b-1 border-[#353434] pb-3">
            <Image
              className=" rounded-full"
              src={image!}
              width={50}
              height={50}
              alt="user image"
            />
            <div>
              <p className="light light:text-black dark:text-white">
                {userName}
              </p>
              <p className="light light:text-black dark:text-white">{email}</p>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem
          key="profile"
          className=" transition-colors hover:bg-[#2c2c2c]"
        >
          <Link
            href={"/profile/" + userName}
            className=" light light:text-[#000] dark:text-[#fff]"
          >
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger transition-colors hover:bg-[#2c2c2c]"
          color="danger"
          onClick={() => signOut()}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </>
  );
}
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { UserButton } from "@clerk/nextjs";

export default function TopNav() {

    return (
        <div className="flex flex-row justify-between items-center">
            <HamburgerMenu />
            <Image src="/Logo ADI.png" alt="LOGO ADI" width={100} height={50} /> 
            <UserButton/>
        </div>
    )
}
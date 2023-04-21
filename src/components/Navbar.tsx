import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <nav>
      <div className="w-auto bg-gray-100 h-16 flex justify-between  flex-wrap items-center shadow-md">
        <div className="md:hidden flex items-center ml-5">
          <BurgerMenuButton open={open} onToggle={handleToggle} />
        </div>
        <div className="text-xl ml-5 font-bold m-2">Your Greenhouse</div>
        <div className="max-md:hidden flex-grow w-max">
          <Toolbar />
        </div>
        <div className="mr-5">
          <img alt="user icon" src="placeholder-user.png" />
        </div>
      </div>
      <div className="md:hidden">
        <Drawer open={open} />
      </div>
    </nav>
  );
}
interface BurgerMenuButtonProps {
  open: boolean;
  onToggle: () => void;
}

function BurgerMenuButton({ open, onToggle }: BurgerMenuButtonProps) {
  let icon = open ? "cross-button.svg" : "burger-bar.png";

  return (
    <div className="cursor-pointer" onClick={onToggle}>
      <img className="w-8" alt="menu" src={icon} />
    </div>
  );
}
interface DrawerProps {
  open: boolean;
}
function Drawer({ open }: DrawerProps) {
  return (
    <div>
      {open ? (
        <div className="w-auto overflow-hidden shadow-md bg-gray-100 p-2">
          <DrawerItem link={"/"}>Status</DrawerItem>
          <DrawerItem link={"/timeline"}>Timeline</DrawerItem>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
interface DrawerItemProps {
  link: string;
}

function DrawerItem({
  children,
  link,
}: React.PropsWithChildren<DrawerItemProps>) {
  return (
    <div className="w-auto hover:bg-gray-200 duration-200 text-lg rounded-lg px-2 py-1 m-3">
      <Link to={link}>{children}</Link>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="flex justify-start flex-nowrap">
      <ToolbarItem link={"/"}>Status</ToolbarItem>
      <ToolbarItem link={"/timeline"}>Timeline</ToolbarItem>
    </div>
  );
}
interface ToolbarItemProps {
  link: string;
}
function ToolbarItem({
  children,
  link,
}: React.PropsWithChildren<ToolbarItemProps>) {
  return (
    <div className="ml-8 hover:bg-gray-200 px-3 py-1 cursor-pointer rounded-md duration-200">
      <Link to={link}>{children}</Link>
    </div>
  );
}

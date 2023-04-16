import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      <div className="w-auto bg-gray-100 h-16 flex justify-between flex-wrap items-center shadow-md">
        <div className="flex items-center flex-shrink-0 ml-5">
          <BurgerMenuButton
            open={open}
            setOpen={handleOpen}
            setClose={handleClose}
          />
        </div>
        <div className="text-xl font-bold m-2">Your Greenhouse</div>
        <div className="mr-5">
          <img alt="user icon" src="placeholder-user.png" />
        </div>
      </div>
      <Drawer open={open} />
    </nav>
  );
}

function BurgerMenuButton(props) {
  let icon = props.open ? "cross-button.svg" : "burger-bar.png";

  const toggle = () => {
    if (props.open) {
      props.setClose();
    } else {
      props.setOpen();
    }
  };

  return (
    <div onClick={toggle}>
      <img className="w-8" alt="menu" src={icon} />
    </div>
  );
}

function Drawer(props) {
  return (
    <div>
      {props.open ? (
        <div className="w-auto overflow-hidden shadow-md bg-gray-100 p-2">
          <DrawerItem link="/">Status</DrawerItem>
          <DrawerItem link="/timeline">Timeline</DrawerItem>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function DrawerItem(props) {
  return (
    <div className="w-auto hover:bg-gray-200 duration-200 text-lg font rounded-lg px-2 py-1 m-3">
      {props.children}
    </div>
  );
}

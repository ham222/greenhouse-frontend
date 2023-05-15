import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function ModallgallScreen({
  open,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-start justify-center text-center lg:items-center lg:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
              enterTo="opacity-100 translate-y-0 lg:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 lg:scale-100"
              leaveTo="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden max-lg:h-screen lg:rounded-lg bg-white text-left shadow-xl transition-all lg:my-8 w-full lg:max-w-lg">
                <Dialog.Title
                  as="h3"
                  className="text-xl mt-4 text-center font-semibold leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="h-full grid ">
                  <div>{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

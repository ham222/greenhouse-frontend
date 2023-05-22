import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  showAlert: boolean;
}

export default function ModallgallScreen({
  open,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 lg:hidden bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[1] overflow-y-auto">
          <div className="flex items-start justify-center text-center lg:items-center lg:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
              enterTo="opacity-100 translate-y-0 lg:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 lg:scale-100"
              leaveTo="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
            >
              <Dialog.Panel className="relative lg:hidden overflow-scroll transform max-lg:h-screen lg:rounded-lg bg-white text-left shadow-xl transition-all lg:my-8 w-full lg:max-w-lg">
                <div className=" grid">
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

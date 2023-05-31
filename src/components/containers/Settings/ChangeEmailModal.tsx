import { useEffect } from "react";
import Modal from "src/components/UI/Modal";

interface ChangeEmailModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  email: string;
  updateEmail: (email: string) => void;
}

export default function ChangeEmailModal({
  open,
  onClose,
  onSave,
  email,
  updateEmail,
}: ChangeEmailModalProps) {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) onClose();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  function isValid() {
    return true;
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (!isValid()) return;

    updateEmail(value);
  };

  return (
    <>
      <Modal title={"Change e-mail"} open={open} onClose={onClose}>
        <div className="bg-white p-6">
          <div className="mt-2 flex justify-around">
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-3"
              >
                E-mail:
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
                className="mt-2 block pl-3 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 appearance-none focus:outline-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex flex-row-reverse sm:px-6">
          <button
            type="button"
            disabled={isValid() !== true || !open}
            className="inline-flex disabled:text-gray-300 max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="inline-flex max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

import Modal from "src/components/UI/Modal";
import PresetItem from "./PresetItem";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface ViewAllPresetsModalProps {
  open: boolean;
  onClose: () => void;
}

let ViewAllPresetsModal = ({
  open,
  onClose,
}: ViewAllPresetsModalProps): JSX.Element => {
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${API_URL}/preset`;
        const response = await axios.get(url);
        setState(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal title={""} open={open} onClose={onClose}>
        <div className="flex flex-col items-center ">
          <button
            className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200 md:hidden"
            onClick={() => onClose()}
          >
            Create new Preset
          </button>
          {state.map((item: any) => (
            <PresetItem key={item.name} presetName={item.name}></PresetItem>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ViewAllPresetsModal;

import Vitals from "./Vitals";

export default function Status() {
  return (
    <>
      <Vitals temperature={21} humidity={37} co2={20.5}/>
    </>
  );
}

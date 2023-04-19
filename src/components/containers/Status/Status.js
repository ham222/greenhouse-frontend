import CurrentValBox from "./CurrentValBox";

export default function Status() {
  return (
    <>
      <CurrentValBox
        temperature={24.8}
        datetime={new Date().toLocaleTimeString()}
        humidity={37}
        co2={22.5}
      ></CurrentValBox>
    </>
  );
}

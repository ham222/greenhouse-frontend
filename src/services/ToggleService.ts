import axios from "axios";

export async function getToggle(): Promise<boolean> {
  let toggle;

  try {
    let url = `http://localhost:3100/api/watering-system/toggle`;
    const response = await axios.get(url);
    if (response.status !== 200) return false;

    toggle = response.data.state;
  } catch (error) {
    console.error(error);
    return false;
  }
  return toggle;
}

export async function postToggle(newState: boolean, newDuration: number) {
  try {
    let url = `http://localhost:3100/api/watering-system/toggle`;
    const response = await axios.post(url, {
      state: newState,
      duration: newDuration,
    });
    if (response.status !== 200) return;
  } catch (error) {
    console.error(error);
    return;
  }
}

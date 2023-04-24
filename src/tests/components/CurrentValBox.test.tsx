import {describe} from '@jest/globals';
import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentValBox from "../../components/containers/Status/CurrentValBox";

describe('CurrentValBox', () => {
    it("renders props correctly", () => {

        render(
          <CurrentValBox
            temperature="25"
            co2="400"
            humidity="60"
            datetime={"10:00 12/20/2022"}
          />
        );
        
        expect(screen.getByText("25°C")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();
        expect(screen.getByText("400 ppm")).toBeInTheDocument();
        expect(screen.getByText("at 10:00 12/20/2022")).toBeInTheDocument();
      });
});
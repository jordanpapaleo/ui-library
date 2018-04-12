jest.mock("react-jss");

import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

import Calendar from "./Calendar";

describe("Calendar", () => {
  fit("should render", () => {
    const tree = shallow(<Calendar />);
    console.log(tree);
  });
});

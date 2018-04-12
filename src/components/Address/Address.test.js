import React from "react";
import ReactDOM from "react-dom";
import Address from "./Address";
import renderer from "react-test-renderer";

const address = {
  street: "123 Sesame Street",
  city: "New York",
  state: "NY",
  zipcode: "12345-6789"
};

describe("Address", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Address address={address} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Address address={address} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should test Street function", () => {
    const wrapper = new Address({ address });
    console.log(wrapper);
    const result = Address.Street({ address, twoLines: true });
    console.log(result);
  });
});

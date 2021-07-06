import React, { Component } from "react";

class BuildBlock extends Component {
  render() {
    return (
      <div>
        <p>{this.props.data.x}</p>
        <h2>{this.props.data.y}</h2>
      </div>
    );
  }
}

function factory(data, BuildBlock, listOptions ,itemOptions) {
  return class List extends Component {
    render() {
      return (
        <ul {...listOptions}>
          {data.map((element) => (
            <li {...itemOptions} >
              <BuildBlock data={element} />
            </li>
          ))}
        </ul>
      );
    }
  };
}

export default new factory(
  [
    { x: 10, y: 20 },
    { x: 10, y: 20 },
  ],
  BuildBlock,
  { style: { color: "red" }, name: "hakeem" } , 
  {style:{listStyleType:"none"}}
);

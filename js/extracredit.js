class ReactButton extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      count: state.count + 1
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>Times Clicked: {this.state.count}</button>
    );
  }
}

class ButtonCount extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: "open" });

    let button_container = document.createElement("div");

    shadow.appendChild(button_container);

    let root = ReactDOM.createRoot(button_container);
    root.render(<ReactButton />);
  }
}

customElements.define("button-count", ButtonCount);
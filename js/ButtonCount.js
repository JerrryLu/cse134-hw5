class ButtonCount extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: "open" });

    this.button_clicks = 0;
    let button_element = document.createElement("button");
    button_element.innerHTML = "Times Clicked: 0";
    let click_increment = () => {
      this.#click_function();
    };
    button_element.addEventListener('click', click_increment);

    shadow.appendChild(button_element);
  }

  #click_function() {
    let button_element = this.shadowRoot.querySelector("button");
    this.button_clicks++;
    button_element.innerHTML = "Times Clicked: " + this.button_clicks;
  }
}

customElements.define("button-count", ButtonCount);
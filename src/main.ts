import { ConfigureSectionDOM } from "./classes/configureSection";
import { CreateDom } from "./classes/createDOM";

function Main() {
  const domBuilder = new CreateDom();
  const configBuilder = new ConfigureSectionDOM();
}

document.addEventListener("DOMContentLoaded", Main);

import { ConfigureSectionDOM } from "./classes/configureSection";
import { CreateDom } from "./classes/createDOM";

let domBuilder: CreateDom;
let configBuilder: ConfigureSectionDOM;
function Main() {
  domBuilder = new CreateDom();
  configBuilder = new ConfigureSectionDOM();
}

document.addEventListener("DOMContentLoaded", Main);

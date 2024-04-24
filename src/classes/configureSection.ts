import submitted from "../utils/buttonSubmitted";
import { defaultServices, defaultUsing } from "../utils/defaultValues";
import { getElement, setEventListener } from "../utils/domManager";
import {
  DeleteServices,
  GetServices,
  StoreServices,
} from "../utils/storeConfigurations";

export class ConfigureSectionDOM {
  btnShowConfig: HTMLButtonElement | undefined;
  configurationPanel: HTMLDivElement | undefined;
  isDisplaying: HTMLInputElement | undefined;
  displaySpan: HTMLSpanElement | undefined;
  inputConfigServices: HTMLInputElement | undefined;
  inputConfigUsings: HTMLInputElement | undefined;

  commonServicesResult: HTMLTextAreaElement | undefined;
  commonUsingResult: HTMLTextAreaElement | undefined;
  btnSaveConf: HTMLButtonElement | undefined;
  btnDeleteConf: HTMLButtonElement | undefined;

  constructor() {
    this.initElements();
    this.setupEventListeners();
  }

  private initElements(): void {
    this.btnShowConfig = getElement<HTMLButtonElement>("#show-config");
    this.configurationPanel = getElement<HTMLDivElement>("#configuration");
    this.isDisplaying = getElement<HTMLInputElement>("#show-config #showing");
    this.displaySpan = getElement<HTMLSpanElement>("#show-config span");

    this.inputConfigServices = getElement<HTMLInputElement>("#defaultServices");
    this.inputConfigUsings = getElement<HTMLInputElement>("#defaultUsing");

    this.commonServicesResult = getElement<HTMLTextAreaElement>(
      "#commonServicesResult"
    );
    this.commonUsingResult =
      getElement<HTMLTextAreaElement>("#commonUsingResult");

    this.btnSaveConf = getElement<HTMLButtonElement>("#save-conf");
    this.btnDeleteConf = getElement<HTMLButtonElement>("#delete-conf");

    this.toggleConfigDisplay();
    this.loadConfigDisplay();
  }

  private setupEventListeners(): void {
    setEventListener([
      {
        element: this.btnShowConfig!,
        event: this.triggerDisplay.bind(this),
        eventName: "click",
      },

      {
        element: this.btnSaveConf!,
        event: () => {
          StoreServices(this.inputConfigServices!.value, "commonServices");
          StoreServices(this.inputConfigUsings!.value, "commonUsing");
          this.loadConfigDisplay();
          submitted(this.btnSaveConf!, "Configuration Saved");
        },
        eventName: "click",
      },

      {
        element: this.btnDeleteConf!,
        event: () => {
          DeleteServices();
          submitted(this.btnSaveConf!, "Configuration deleted");
          this.loadConfigDisplay();
        },
        eventName: "click",
      },
    ]);
  }
  private triggerDisplay() {
    this.isDisplaying!.checked = !this.isDisplaying!.checked;
    this.toggleConfigDisplay();
  }
  private toggleConfigDisplay() {
    if (this.isDisplaying!.checked) {
      this.configurationPanel!.classList.remove("hidden");
      this.configurationPanel!.classList.add("visible");
      this.displaySpan!.textContent = "Hide configuration";
    } else {
      this.configurationPanel!.classList.remove("visible");
      this.configurationPanel!.classList.add("hidden");
      this.displaySpan!.textContent = "Show configuration";
    }
  }

  private loadConfigDisplay() {
    const commonServices = GetServices("commonServices");
    const commonUsing = GetServices("commonUsing");
    let displayServices: string;
    let displayUsing: string;

    if (commonServices && commonServices.length > 0) {
      displayServices = commonServices.join("\n");
    } else {
      displayServices = "Default options: \n" + defaultServices.join("\n");
    }
    if (commonUsing && commonUsing.length > 0) {
      displayUsing = commonUsing
        .map((item) => "using " + item + ";")
        .join("\n");
    } else {
      displayUsing = "Default options: \n" + defaultUsing.join("\n");
    }
    this.commonServicesResult!.value = displayServices;
    this.commonUsingResult!.value = displayUsing;
  }
}

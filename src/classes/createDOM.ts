import { selectTypes } from "../bc/types/domTypes";
import submitted from "../utils/buttonSubmitted";
import { copyFromInput } from "../utils/copyFromInput";
import { defaultServices } from "../utils/defaultValues";
import { getElement, setEventListener } from "../utils/domManager";
import {
  generateClass,
  filterClass,
  generateMethod,
  requestInitializer,
  getBaseName,
} from "../utils/generateClass";
import { handlerRegex, testRegex, validatorRegex } from "../utils/nameRegex";
import { GetServices } from "../utils/storeConfigurations";

export class CreateDom {
  expectSelect: HTMLSelectElement | undefined;
  testNameInput: HTMLInputElement | undefined;
  codeResultText: HTMLTextAreaElement | undefined;
  classModeInput: HTMLInputElement | undefined;
  servicesInput: HTMLInputElement | undefined;
  addServicesContainer: HTMLDivElement | undefined;
  btnAddCommonServices: HTMLButtonElement | undefined;
  btnCreateCode: HTMLButtonElement | undefined;
  classContent: HTMLDivElement | undefined;
  defaultUsing: HTMLInputElement | undefined;
  copyCode: HTMLButtonElement | undefined;
  btnClearServices: HTMLButtonElement | undefined;

  commandQuery: HTMLInputElement | undefined;

  constructor() {
    this.initElements();
    this.setupEventListeners();
  }

  private initElements(): void {
    this.expectSelect = getElement<HTMLSelectElement>("#testSelect");
    this.testNameInput = getElement<HTMLInputElement>("#value");
    this.codeResultText = getElement<HTMLTextAreaElement>("#result");
    this.classModeInput = getElement<HTMLInputElement>("#classMode");
    this.servicesInput = getElement<HTMLInputElement>("#services");
    this.addServicesContainer = getElement<HTMLDivElement>("#add-services");
    this.btnAddCommonServices =
      getElement<HTMLButtonElement>("#commonServices");
    this.btnCreateCode = getElement<HTMLButtonElement>("#convert");
    this.classContent = getElement<HTMLDivElement>(".class-builder");
    this.defaultUsing = getElement<HTMLInputElement>("#using");
    this.commandQuery = getElement<HTMLInputElement>("#request");

    this.copyCode = getElement<HTMLButtonElement>("#copy");
    this.btnClearServices = getElement<HTMLButtonElement>("#clear-services");
    this.clearBtnClear();
    this.toggleClassContent();
  }

  private setupEventListeners(): void {
    setEventListener([
      {
        element: this.expectSelect!,
        event: this.evaluateString.bind(this),
        eventName: "input",
      },
      {
        element: this.btnCreateCode!,
        event: this.evaluateString.bind(this),
        eventName: "click",
      },
      {
        element: this.btnAddCommonServices!,
        event: this.presetServices.bind(this),
        eventName: "click",
      },
      {
        element: this.classModeInput!,
        event: this.toggleClassContent.bind(this),
        eventName: "input",
      },
      {
        element: this.copyCode!,
        event: () => {
          copyFromInput(this.codeResultText!);
          submitted(this.copyCode!, "Text copied to the clipboard");
        },
        eventName: "click",
      },
      {
        element: this.btnClearServices!,
        event: () => {
          this.servicesInput!.value = "";
          this.servicesInput!.textContent = "";
          this.servicesInput!.dispatchEvent(new Event("input"));
        },
        eventName: "click",
      },
      {
        element: this.servicesInput!,
        eventName: "input",
        event: (e) => {
          if (e.target instanceof HTMLInputElement) {
            const { value } = e.target;

            if (value.trim().length > 0) {
              this.btnClearServices!.hidden = false;

              return;
            }
            this.btnClearServices!.hidden = true;
          }
        },
      },
    ]);
  }

  private presetServices(): void {
    const configServices = GetServices("commonServices");
    if (configServices && configServices.length > 0) {
      this.servicesInput!.value = configServices.join(",");
    } else {
      this.servicesInput!.value = defaultServices.join(",");
    }
    this.servicesInput!.dispatchEvent(new Event("input"));
  }

  evaluateString(e: Event) {
    if (
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLButtonElement
    ) {
      const inputValue = this.testNameInput!.value.trim();

      let filteredValue = inputValue
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/_[Qq]uery|_[Cc]ommand/g, "");
      if (!filteredValue.endsWith("_Expects")) {
        filteredValue = filteredValue.replace(
          /_[Tt]est|_[Hh]andler|_[Vv]alidator/g,
          "_Expects"
        );
      }

      const mode = this.expectSelect!.value as selectTypes;

      filteredValue += `_${mode}`;

      if (this.classModeInput!.checked) {
        this.codeResultText!.value = generateClass(
          filterClass(inputValue),
          this.servicesInput?.value!,
          this.defaultUsing?.checked,
          generateMethod(
            filteredValue,
            this.commandQuery?.checked,
            requestInitializer(
              getBaseName(inputValue, testRegex, validatorRegex, handlerRegex)
            )
          )
        );
      } else {
        this.codeResultText!.value = generateMethod(filteredValue);
      }
    }
  }

  private toggleClassContent() {
    if (this.classModeInput!.checked) {
      this.classContent!.classList.remove("hidden");
      this.classContent!.classList.add("visible");
    } else {
      this.classContent!.classList.remove("visible");
      this.classContent!.classList.add("hidden");
    }
  }
  private clearBtnClear() {
    if (this.servicesInput!.value.trim().length > 0) {
      this.btnClearServices!.hidden = false;

      return;
    }
    this.btnClearServices!.hidden = true;
  }
}

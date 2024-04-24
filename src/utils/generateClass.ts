import { generateServicesReturn } from "../bc/types/codeGeneratorTypes";
import { defaultUsing } from "./defaultValues";
import generateHandlerName, { generateRequest } from "./generateHandlerName";
import { handlerRegex, testRegex, validatorRegex } from "./nameRegex";
import { combineRegexes } from "./regexBuilder";

const expectsCollection = ["Handler", "Validator"];

export function generateClass(
  className: string,
  services: string,
  usingMode: boolean | undefined,
  ...args: string[]
): string {
  let contain = "";
  if (usingMode === true) {
    contain = generateUsing() + "\n";
  }
  contain += `
  public class ${className} {
    \t${generateConstructor(generateServices(services, className), className)}
  ${args.join("\n").replace(/^/gm, "  ")}
  }
  `;
  return contain;
}

export function generateMethod(
  name: string,
  initializer?: boolean | undefined,
  initializerValue?: string
): string {
  let contain = `
  [Fact]
  public async Task ${name}() {
    //Arrange${
      initializer
        ? `
    ${initializerValue}`
        : ""
    }
    //Act
    //Assert
  }
  `;
  return contain;
}

export function filterClass(value: string) {
  let filteredValue = value;
  expectsCollection.forEach((item) => {
    if (filteredValue.endsWith(item))
      filteredValue = filteredValue.slice(0, -item.length) + "Test";
  });

  if (filteredValue.endsWith("Test")) {
    return filteredValue;
  } else {
    return filteredValue + "Test";
  }
}
export function getBaseName(className: string, ...regexes: RegExp[]) {
  let normalizedClassName =
    className.replace(combineRegexes(...regexes), "") + "";

  return normalizedClassName;
}
export function generateServices(inputServices: string, className: string) {
  const servicesObject: generateServicesReturn[] = [];
  let normalizedServices = inputServices?.trim().replace(/\s/g, "");
  let normalizedClassName = generateHandlerName(className, testRegex);
  if (normalizedServices.length === 0) return servicesObject;
  let servicesArray = normalizedServices.split(",");

  servicesArray.forEach((item) => {
    let normalForm = item.replace("<>", "");
    let interfaceForm = `I${item.charAt(0).toUpperCase() + item.slice(1)}`;

    if (item.endsWith("<>")) {
      interfaceForm = interfaceForm.replace("<>", `<${normalizedClassName}>`);
    }
    const declaration = `private readonly ${interfaceForm} _${normalForm} = Substitute.For<${interfaceForm}>();`;

    servicesObject.push({
      normalForm,
      declaration,
      interfaceForm,
    });
  });

  return servicesObject;
}
export function generateConstructor(
  data: generateServicesReturn[],
  className: string
) {
  const handlerName = generateHandlerName(className, testRegex);

  const handlerInitializer = `private readonly ${handlerName} _sut;\n`;

  const initializer = data
    .map((item) => "\t" + item.declaration + "\n")
    .join("\n");

  const constructor = `\tpublic ${className}()
    \t{
  \t\t _sut = new ${handlerName}(${data
    .map((item) => "_" + item.normalForm)
    .join(",")});
    \t}`;

  return handlerInitializer + initializer + constructor;
}

function generateUsing() {
  const userUsings = localStorage.getItem("commonUsing");
  if (userUsings && userUsings.trim().length > 0) {
    const usingRaw = JSON.parse(userUsings) as string[];
    const formattedUsings = usingRaw
      .map((item) => "using " + item + ";")
      .join("\n");

    return formattedUsings;
  } else {
    return defaultUsing.join("\n");
  }
}

export function requestInitializer(className: string) {
  const requestName = generateRequest(
    className,
    testRegex,
    validatorRegex,
    handlerRegex
  );
  return requestName;
}

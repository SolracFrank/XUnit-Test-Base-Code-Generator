import { combineRegexes } from "./regexBuilder";

export default function generateHandlerName(
  className: string,
  ...regexes: RegExp[]
) {
  let normalizedClassName =
    className.replace(combineRegexes(...regexes), "") + "";

  if (!normalizedClassName.endsWith("Handler"))
    normalizedClassName += "Handler";

  return normalizedClassName;
}

export function generateRequest(className: string, ...regexes: RegExp[]) {
  let normalizedClassName =
    className.replace(combineRegexes(...regexes), "") + "";
  let requestType = "command";
  if (normalizedClassName.endsWith("Query")) {
    requestType = "query";
  }

  return `var ${requestType} = new ${className}{ };`;
}

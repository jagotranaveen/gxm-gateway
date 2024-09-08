import tokenJson from "../tokens.json";

const tokens = tokenJson;

const createCSSVariables = (tokens) => {
  let css = ":root {\n";
  const processTokens = (obj, prefix) => {
    for (const key in obj) {
      const value = obj[key];
      if ("value" in value) {
        css += `  --${prefix}-${key}: ${value.value};\n`;
      } else {
        processTokens(value, `${prefix}-${key}`);
      }
    }
  };
  processTokens(tokens["lara-light"], "lara-light");
  css += "}";
  return css;
};

const injectCSSVariables = (cssVariables) => {
  const style = document.createElement("style");
  style.innerHTML = cssVariables;
  document.head.appendChild(style);
};

const cssVariables = createCSSVariables(tokens);
injectCSSVariables(cssVariables);

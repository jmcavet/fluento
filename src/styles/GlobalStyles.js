import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;

    --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* transition: background-color 2.5s; */
}

/* html {font-size: 62.5%} */
html {font-size: 100%}

body {
    font-family: "Poppins", sans-serif;
    color: var(--color-grey-700);
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
}
`;

export default GlobalStyles;

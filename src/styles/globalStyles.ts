import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
::selection {
  background-color: #FB8351;
  color: #fff
}
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #FFFFFC;
  font-family: "Roboto";
}
::-webkit-scrollbar {
  display: none;
}
strong {
  color: #6CCFF6;
}
a {
  text-decoration: none;
}
body {
  margin: 0;
  padding-right: 1rem;
  padding-left: 1rem;
}
@media (min-width: 1024px) {
  body {padding-right: 4rem;
  padding-left: 4rem;}
  
}
`;
export default GlobalStyles;

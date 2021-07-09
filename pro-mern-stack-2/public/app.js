"use strict";

var continents = ['Mittelerde', 'Pangea', 'Westeros', 'Hoth'];
var helloContinents = Array.from(continents, function (c) {
  return "Hello ".concat(c, "!");
});
var element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, helloContinents.map(function (continent) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, continent), /*#__PURE__*/React.createElement("br", null));
}));
var toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
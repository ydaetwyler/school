"use strict";

var continents = ['Mittelerde', 'Pangea', 'Westeros', 'Hoth'];
var helloContinents = Array.from(continents, function (c) {
  return "Hello ".concat(c, "!");
});
var message = helloContinents.join('<br />');
var element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, message));
var toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
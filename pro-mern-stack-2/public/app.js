const continents = ['Mittelerde', 'Pangea', 'Westeros', 'Hoth'];
const helloContinents = Array.from(continents, c => `Hello ${c}!`);
const message = helloContinents.join(' ');
const element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, message));
const toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
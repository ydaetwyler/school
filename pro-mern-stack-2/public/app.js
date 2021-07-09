const element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, "Hello World!"));
const toRender = document.getElementById('content');
ReactDOM.render(element, toRender);

//Answer Q1: I see pure JS and React.createElement

//Answer Q2: We only need this for developing, not for the productive Environment
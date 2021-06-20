const element = (
    <div title="Outer div">
        <h1>Hello World!</h1>
    </div>
);
const toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
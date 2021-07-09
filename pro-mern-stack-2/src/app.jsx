const continents = ['Mittelerde', 'Pangea', 'Westeros', 'Hoth'];
const helloContinents = Array.from(continents, c => `Hello ${c}!`);
const message = helloContinents.join(' ');

const element = (
    <div title="Outer div">
        <h1>{message}</h1>
    </div>
);
const toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
const continents = ['Mittelerde', 'Pangea', 'Westeros', 'Hoth'];
const helloContinents = Array.from(continents, c => `Hello ${c}!`);

const element = (
    <div title="Outer div">
        {helloContinents.map(continent => (
            <div>
                <h1>{continent}</h1>
                <br />
            </div>
        ))}
    </div>
);
const toRender = document.getElementById('content');
ReactDOM.render(element, toRender);
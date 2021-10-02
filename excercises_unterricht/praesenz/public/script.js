// Get Articles
$.get('/article', function (data) {
    console.log(data)

    data.forEach(e => $('#grid').append(`
        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" src=${e.image} alt="placeholder" />
                <div class="card-body">
                    <div class="card-title">${e.title}</div>
                    <div class="card-text">${e.price} $</div>
                </div>
        </div>
    `))
})
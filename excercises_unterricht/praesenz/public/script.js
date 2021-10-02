// Helper Function
const updateCart = data => {
    $('#cart').empty()

    data.items.forEach(cartItem => {
        if (cartItem.articleData && cartItem.articleData.title) {
            $('#cart').append(`
            <form action="/cart/article/${cartItem.articleData._id}" data-ajax-form>
                <div class="cart-title">
                    ${cartItem.quantity}x ${cartItem.articleData.title}
                </div>
                <div class="cart-price">
                    $ ${cartItem.price.toFixed(2)}
                </div>
                <button class="cart-item-remove fas fa-times"></button>
            </form>
            `)
        }
    })

    $('#cart-total').html(data.totalAmount)
}

// Get Articles
$.get('/article', function (data) {
    data.forEach(e => $('#grid').append(`
        <div class="col-md-4">
            <form action="/cart/article/${e._id}" data-ajax-form-article>
                <div class="card">
                    <img class="card-img-top" src="${e.image}" alt="placeholder" />
                    <div class="card-body">
                        <div class="card-title">${e.title}</div>
                        <div class="card-text">${e.description}</div>
                        <div class="card-text">$ ${e.price}</div>
                        <button type="submit">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `))
})

// Get Cart
$.get('/cart', function(data) {
    updateCart(data)
})

$(document).on('submit', '[data-ajax-form]', e => {
    e.preventDefault()
    $.ajax({
        type: 'DELETE',
        url: e.target.action,
        success: function (data) {
            console.log(data)
            updateCart(data)
        }
    })
})

$(document).on('submit', '[data-ajax-form-article]', e => {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: e.target.action,
        success: function (data) {
            console.log(data)
            updateCart(data)
        }
    })
})


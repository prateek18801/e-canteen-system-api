## Authentication Routes

`POST: /auth/v1/login`
```
Request:
{
    username: (email/contact),
    password: ''
}

Response: 
{
    ok: true / false,
    message: 'success / invalid credentials',
    token: '...'
}
```

`POST: /auth/v1/signup`
```
Request:
{
    full_name: '',
    email: '',
    contact: '',
    password: ''
}

Response:
{
    ok: true,
    message: 'created'
    token: '...'
}
```

## User Routes

### Product Routes

`GET: /api/v1/product/[category?](optional)`
```
Response:
{
    ok: true,
    message: 'success'
    data: [{...}, ...]
}
```

`GET: /api/v1/product/available`
```
Response:
{
    ok: true,
    message: 'success'
    data: [{...}, ...]
}
```

### Cart Routes

`GET: /api/v1/cart`
```
Response:
{
    ok: true,
    message: 'success',
    data: [
        {
            product_id: '...',
            qty: '...'
        },
        ...
    ]
}
```


`POST: /api/v1/cart`
```
Request:
[
    {
        product_id: '...',
        qty: '...'
    },
    ...
]

Response:
{
    ok: true,
    message: 'updated',
    data: [
        {
            product_id: '...',
            qty: '...'
        },
        ...
    ]
}
```

`GET: /api/v1/cart/add/[product_id]`
```
Response:
{
    ok: true,
    message: 'updated'
    data: [
        {
            product_id: '...',
            qty: '...'
        },
        ...
    ]
}
```

### Favourites Routes

`GET: /api/v1/favourites`
```
Response:
{
    ok: true,
    message: 'success'
    data: [{...}, ...]
}
```

`GET: /api/v1/favourites/toggle/[product_id]`
```
Response:
{
    ok: true,
    message: 'updated',
    data: [{...}, ...]
}
```

### Order Routes

`GET: /api/v1/order/create`
```
Response:
{
    ok: true,
    message: 'updated',
    data: {...}
}
```

`GET: /api/v1/order/cancel/[order_id]`
```
Response:
{
    ok: true / false,
    message: 'deleted / not found / already paid',
    data: {...}
}
```

## Admin Routes

### Product Routes

`GET: /admin/v1/product/[category?](optional)`
```
Response:
{
    ok: true,
    message: 'success'
    data: [{...}, ...]
}
```

`POST: /admin/v1/product/[product_id?](optional)`
```
Request:
{
    product_name: '',
    description: '',
    rate: '',
    available: true / false,
    category: 'meal / snack / beverage / other',
    imageUrl: ''
}

Response:
{
    ok: true,
    message: 'updated / created',
    data: {...}
}
```

`DELETE: /admin/v1/product/[product_id]`
```
Response:
{
    ok: true / false,
    message: 'deleted / not found',
    data: {...}
}
```

`GET: /admin/v1/available`
```
Response:
{
    ok: true,
    message: 'success'
    data: [{...}, ...]
}
```

`GET: /admin/v1/available/toggle/[product_id]`
```
Response:
{
    ok: true / false,
    message: 'updated / not found',
    data: {...}
}
```

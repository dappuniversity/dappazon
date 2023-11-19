export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
    {
        name: 'type',
        type: 'string',
        title: 'Type'
    },
    {
        name: 'id',
        type: 'string',
        title: 'ID'
    },
    {
        name: 'stock',
        type: 'number',
        title: 'Stock'
    },
    {
        name: 'price',
        type: 'number',
        title: 'Price'
    },
    {
        name: 'category',
        type: 'string',
        title: 'Category'
    },
    {
        name: 'sellerId',
        type: 'reference',
        title: 'Seller',
        to: [{type: 'seller'}]
    },
    {
        name: 'description',
        type: 'text',
        title: 'Description'
    },
    {
        name: 'banner',
        type: 'image',
        title: 'Banner'
    },
    {
        name: 'imageList',
        type: 'array',
        title: 'Image List',
        of: [{type: 'image'}]
    },
    {
        name: 'creationDate',
        type: 'datetime',
        title: 'Creation Date'
    },
    {
        name: 'updateDate',
        type: 'datetime',
        title: 'Update Date'
    },
    {
        name: 'status',
        type: 'string',
        title: 'Status'
    }
    ]
}

  
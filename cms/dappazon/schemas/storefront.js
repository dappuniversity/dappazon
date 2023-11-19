export default {
    name: 'storefront',
    type: 'document',
    title: 'Storefront',
    fields: [
        {
        name: 'sellerId',
        type: 'reference',
        title: 'Seller',
        to: [{type: 'seller'}]
        },
        {
        name: 'category',
        type: 'string',
        title: 'Category'
        },
        {
        name: 'id',
        type: 'string',
        title: 'ID'
        },
        {
        name: 'productList',
        type: 'array',
        title: 'Product List',
        of: [{type: 'reference', to: [{type: 'product'}]}]
        }
    ]
      
}

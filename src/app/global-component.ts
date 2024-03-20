export const GlobalComponent = {
    // Api Calling
    //API_URL: 'https://api-node.themesbrand.website/',
    API_URL : 'http://localhost:8080/api/',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },

    // Auth Api
    //AUTH_API: "https://api-node.themesbrand.website/auth/",
    AUTH_API:"http://localhost:8080/api/auth/",


    // Products Api
    product: 'apps/product',
    productDelete: 'apps/product/',

    // Orders Api
    order: 'apps/order',
    orderId: 'apps/order/',

    // Customers Api
    customer: 'apps/customer',
}
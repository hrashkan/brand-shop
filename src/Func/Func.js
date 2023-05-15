
//zoom image func
const zoomMouseMove = (event) => {
    const zoomFactor = 2;
    const offsetX = event.nativeEvent.offsetX / event.target.offsetWidth;
    const offsetY = event.nativeEvent.offsetY / event.target.offsetHeight;
    const transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    event.target.style.transformOrigin = transformOrigin;
    event.target.style.transform = "scale(2)";
    // setZoom(zoomFactor);
};

//un zoom image
const zoomMouseLeave = () => {
    event.target.style.transformOrigin = "center center";
    event.target.style.transform = "scale(1)";
    // setZoom(1);
};

//add to cart
//save to cookie
const addToCartHandler = (newProduct) => {

    let userCartProducts = []

    let cookie = document.cookie.split('; ').find(row => row.startsWith('userCartProducts='));

    cookie ? userCartProducts = JSON.parse(cookie.split('=')[1]) : userCartProducts = [];

    let isProductExists = userCartProducts.some(product => product.id === newProduct.id);
    if (isProductExists) {
        console.log(`exist product count updated`)
        let productIndex = userCartProducts.findIndex(product => product.id === newProduct.id);

        let updateProductCount = userCartProducts[productIndex]

        updateProductCount.count = Number(updateProductCount.count) + 1

        userCartProducts[productIndex] = updateProductCount;

    } else {
        console.log(`new product added`)
        // const newProduct = {
        //     name,
        //     desc,
        //     price,
        //     src,
        //     score,
        //     id,
        //     count: 1
        // };
        userCartProducts.push(newProduct);
    }


    let date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = 'userCartProducts=' + JSON.stringify(userCartProducts) + '; expires=' + date.toUTCString() + '; path=/';

}


//add product to user save
const addToSaveListHandler = (name, desc, price, src, score, id) => {

    let userSaveList = []

    let cookie = document.cookie.split('; ').find(row => row.startsWith('userSaveList='));

    cookie ? userSaveList = JSON.parse(cookie.split('=')[1]) : userSaveList = [];

    let isProductExists = userSaveList.some(product => product.id === id);
    if (isProductExists) {
        console.log(`exist`)
        let productIndex = userSaveList.findIndex(product => product.id === id);

        let updateProductCount = userSaveList[productIndex]

        updateProductCount.count += 1

        userSaveList[productIndex] = updateProductCount;

    } else {
        console.log(`new`)
        const newProduct = {
            name,
            desc,
            price,
            src,
            score,
            id,
            count: 1
        };
        userSaveList.push(newProduct);
    }


    saveCookie('userSaveList', userSaveList, 30)

}

//save cookie function

const saveCookie = (cookieName, cookieValue, expireDay) => {
    let date = new Date();
    date.setTime(date.getTime() + (expireDay * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=` + JSON.stringify(cookieValue) + '; expires=' + date.toUTCString() + '; path=/';
}


export { zoomMouseMove, zoomMouseLeave, addToCartHandler, addToSaveListHandler, saveCookie }
import axios from "axios";

const getProducts = async () => {
    console.time("process");
    const response = await axios.get("https://fakestoreapi.com/products");
    // console.log(response);
    // console.log(response.data);
    console.log(`${response.data.length} productos encontrados`);
    console.timeEnd("process");
}

getProducts();
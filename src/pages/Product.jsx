import React, { useEffect, useRef, useState } from 'react'
import { add_data, get_data } from '../api/api';
import { base_url, delete_product, get_product, post_product, put_product } from '../constant';
import axios from 'axios';
import { Switch } from '@mui/material';
import { Slider } from '@mui/material';


const Product = () => {

    const [product, setproduct] = useState([]);
    const [view, setview] = useState({})

    let productName = useRef();
    let price = useRef();
    let desc = useRef()


    const [sliderValue, setSliderValue] = useState([product]); // Initial slider value
    const [data, setData] = useState(product.filter((val) => val.price == price)); // Sample data

    // Function to update filtered data based on slider value
    const updateFilteredData = (value) => {
        const filteredData = data.filter(item => item >= value);
        return filteredData;
    }

    // Event handler for slider input
    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setSliderValue(value);
    }

    //add data
    let addProduct = async () => {
        let productt = {
            productName: productName.current.value,
            productImage:
                "https://m.media-amazon.com/images/I/41pR0qlI0yL._SX300_SY300_QL70_FMwebp_.jpg",
            price: price.current.value,
            desc: desc.current.value
        }
        // console.log(productt);

        let res = await add_data(base_url, post_product, productt);
        // console.log(res.data);
        if (res) {
            setproduct([...product, res.data]);


        }


    }


    //get product
    let getproduct = async () => {
        let res = await get_data(base_url, get_product);
        // console.log(res);
        setproduct(res.data)
    }



    //delete
    let deleteProduct = async (id) => {
        console.log(id);
        let res = await axios.delete("http://localhost:3001/products/" + id + "/");
        setproduct(product.filter((item) => item.id !== id));


    }

    //update

    let viewProduct = (ind) => {
        let update = product[ind];
        // console.log(product);
        setview(update);
    }

    let handleview = async (e) => {
        setview({ ...view, [e.target.name]: e.target.value });

    }

    let UpdateProduct = async () => {
        let finaldata = await axios.put(`http://localhost:3001/products/${view.id}`, view);
        console.log(finaldata.data);
        setproduct(product.map((val) => {
            if (val.id == finaldata.data.id) {
                return finaldata.data;
            } else {
                return val;
            }
        }))

    }

    //switch 
    let handleSwitch = async (id, available, index) => {
        // console.log(available);
        let data = product[index];
        console.log(data);
        await axios.put(`http://localhost:3001/products/${data.id}`, {
            ...data, available
        });

        setproduct(
            product.map((val, ind) => (val.id === id ? { ...data, available } : val))
        );
    }


    useEffect(() => {
        getproduct();
    }, [])


    return (
        <>
            <label for="email">Product Name</label>
            <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Enter name"
                ref={productName}
            />
            <label for="email">Product price</label>
            <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Enter name"
                ref={price}
            />
            <label for="email">Description</label>
            <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Enter name"
                ref={desc}
            />
            <button type="submit" class="btn btn-primary" onClick={addProduct}>
                Add
            </button>


            <div className="App">
                <h1>Filter Data</h1>
                <div className="slider-container">
                    <label htmlFor="slider">Filter by Range:</label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={sliderValue}
                        className="slider"
                        id="slider"
                        onChange={handleSliderChange}
                    />
                    <p>Value: {sliderValue}</p>
                </div>
                <div id="filtered-data">
                    <p>Filtered Data: {updateFilteredData(sliderValue).join(', ')}</p>
                </div>
            </div>
            <table class="table ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">product Image</th>
                        <th scope="col">product Name</th>
                        <th scope="col">price</th>
                        <th scope="col">Description</th>
                        <th scope="col">available</th>
                        <th scope="col">delete</th>
                        <th scope="col">edit</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((val, ind) => {
                        return (
                            <tr>
                                <td>
                                    <b>{val.id}</b>
                                </td>
                                <td>
                                    <img src={val.productImage} width={70} height={70} />
                                </td>
                                <td>{val.productName}</td>
                                <td>{val.price}</td>
                                <td>{val.desc}</td>
                                <td>
                                    <Switch
                                        checked={val.available}
                                        onChange={(e) => handleSwitch(val.id, e.target.checked, ind)}
                                    />
                                </td>

                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteProduct(val.id)}>DELETE</button>
                                </td>
                                <td>

                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => viewProduct(ind)}>
                                        update
                                    </button>

                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">UPDATE HERE</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <label for="email">Product Name</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="name"
                                                        aria-describedby="name"
                                                        placeholder="Enter name"
                                                        onChange={handleview}
                                                        name='productName'
                                                        value={view.productName}

                                                    />
                                                    <label for="email">Product price</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="name"
                                                        aria-describedby="name"
                                                        placeholder="Enter name"
                                                        onChange={handleview}
                                                        name='price'
                                                        value={view.price}

                                                    />
                                                    <label for="email">Description</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="name"
                                                        aria-describedby="name"
                                                        placeholder="Enter name"
                                                        onChange={handleview}
                                                        name='desc'
                                                        value={view.desc}


                                                    />
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary"
                                                        data-dismiss="modal"
                                                        onClick={UpdateProduct}
                                                    >Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </>
    )
}

export default Product

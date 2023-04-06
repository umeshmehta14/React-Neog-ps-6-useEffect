import React, { useEffect, useState } from 'react'

// Create a React component that calls the product api and has the same number of buttons as the items in product. On Click of each button show the details of that card only. Example: In the below API we have three products and three buttons.Example
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://example.com/api/products') {
        resolve({
          status: 200,
          message: 'Success',
          data: {
            products: [
              {
                name: 'Shoes',
                price: 3000,
                desc: 'lorem ipsum dolor sit amit',
                src: 'https://picsum.photos/200/200',
              },
              {
                name: 'Tshirt',
                price: 500,
                inStock: false,
                desc: 'lorem ipsum dolor sit amit',
                src: 'https://picsum.photos/201/201',
              },
              {
                name: 'Trekking Bag',
                price: 2000,
                inStock: true,
                desc: 'lorem ipsum dolor sit amit',
                src: 'https://picsum.photos/205/205',
              },
            ],
          },
        })
      } else {
        reject({
          status: 404,
          message: 'Items list not found.',
        })
      }
    }, 2000)
  })
}

const Question1 = () => {
    const [products, setProducts] = useState([])
    const [copyProducts, setCopyProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/products");
            setProducts(response.data.products);
            setCopyProducts(response.data.products);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    const names = [...new Set(copyProducts.map(({name})=> name))];

    useEffect(() => {
        getData();
    }, [])

    const FilterByCategory = (category) =>{
        const filteredProducts = copyProducts.filter(({name})=> name === category);
        setProducts(filteredProducts);
    }
    
  return (
    <div>
        <p>{loading && "...Loading"}</p>
        {
            names.map((name)=> <button onClick={()=> FilterByCategory(name)}>{name}</button>)
        }
        {
            products.map(({name,price, inStock,desc, src})=>{
                return <div>
                    <img src={src} alt="" width="300px" height="300px" />
                    <h3>Name:{name}</h3>
                    <p>Price:{price}</p>
                    <p>Description:{desc}</p>
                </div>
            })
        }
        <div>

        </div>
      
    </div>
  )
}

export default Question1

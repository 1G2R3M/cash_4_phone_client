import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { api } from "../constants"
const Newsale = () => {
    const [buyer, setBuyer] = useState("")
    const [phone, setPhone] = useState("")
    const [searchProducts, setSearchProducts] = useState([])
    const [products, setProducts] = useState([])
    const [hidden, setHidden] = useState("hidden")

    const [search, setSearch] = useState("")

    const fetch = async () => {
        const token = localStorage.getItem("token");
        await axios.post(`${api}/product/all`, { search }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setHidden("block")
            setSearchProducts(res.data.data);
        })
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            alert("your are not Authorized!");
            return
        }
    }, [])
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!buyer || !phone || (products.length === 0)) {
            alert("all credentials are required");
            return
        }
        const token = localStorage.getItem("token");
        axios.post(`${api}/sale/addnew`, { buyer, phone, products }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 201) {
                alert("Sale added Successfully!")
                console.log(res)
                setBuyer("")
                setPhone("")
                setProducts([])
            } else {
                console.log(res);
                alert("failed to add Sale!")
            }
        }).catch(err => {
            console.log(err)
            alert("failed to add Sale!")
        })
    }
    return (
        <div className="flex flex-col items-center justify-center dark:bg-gray-900 w-full h-screen p-4">
            <form class="w-full mx-4  mx-auto my-4 relative">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product name, description..." required />
                    <button type="button" onClick={fetch} class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
                <tbody className={`absolute w-full ${hidden}`}>
                    {
                        searchProducts && searchProducts.map((item) =>
                            <tr onClick={() => {
                                const exist = products.filter(product => product._id === item._id)
                                if (exist.length === 0) {
                                    setProducts([...products, { "_id": item._id, "name": item.name }])
                                }
                                setHidden("hidden")
                            }} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td class="px-6 py-4">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4">
                                    ₹{item.price}
                                </td>
                            </tr>
                        )
                    }
                    {(searchProducts.length === 0) && <tr onClick={() => setHidden("hidden")} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th colSpan={3} scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Their are no Products available
                        </th>
                    </tr>}
                </tbody>
            </form>
            <form className="w-full mx-auto dark:bg-gray-900">
                <div className="mb-5 w-full">
                    <label htmlFor="buyer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Buyer Name</label>
                    <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)} id="buyer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="buyer name" required />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Buyer Phone</label>
                    <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selected Products</label>
                    <div className="flex flex-wrap gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{
                        products && products.map(item => <p className="rounded-xl text-white py-1 border border-white px-4" >{item.name}</p>)
                    }</div>
                </div>
                <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}
export default Newsale
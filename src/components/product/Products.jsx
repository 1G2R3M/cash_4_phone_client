import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { api } from "../constants"
const Products = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    const navigate = useNavigate();
    const fetch = async () => {
        const token = localStorage.getItem("token");
        await axios.post(`${api}/product/all`, { search }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setProducts(res.data.data);
        })
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            alert("your are not Authorized!");
            return
        } else {
            fetch();
        }
    }, [])
    return (
        <div class="relative overflow-x-auto w-full flex flex-col p-4 justify-center dark:bg-gray-900 h-screen">

            <form class="w-full mx-4  mx-auto my-4">
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
            </form>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map((item) =>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                    {(products.length === 0) && <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th colSpan={3} scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Their are no Products available
                        </th>
                    </tr>}
                </tbody>
            </table>
        </div>)

}
export default Products
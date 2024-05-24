import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { api } from "../constants"
const Sales = () => {
    const [sales, seSales] = useState([])

    const navigate = useNavigate();
    const fetch = async () => {
        const token = localStorage.getItem("token");
        await axios.get(`${api}/sale/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            seSales(res.data.data);
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

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Buyer name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Products
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sales && sales.map((item) =>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.buyer}
                                </th>
                                <td class="px-6 py-4">
                                    {item.phone}
                                </td>
                                <td class="px-6 py-4">
                                    {new Date(item.createdAt).getDate()+"/"+new Date(item.createdAt).getMonth()+"/"+new Date(item.createdAt).getUTCDate()}
                                </td>
                                <td class="px-6 py-4">
                                    <div className="flex flex-wrap gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{
                                        item.products && item.products.map(item => <p className="rounded-xl text-white py-1 border border-white px-4" >{item.name}</p>)
                                    }</div>
                                </td>
                            </tr>
                        )


                    }
                    {(sales.length === 0) && <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th colSpan={3} scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Their are no Sales available
                        </th>
                    </tr>}
                </tbody>
            </table>
        </div>)

}
export default Sales
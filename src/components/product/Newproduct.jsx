import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { api } from "../constants"
const Newproduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [token,setToken]=useState("")

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            alert("your are not Authorized!");
            return
        }else{
            setToken(token)
        }
    },[])
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!name || !description || !price) {
            alert("all credentials are required");
            return
        }
        axios.post(`${api}/product/addnew`, { name, description, price }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 201) {
                alert("Product added Successfully!")
                console.log(res)
            } else {
                console.log(res);
                alert("failed to add Product!")
            }
        }).catch(err => {
            console.log(err)
            alert("failed to add product!")
        })
    }
    return (
        <div className="flex items-center justify-center dark:bg-gray-900 w-full h-screen p-4">
            <form className="w-full dark:bg-gray-900">
                <div className="mb-5 w-full">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <input type="description" value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                    <input type="price" value={price} onChange={(e) => setPrice(e.target.value)} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <button type="button" onClick={handleSubmit} className="w-fit mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form></div>
    )
}
export default Newproduct
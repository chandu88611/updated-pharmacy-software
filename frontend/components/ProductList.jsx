import axios from 'axios';
import { MdDelete,MdUpdate } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import Product from './Product';
import { Button } from '@mui/material';

function ProductList() {
    const [stocks,setStocks]=useState([])
    const [id,setId]=useState()
    const [updateid,setUpdateId]=useState()
    const [update,setUpdate]=useState(false)

    const addStocks = async () => {
        try {
          const response = await axios.get("http://localhost:5000/buses/get-all-Inventories");
          const data = response.data.data;
          console.log(data);
    
          setStocks(data)
        } catch (error) {
          console.error(error);
        }
      };
      const deleteStocks = async (id) => {
        try {
          const response = await axios.post("http://localhost:5000/buses/delete-Inventory",{id:id});
          const data = response
          console.log(data);
    
    if(data){
        window.location.reload()
    }
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(()=>{
addStocks()
      },[])
  return (<div className='m-4 text-center'>
    <table className="w-full min-w-max table-auto bg-white border border-gray-300">
  <thead>
    <tr className='  '>
      <th className="px-4 py-3  bg-blue-800 text-white">Medicine Name</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Quantity</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Batch</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Rate</th>
      <th className="px-4 py-3  bg-blue-800 text-white">GST</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Exp Date</th>
      <th className="px-4 py-3  bg-blue-800 text-white">MRP / Pack</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Free Quantity</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Update</th>
      <th className="px-4 py-3  bg-blue-800 text-white">Delete</th>
    </tr>
  </thead>
  <tbody>
    {stocks.map((data, index) => (
      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
        <td className="px-4 py-3 ">{data.medicineName}</td>
        <td className="px-4 py-3 ">{data.Quantity}</td>
        <td className="px-4 py-3 ">{data.Batch}</td>
        <td className="px-4 py-3 ">{data.Price}</td>
        <td className="px-4 py-3 ">{data.Gst}</td>
        <td className="px-4 py-3 ">{data.expDate}</td>
        <td className="px-4 py-3 ">{data.mrppack}</td>
        <td className="px-4 py-3 ">{data.freeQuantity}</td>
        <td className="px-4 py-3  cursor-pointer text-blue-500 ">
          <MdUpdate className='m-auto'   onClick={()=>{
         setUpdateId(data)
         setUpdate(true)
          }} />
        </td>
        <td className="px-4 py-3  cursor-pointer text-red-500 flex items-center justify-center">
          <MdDelete onClick={() => setId(data._id)} />
        </td>
      </tr>
    ))}
  </tbody> 
</table>
{updateid && update &&
<div className="h-screen top-0 fixed bg-slate-300">


<div className='fixed top-1/2 -translate-y-1/2 '>
  <Product   med={updateid.medicineName} quan={updateid.Quantity} rate={updateid.Price} gst={updateid.Gst} expd={updateid.expDate} free={updateid.freeQuantity} batch={updateid.Batch} ratep={updateid.mrppack} id={updateid._id}/>
  <Button variant='outlined' onClick={()=>setUpdate(false)}>
    cancel
  </Button>
</div>
</div>


}
    {id?<div className='text-center z-[3000] bg-white flex flex-col gap-3 font-bold items-center justify-center w-full h-full fixed top-0'>
      Are you sure want to delete
  <button style={{cursor:"pointer" }} onClick={()=>deleteStocks(id)} className='text-white bg-red-800 w-40 p-x-4 py-3  rounded-lg mx-auto '>Delete</button>
  <button style={{cursor:"pointer" }} onClick={()=>setId("")} className='text-whit border-green-400 border-2 text-green-500 w-40 p-x-4 py-3  rounded-lg mx-auto '>Cancel</button>
    
    </div>:""}

    </div>
  )
}

export default ProductList
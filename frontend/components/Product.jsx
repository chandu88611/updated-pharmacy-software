import axios from "axios";
import React, { useState, useEffect } from "react";
function Product({med,quan,rate,gst,expd,free,batch,ratep,id}) {  

  const [id1,setId]=useState("") 
    const [product, setProduct] = useState({
      medicineName: "" ||med,
      Rate: "" ||rate,
      Quantity: "" ||quan,
      Ratepack: "" || ratep,
      Gst: ""  ||gst,
      expRate: ""||expd,
      freeQuantity: ""||free,
      batch: ""||batch,
    });
  const [stocks,setStocks]=useState([])
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    useEffect(() => {
      console.log(product);
    setId(id)
    }, [product]);

  


    const addStocks1=()=>{


      if(!id1){ const res=axios.post("http://localhost:5000/buses/add-Inventory",{
     
       medicineName:product.medicineName,
       Quantity:product.Quantity ,
     Batch: product.batch,
       Price:product.Rate ,
       Gst: product.Gst,
       mrppack:product.Ratepack ,
       expDate:  product.expRate,
       freeQuantity: product.freeQuantity
       })
     console.log(res)
     
     }
     if(id1){
       const res=axios.post("http://localhost:5000/buses/update-Inventory",{
     _id:id1,
       medicineName:product.medicineName,
       Quantity:product.Quantity ,
     Batch: product.batch,
       Price:product.Rate ,
       Gst: product.Gst,
       mrppack:product.Ratepack ,
       expDate:  product.expRate,
       freeQuantity: product.freeQuantity
       })
     console.log(res)
     }
     }
     

  return (
    <>
    <div className="flex gap-3 flex-wrap justify-center pt-4 bg-blue-500 p-4">
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="Medicine Name"
        name="medicineName"
        value={product.medicineName}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="Quantity"
        name="Quantity"
        value={product.Quantity}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="Batch"
        name="batch"
        value={product.batch}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="Rate"
        name="Rate"
        value={product.Rate}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="GST"
        name="Gst"
        value={product.Gst}
        onChange={handleChange}
      />
      <input
        type="date"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="EXP.Date"
        name="expRate"
        value={product.expRate}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="MRP/pack"
        name="Ratepack"
        value={product.Ratepack}
        onChange={handleChange}
      />
      <input
        type="text"
        className="   border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
        placeholder="Free Quantity"
        name="freeQuantity"
        value={product.freeQuantity}
        onChange={handleChange}
      />

      <button onClick={addStocks1} className="p-4 py-1 bg-green-400 text-white ">Add stock</button>
    </div>

    
    </>

  );
}

export default Product;

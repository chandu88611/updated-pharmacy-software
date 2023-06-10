import { useEffect, useState } from 'react';
import axios from 'axios';

function Sales() {
  const [sale, setSale] = useState({
    medicineName: '',
    Rate: '',
    Quantity: '',
    customerName: '',
    customerNumber: '',
    saleDate: '',
  });

  const [medicines, setMedicines] = useState([]);
  const [medicineNames, setMedicineNames] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMedicine = () => {
    const selectedMedicine = medicineNames.find((medicine) => medicine.medicineName === sale.medicineName);

    if (selectedMedicine) {
      const newMedicine = {
        medicineId: selectedMedicine._id,
        medicineName: selectedMedicine.medicineName,
        Quantity: sale.Quantity,
        Rate: sale.Rate,
      };

      setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);

      setSale((prevState) => ({
        ...prevState,
        medicineName: '',
        Quantity: '',
        Rate: '',
      }));
    }
  };

  const handleRemoveMedicine = (index) => {
    setMedicines((prevMedicines) => prevMedicines.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/sales', {
        medicines: medicines.map((medicine) => ({
          medicine: medicine.medicineId,
          quantity: medicine.Quantity,
          amount: medicine.Quantity * medicine.Rate,
        })),
        buyerName: sale.customerName,
        phoneNumber: sale.customerNumber,
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    console.log(sale);
  }, [sale, medicineNames]);

  useEffect(() => {
    const fetchMedicineNames = async () => {
      try {
        const res = await axios.get('http://localhost:5000/buses/get-all-Inventories');
        setMedicineNames(res.data.data);
      } catch (error) {
        console.error('Error fetching medicine names:', error);
      }
    };

    fetchMedicineNames();
  }, []);

  return (
    <div>
      <div className="bg-blue-500 flex flex-col items-center">
        <div className="flex gap-3 flex-wrap justify-center pt-4 bg-blue-500">
          <input
            type="text"
            className="border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
            placeholder="Customer Name"
            name="customerName"
            value={sale.customerName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
            placeholder="Customer Number"
            name="customerNumber"
            value={sale.customerNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 flex-wrap justify-center pt-4 bg-blue-500 p-4">
          <input
            type="text"
            className="border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
            placeholder="Medicine Name"
            name="medicineName"
            value={sale.medicineName}
            onChange={handleChange}
            list="medicineNames"
          />
          <datalist id="medicineNames">
            {medicineNames?.map((name) => (
              <option key={name._id} value={name.medicineName} />
            ))}
          </datalist>
          <input
            type="text"
            className="border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
            placeholder="Quantity"
            name="Quantity"
            value={sale.Quantity}
            onChange={handleChange}
          />

          <input
            type="text"
            className="border-2 rounded bg-white focus:outline-none caret-black p-1 text-xl placeholder:text-gary-600"
            placeholder="Rate"
            name="Rate"
            value={sale.Rate}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleAddMedicine}
          className="bg-green-500 px-6 py-2 m-2 rounded-sm text-white font-bold"
        >
          Add Medicine
        </button>
      </div>

      {medicines.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Medicine List</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Medicine Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Rate</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{medicine.medicineName}</td>
                  <td className="py-2 px-4 border-b">{medicine.Quantity}</td>
                  <td className="py-2 px-4 border-b">{medicine.Rate}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRemoveMedicine(index)}
                      className="bg-red-500 px-3 py-1 rounded-sm text-white font-bold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 px-6 py-2 rounded-sm text-white font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Sales;

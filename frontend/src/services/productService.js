import axios from 'axios';

const BASE_URL='http://localhost:5000/api/products';

//Tüm ürünleri getirme get
export const getProducts=async()=>{
    try{
        const response=await axios.get(BASE_URL);
        return response.data;
    }catch(error){
        console.error('Error fetching products:',error);
        throw error;
}
};
//yeni ürün ekleme add
export const addProduct=async(newProduct)=>{
    try{
        const response=await axios.post(BASE_URL, newProduct);
        return response.data;
    }catch(error){
        console.error('Error adding products:',error);
        throw error;
    }
};

//ürün güncelleme put
export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

//ürün silme delete
export const deleteProduct=async(id)=>{
    try{
        const response=await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    }catch(error){
        console.error('Error deleting product:', error);
        throw error;
    }
};


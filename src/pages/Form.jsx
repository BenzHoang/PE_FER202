import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/form.css';
import { toast } from 'react-toastify';
import {Switch, FormControlLabel} from '@mui/material';

const initialState = {
    artName: '',
    price: 10,
    description: '',
    glassSurface: false,
    image: '',
    brand: '',
    limitedTimeDeal: 0
 }
 
 const error_init = {
    artName_err: '',
    price_err: '',
    description_err: '',
    image_err: '',
    brand_err: '',
    limitedTimeDeal_err: ''
 }
 
 const Form = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [arttool, setArtTool] = useState(initialState);
     const [errors, setErrors] = useState(error_init);
 
     const getOneArtTool = async (id) => {
         const res = await axios.get(`https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857/${id}`);
         if (res.status === 200) {
             setArtTool(res.data);
         }
     }
 
     useEffect(() => {
         if(id) {
            getOneArtTool(id);
         }
     }, [id]);
 
     const updateArtTool = async (artID, data) => {
         
         const res = await axios.put(`https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857/${artID}`, data);
         if (res.status === 200) {
             toast.success(`Updated art tool with ID: ${artID} successfully !!!`);
             navigate('/minhhlnse171857');
         }
     }
 
     const addNewArtTool = async (data) => {
         
         const res = await axios.post(`https://66938d96c6be000fa07bfd64.mockapi.io/minhhlnse171857`, data);
         if (res.status === 200 || res.status === 201) {
             toast.success("New art tool has been added successfully !!!");
             navigate('/minhhlnse171857');
         }
     }
 
     const handleSubmit = (event) => {
         event.preventDefault();
         if (validateForm()) {
             if (id) {
                 updateArtTool(id, arttool);
             }
             else {
                 addNewArtTool(arttool);
             }
         } else {
             toast.error("Some info is invalid. Please check again !!!");
         }
     }
     
     const handleChange = (e) => {
         const { name, value } = e.target;
         setArtTool({ ...arttool, [name]: value }); 
     };
     
     const validateForm = () => {
         let isValid = true; 
         let errors = { ...error_init };
 
         if (!arttool.artName.trim()) {
             errors.artName_err = 'Art name is required';
             isValid = false;
         }else if (arttool.artName.length < 1) {
             errors.artName_err = 'Art name must be more than 1 words';
             isValid = false;
         }else if (arttool.artName !== arttool.artName.toLowerCase()) {
            errors.artName_err = 'Art name must be lowercase';
            isValid = false;
         }

         if (arttool.price < 10) {
             errors.price_err = 'Price must be larger or equal 10';
             isValid = false;
         }
         
         if (!arttool.description.trim()) {
             errors.description_err = 'Description is required';
             isValid = false;
         }
         
         if (!arttool.image.trim()) {
             errors.image_err = 'Image is required';
             isValid = false;
         }
         
         if (!arttool.brand) {
             errors.brand_err = 'Brand is required';
             isValid = false;
         }
 
         if (arttool.limitedTimeDeal < 0) {
            errors.limitedTimeDeal_err = 'Limited time deal must be larger or equal 0';
            isValid = false;
        }

         setErrors(errors);
         return isValid;
     
    }
 
     return (
         <div className='container'>
             <div className="form">
                 <h2>{id ? "Update Art Tool" : "Add New Art Tool"}</h2>
                 <form onSubmit={handleSubmit}>
                     <div>
                         <label htmlFor="artName">Art name: </label>
                         <input type="text" name='artName' placeholder="Enter art name" value={arttool.artName} onChange={handleChange} />
                         {errors.artName_err && <span className='error'>{errors.artName_err}</span>}
                     </div>
                     <div>
                         <label htmlFor="price">Price: </label>
                         <input type="number" name='price' value={arttool.price} step="1" onChange={handleChange} />
                         {errors.price_err && <span className='error'>{errors.price_err}</span>}
                     </div>
                     <div>
                         <label htmlFor="description">Description: </label>
                         <input type="text" name='description' placeholder="Enter description" value={arttool.description} onChange={handleChange} />
                         {errors.description_err && <span className='error'>{errors.description_err}</span>}
                     </div>
                     <div>
                         <label htmlFor="glassSurface">Glass surface: </label>
                         <FormControlLabel
                            control={
                                    <Switch 
                                        checked={arttool.glassSurface} 
                                        onChange={handleChange} 
                                        name="glassSurface" 
                                        id="glassSurface"
                                        />
                                    }
                                    label="Glass surface"
                                    />
                     </div>
                     <div>
                         <label htmlFor="image">Image: </label>
                         <input type="text" name='image' placeholder="Enter image's URL" value={arttool.image} onChange={handleChange} />
                         {errors.image_err && <span className='error'>{errors.image_err}</span>}
                     </div>
                     <div>
                         <label htmlFor="brand">Brand: </label>
                         <select value={arttool.brand} name='brand' onChange={handleChange}>
                             <option value="">Choose brand</option>
                             <option value="KingArt">KingArt</option>
                             <option value="Color Splash">Color Splash</option>
                             <option value="Edding">Edding</option>
                             <option value="Arteza">Arteza</option>
                         </select>
                         <br/>
                         {errors.brand_err && <span className='error'>{errors.brand_err}</span>}
                     </div>
                     <div>
                         <label htmlFor="limitedTimeDeal">Limited Time Deal: </label>
                         <input type="number" name='limitedTimeDeal' value={arttool.limitedTimeDeal} step="1" onChange={handleChange} />
                         {errors.limitedTimeDeal_err && <span className='error'>{errors.limitedTimeDeal_err}</span>}
                     </div>
                     <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                 </form>
             </div>
         </div>
     );
}

export default Form;
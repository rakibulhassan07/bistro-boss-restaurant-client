import React, { use, useState } from "react";
import { ChefHat } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useMenu from "../../../Hook/useMenu";

const AddItems = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useMenu();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image upload with imagebb api
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setImageName(file.name);
    
    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    const formData = new FormData();
    formData.append("image", file);
    
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        Swal.fire({
          title: "Success!",
          text: "Image uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Form data:", data);
      console.log("Selected category:", data.category);
      // Add the image URL to the form data
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: imageUrl,
        category: data.category,
        price: Number(data.price)
      };
      
      console.log("Menu item to be sent:", menuItem);
      
      // Save to database
      const res = await axiosSecure.post('/menu', menuItem);
      
      if (res.data.insertedId) {
        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Menu item added successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
        
        // Reset form and states
        reset();
        setImageUrl("");
        setImagePreview(null);
        setImageName("No file chosen");
        
        // Refetch menu data
        refetch();
      } else {
        throw new Error('No insertedId in response');
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to add menu item. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-orange-400 text-sm mb-2">---What's new?---</p>
        <h1 className="text-3xl font-bold text-gray-800">ADD AN ITEM</h1>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#F3F3F3] rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Recipe Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recipe name*
              </label>
              <input
                type="text"
                placeholder="Recipe name"
                {...register("name", {
                  required: "Recipe name is required",
                  minLength: {
                    value: 2,
                    message: "Recipe name must be at least 2 characters",
                  },
                })}
                className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent"
              />
              {errors.recipeName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recipeName.message}
                </p>
              )}
            </div>

            {/* Category and Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category*
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent appearance-none bg-white"
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                  <option value="popular">Popular</option>
                  <option value="offered">Offered</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price*
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  step="1"
                  min="0"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                  })}
                  className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Recipe Details */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recipe Details*
              </label>
              <textarea
                placeholder="Recipe Details"
                rows="6"
                {...register("recipe", {
                  required: "Recipe details are required",
                  minLength: {
                    value: 10,
                    message: "Recipe details must be at least 10 characters",
                  },
                })}
                className="bg-white w-full px-4 py-3 border border-[#F3F3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-amber-50 focus:border-transparent resize-vertical"
              />
              {errors.recipeDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recipeDetails.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recipe Image
              </label>
              <div className="flex flex-col space-y-2">
                {/* Image preview */}
                {imagePreview && (
                  <div className="w-full flex justify-center mb-2">
                    <img 
                      src={imagePreview} 
                      alt="Recipe preview" 
                      className="h-32 w-32 object-cover rounded-lg border-2 border-orange-300"
                    />
                  </div>
                )}
                
                {/* File upload UI */}
                <div className="flex items-center">
                  <label className="flex-1 flex items-center justify-center p-2 bg-orange-50 border border-orange-300 border-dashed rounded-l-md hover:bg-orange-100 cursor-pointer transition-colors">
                    <FaCloudUploadAlt className="mr-2 text-orange-600 text-xl" />
                    <span className="text-orange-700">Choose file</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <div className="bg-orange-50 border border-orange-300 border-l-0 rounded-r-md p-2 text-orange-700 text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                    {imageName}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <ChefHat size={18} />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;

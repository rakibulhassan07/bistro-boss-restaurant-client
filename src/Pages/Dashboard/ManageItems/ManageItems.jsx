import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useMenu from "../../../Hook/useMenu";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  // This would typically come from props or API call
  
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/menu/${item._id}`);
          if (res.data.deletedCount > 0) {
            await refetch(); // Wait for the refetch to complete
            Swal.fire({
              title: "Deleted!",
              text: `${item.name} has been deleted.`,
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete item",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with subtitle */}
      <div className="text-center mb-8">
        <p className="text-orange-400 text-sm mb-2">---Hurry Up!---</p>
        <h1 className="text-3xl font-bold text-gray-800">MANAGE ALL ITEMS</h1>
      </div>

      {/* Total Items Counter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          TOTAL ITEMS: {menu.length}
        </h2>

        {/* Table Header */}
        <div className="bg-orange-300 rounded-t-lg">
          <div className="grid grid-cols-6 gap-4 p-4 text-white font-semibold text-center">
            <div></div>
            <div>ITEM IMAGE</div>
            <div>ITEM NAME</div>
            <div>PRICE</div>
            <div>UPDATE</div>
            <div>DELETE</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-white border-l border-r border-b rounded-b-lg">
          {menu.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No items found. Data will be populated from your backend.
            </div>
          ) : (
            menu.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center"
              >
                <div className="text-center font-medium">{index + 1}</div>
                <div className="flex justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-12 object-cover rounded bg-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="text-center text-gray-700">{item.name}</div>
                <div className="text-center text-gray-600">${item.price}</div>
                <div className="flex justify-center">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button
                      className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded transition-colors"
                      title="Edit Item"
                    >
                      <Edit size={16} />
                    </button>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageItems;

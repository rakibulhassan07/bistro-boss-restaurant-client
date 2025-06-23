import React, { useState } from "react";
import orderImg from "../../../assets/shop/banner2.jpg";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../Hook/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import OrderTab from "../OrderTab/OrderTab";

const Order = () => {
    const categories =['salad','pizza','soup','dessert','drinks']
    const {category}=useParams()
    const initialIndex=categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>THE PIZZA GARDEN | Order Food</title>
      </Helmet>
      <Cover img={orderImg} title="Order Now"></Cover>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-300 mb-8">
            <Tab
              className={`px-3 py-2 text-sm md:text-base cursor-pointer transition-colors ${
                tabIndex === 0
                  ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Salad
            </Tab>
            <Tab
              className={`px-3 py-2 text-sm md:text-base cursor-pointer transition-colors ${
                tabIndex === 1
                  ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Pizza
            </Tab>
            <Tab
              className={`px-3 py-2 text-sm md:text-base cursor-pointer transition-colors ${
                tabIndex === 2
                  ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Soups
            </Tab>
            <Tab
              className={`px-3 py-2 text-sm md:text-base cursor-pointer transition-colors ${
                tabIndex === 3
                  ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Desserts
            </Tab>
            <Tab
              className={`px-3 py-2 text-sm md:text-base cursor-pointer transition-colors ${
                tabIndex === 4
                  ? "text-yellow-600 font-bold border-b-2 border-yellow-600"
                  : "text-black hover:text-yellow-600"
              }`}
            >
              Drinks
            </Tab>
          </TabList>

          <TabPanel className="p-4">
            <OrderTab title={dessert}></OrderTab>
          </TabPanel>
          <TabPanel className="p-4">
            <OrderTab title={pizza}></OrderTab>
          </TabPanel>
          <TabPanel className="p-4">
           <OrderTab title={salad}></OrderTab>
          </TabPanel>
          <TabPanel className="p-4">
            <OrderTab title={soup}></OrderTab>
          </TabPanel>
          <TabPanel className="p-4">
            <OrderTab title={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;

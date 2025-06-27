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
import "./Order.css";

const Order = () => {
    const categories =['salad','pizza','soup','dessert','drinks','popular','offered']
    const {category}=useParams()
    const initialIndex=categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");
  const popular = menu.filter((item) => item.category === "popular");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div className="min-h-screen order-page">
      <Helmet>
        <title>THE PIZZA GARDEN | Order Food</title>
      </Helmet>
      <div className="order-cover">
        <Cover img={orderImg} title="Order Now"></Cover>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="order-tabs">
          <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🥗</span>
                  <span>Salad</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🍕</span>
                  <span>Pizza</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🍲</span>
                  <span>Soups</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🍰</span>
                  <span>Desserts</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🥤</span>
                  <span>Drinks</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">⭐</span>
                  <span>Popular</span>
                </div>
              </Tab>
              <Tab>
                <div className="tab-with-icon">
                  <span className="tab-icon">🎁</span>
                  <span>Offered</span>
                </div>
              </Tab>
            </TabList>

            <TabPanel>
              <OrderTab title={salad}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={pizza}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={soup}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={dessert}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={drinks}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={popular}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab title={offered}></OrderTab>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Order;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import MenuImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>THE PIZZA GARDEN | Menu</title>
            </Helmet>
            <Cover img={MenuImg} title='out menu'></Cover>
           
        </div>
    );
};

export default Menu;
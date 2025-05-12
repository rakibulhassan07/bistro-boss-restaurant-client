import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hook/useMenu';

const PopularMenu = () => {
    const [menu]=useMenu()
     const popular=menu.filter(item=>item.category==='popular')
    return (
        <section className='mb-12'>
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check it out---'}></SectionTitle>
        <div className='grid md:grid-cols-2 gap-4'>
            {
                popular.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
            }
        </div>
        <div className="flex justify-center mt-8">
          <button className="uppercase border-b-4 btn btn-outline border-0 transition px-4 py-2">
            View Full Menu
          </button>
        </div>
        </section>
    );
};

export default PopularMenu;
import React from 'react';

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className='mx-auto text-center my-8 md:w-4/12' >
            <p className='text-[#D99904] text-xl italic mb-2'>{subHeading}</p>
            <h3 className='border-[#E8E8E8] uppercase text-4xl border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;
import React, { use } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
  const items=useLoaderData()
  console.log(items);
  return (
    <div>
      <h2>This is </h2>
    </div>
  );
};

export default UpdateItem;
import React from 'react';

const MenuItem = ({Component, ...props}) => {
  return (
    <Component {...props}/>
  );
};

export default MenuItem;

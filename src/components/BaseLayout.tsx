import React from 'react';
import './BaseLayout.scss';

export default (props: { children: React.ReactNode }) => {
   return <div className="base-layout">{props.children}</div>;
};

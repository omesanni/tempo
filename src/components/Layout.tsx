import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@primer/octicons-react';

interface ILayoutProps  { 
  title: string;
  showBackIcon?: boolean; 
  children: React.ReactNode;
}

const Layout: FunctionComponent<ILayoutProps> = ({ title, children, showBackIcon }) => (
  <div className="content">
    <div className="content__top pl-4 pr-4 pt-3 pb-3">
      {showBackIcon && (
        <Link to="/" className="go-back">
          <ArrowLeftIcon size="medium" />
        </Link>
      )}
      <h4 className="page-title">{title}</h4>
    </div>
    <div className="content__bottom p-4">
      <div className="page-content p-4">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;

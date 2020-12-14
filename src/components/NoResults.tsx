import React from 'react';

interface NoResultsProps {
  message: string;
}

const NoResults = ({ message }: NoResultsProps) => (
  <div className="mt-4 text-center">
    <h5>{message}</h5>
  </div>
);

export default NoResults;

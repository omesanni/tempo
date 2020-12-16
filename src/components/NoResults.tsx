import React from 'react';

interface INoResultsProps {
  message: string;
}

const NoResults = ({ message }: INoResultsProps) => (
  <div className="mt-4 text-center">
    <h5>{message}</h5>
  </div>
);

export default NoResults;

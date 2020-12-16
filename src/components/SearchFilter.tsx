import React, { ChangeEvent } from 'react';

interface ISearchFilterProps  {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilter = ({ value, onChange, placeholder }: ISearchFilterProps) => (
  <input
    type="search"
    value={value}
    className="form-control"
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default SearchFilter;

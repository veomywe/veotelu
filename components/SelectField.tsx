
import React from 'react';
import { Option } from '../types';

interface SelectFieldProps {
  label: string;
  id: string;
  name: string; // Added name prop
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name, // Destructure name
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name} // Pass name to the element
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200 text-gray-200 appearance-none bg-no-repeat bg-right pr-8"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25em 1.25em',
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-gray-200">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

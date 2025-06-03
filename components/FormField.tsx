
import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  name: string; // Added name prop
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name, // Destructure name
  value,
  onChange,
  placeholder,
  type = 'text',
  isTextArea = false,
  required = false,
}) => {
  const commonProps = {
    id,
    name, // Pass name to the element
    value,
    onChange,
    placeholder,
    required,
    className:
      'w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200 placeholder-gray-500 text-gray-200',
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextArea ? (
        <textarea {...commonProps} rows={3} />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};

export default FormField;

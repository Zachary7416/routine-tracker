// layout/Designation.tsx
import React from 'react';

interface DesignationProps {
  designation: string;
}

const Designation: React.FC<DesignationProps> = ({ designation }) => {
  return (
    <div className="designation">
      <h2>{designation}</h2>
    </div>
  );
};

export default Designation;

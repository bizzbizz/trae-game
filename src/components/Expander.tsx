import React, { useState } from 'react';
import '@/styles/Expander.css';

interface ExpanderProps {
  title: string;
  children: React.ReactNode;
}

const Expander: React.FC<ExpanderProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expandable-section">
      <div className="expandable-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span>{title}</span>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && <div className="expandable-content">{children}</div>}
    </div>
  );
};

export default Expander;
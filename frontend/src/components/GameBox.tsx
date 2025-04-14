import React from 'react';
import { Resource } from '../types/economy';

export interface BoxProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="Box-overlay">
      <div className="Box-container">
        <button className="Box-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export interface ResourceBoxProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceBox: React.FC<ResourceBoxProps> = ({ resource, isOpen, onClose }) => {
  return (
    <Box isOpen={isOpen} onClose={onClose}>
      <div className="Box-content">
        <span style={{ fontSize: '2em', marginRight: '10px' }}>{resource.Icon}</span>
        <h2 style={{ marginBottom: '10px' }}>{resource.ResourceId}</h2>
      </div>
    </Box>
  );
};
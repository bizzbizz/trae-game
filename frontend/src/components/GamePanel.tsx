import React, { useState, useEffect } from 'react';
import { World } from '../types/world';
import { Resource } from '../types/economy';
import { ResourceBox } from './GameBox';

export interface GamePanelProps {
  world: World | null;
}

export const ResourcesPanel: React.FC<GamePanelProps> = ({ world }) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const resources = world?.Economy?.Resources || [];

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsBoxOpen(true);
  };

  const handleCloseBox = () => {
    setIsBoxOpen(false);
    setSelectedResource(null);
  };

  return (
    <div className="resources-panel">
      <div className="resources-list">
        {resources.map((resource, index) => (
          <button
            key={`${resource.ResourceId}-${index}`}
            className="resource-item"
            onClick={() => handleResourceClick(resource)}
          >
            <span>{resource.Icon}</span>
          </button>
        ))}
      </div>

      {selectedResource && (
        <ResourceBox
          resource={selectedResource}
          isOpen={isBoxOpen}
          onClose={handleCloseBox}
        />
      )}
    </div>
  );
};
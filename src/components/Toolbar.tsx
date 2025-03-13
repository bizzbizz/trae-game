import React, { useState } from 'react';
import { parse, stringify } from 'yaml';
import './toolbar.css';

interface ToolbarButton {
  type: string;
  icon: string;
  onClick: string;
}

interface ToolbarConfig {
  type: string;
  width?: string;
  children: ToolbarButton[];
}

interface ToolbarProps {
  position: 'top' | 'left' | 'right' | 'bottom';
  config: ToolbarConfig;
  debug?: boolean;
}

interface TooltipPosition {
  x: number;
  y: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ position, config, debug = false }) => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });

  const handleClick = (action: string) => {
    // TODO: Implement page navigation based on onClick handler
    console.log(`Navigating to: ${action}`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  return (
    <div className={`toolbar toolbar-${position}`} style={{ width: config.width }}>
      <ul className="toolbar-list">
        {config.children.map((button, index) => (
          <li
            key={index}
            className="toolbar-item"
            onClick={() => handleClick(button.onClick)}
            onMouseEnter={() => setHoveredButton(index)}
            onMouseLeave={() => setHoveredButton(null)}
            onMouseMove={handleMouseMove}
          >
            {debug && hoveredButton === index && (
              <div
                className="toolbar-debug-label"
                style={{
                  position: 'fixed',
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  transform: 'none'
                }}
              >
                {stringify(button)}
              </div>
            )}
            <img src={button.icon} alt={button.onClick}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toolbar;
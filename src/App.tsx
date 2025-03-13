import React, { useState, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Map from './components/Map';
import { parse } from 'yaml';

interface ToolbarConfigs {
  LeftToolbar: any;
  TopToolbar: any;
}

const App: React.FC = () => {
  const [toolbarConfigs, setToolbarConfigs] = useState<ToolbarConfigs | null>(null);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    const loadToolbarConfig = async () => {
      try {
        const response = await fetch('/toolbars/layout.yaml');
        const yamlText = await response.text();
        const config = parse(yamlText);
        setToolbarConfigs(config);
      } catch (error) {
        console.error('Error loading toolbar config:', error);
      }
    };

    loadToolbarConfig();
  }, []);

  console.log(toolbarConfigs);
  return (
    <div className="container">
      {toolbarConfigs?.TopToolbar && (
        <Toolbar position="top" config={toolbarConfigs.TopToolbar} debug={debug} />
      )}
      {toolbarConfigs?.LeftToolbar && (
        <Toolbar position="left" config={toolbarConfigs.LeftToolbar} debug={debug} />
      )}
      <Map debug={debug} />
      <button
        onClick={() => setDebug(!debug)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '8px 16px',
          backgroundColor: debug ? '#ff4444' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {debug ? 'Disable Debug' : 'Enable Debug'}
      </button>
    </div>
  );
};

export default App
import React, { useState } from 'react';
import Expander from './Expander';
import '@/styles/Expander.css';

interface Building {
  id: string;
  name: string;
  type: string;
  condition: number;
}

interface Person {
  id: string;
  name: string;
  role: string;
  health: number;
}

interface Resource {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Status {
  id: string;
  type: string;
  value: string;
  severity: 'low' | 'medium' | 'high';
}

interface Action {
  id: string;
  name: string;
  cost: number;
  duration: number;
}

interface Territory {
  id: string;
  name: string;
  buildings: Building[];
  people: Person[];
  resources: Resource[];
  statuses: Status[];
  actions: Action[];
}

const dummyData: Territory[] = [
  {
    id: 'ter1',
    name: 'Northern District',
    buildings: [
      { id: 'b1', name: 'Town Hall', type: 'Administrative', condition: 95 },
      { id: 'b2', name: 'Market', type: 'Commercial', condition: 85 },
    ],
    people: [
      { id: 'p1', name: 'John Smith', role: 'Mayor', health: 100 },
      { id: 'p2', name: 'Emma Davis', role: 'Merchant', health: 95 },
    ],
    resources: [
      { id: 'r1', name: 'Gold', amount: 1000, unit: 'coins' },
      { id: 'r2', name: 'Wood', amount: 500, unit: 'logs' },
    ],
    statuses: [
      { id: 's1', type: 'Economy', value: 'Growing', severity: 'low' },
      { id: 's2', type: 'Security', value: 'Alert', severity: 'medium' },
    ],
    actions: [
      { id: 'a1', name: 'Build House', cost: 100, duration: 3 },
      { id: 'a2', name: 'Train Guard', cost: 50, duration: 2 },
    ],
  },
  {
    id: 'ter2',
    name: 'Harbor District',
    buildings: [
      { id: 'b3', name: 'Lighthouse', type: 'Maritime', condition: 90 },
      { id: 'b4', name: 'Warehouse', type: 'Storage', condition: 75 },
    ],
    people: [
      { id: 'p3', name: 'Sarah Chen', role: 'Harbor Master', health: 90 },
      { id: 'p4', name: 'Mike Wilson', role: 'Fisher', health: 85 },
    ],
    resources: [
      { id: 'r3', name: 'Fish', amount: 300, unit: 'kg' },
      { id: 'r4', name: 'Rope', amount: 200, unit: 'meters' },
    ],
    statuses: [
      { id: 's3', type: 'Trade', value: 'Active', severity: 'low' },
      { id: 's4', type: 'Weather', value: 'Storm Warning', severity: 'high' },
    ],
    actions: [
      { id: 'a3', name: 'Repair Dock', cost: 150, duration: 4 },
      { id: 'a4', name: 'Send Trade Ship', cost: 200, duration: 5 },
    ],
  },
];

const MainPanel: React.FC = () => {
  const [expandedTerritory, setExpandedTerritory] = useState<string | null>(null);

  return (
    <div className="main-panel">
      <h2>Territories</h2>
      {dummyData.map(territory => (
        <div key={territory.id} className="expandable-section">
          <div 
            onClick={() => setExpandedTerritory(expandedTerritory === territory.id ? null : territory.id)}
            className="expandable-header"
          >
            <h3 style={{ margin: 0 }}>{territory.name}</h3>
            <span>{expandedTerritory === territory.id ? '▼' : '▶'}</span>
          </div>
          
          {expandedTerritory === territory.id && (
            <div className="expandable-content">
              <Expander title="Buildings">
                {territory.buildings.map(building => (
                  <div key={building.id}>
                    {building.name} - {building.type} (Condition: {building.condition}%)
                  </div>
                ))}
              </Expander>

              <Expander title="People">
                {territory.people.map(person => (
                  <div key={person.id}>
                    {person.name} - {person.role} (Health: {person.health}%)
                  </div>
                ))}
              </Expander>

              <Expander title="Resources">
                {territory.resources.map(resource => (
                  <div key={resource.id}>
                    {resource.name}: {resource.amount} {resource.unit}
                  </div>
                ))}
              </Expander>

              <Expander title="Status">
                {territory.statuses.map(status => (
                  <div key={status.id}>
                    {status.type}: <span style={{
                      color: status.severity === 'high' ? 'red' : 
                             status.severity === 'medium' ? 'orange' : 'green'
                    }}>{status.value}</span>
                  </div>
                ))}
              </Expander>

              <Expander title="Actions">
                {territory.actions.map(action => (
                  <button 
                    key={action.id}
                    style={{
                      margin: '5px',
                      padding: '5px 10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {action.name} ({action.cost} gold, {action.duration} days)
                  </button>
                ))}
              </Expander>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MainPanel;
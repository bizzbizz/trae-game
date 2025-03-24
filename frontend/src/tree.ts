import { World } from "./types/world";

class TreeView {
    private expandedNodes: Set<string>;
    private currentTab: 'world' | 'gameMechanics';

    constructor() {
        this.expandedNodes = new Set();
        this.currentTab = 'world';
    }

    private createTreeNode(key: string, value: any, path: string = ''): HTMLDivElement {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'tree-node';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'tree-node-content';
        
        const isExpandable = typeof value === 'object' && value !== null;
        const nodePath = path ? `${path}.${key}` : key;
        
        const expander = document.createElement('span');
        expander.className = 'expander';
        if (isExpandable) {
            expander.textContent = this.expandedNodes.has(nodePath) ? '-' : '+';
        } else {
            expander.style.visibility = 'hidden';
        }
        contentDiv.appendChild(expander);
        
        const label = document.createElement('span');
        label.style.display = 'flex';
        label.style.flexDirection = 'column'; 

        if (isExpandable && 'name' in value && 'id' in value) {
            const nameSpan = document.createElement('span');
            nameSpan.textContent = value.name;
            
            const idSpan = document.createElement('span');
            idSpan.textContent = value.id;
            idSpan.style.color = '#888';
            idSpan.style.fontSize = '0.2em';
            
            label.appendChild(nameSpan);
            label.appendChild(idSpan);
        } else {
            label.textContent = `${key}: ${isExpandable ? '' : JSON.stringify(value)}`;
        }
        contentDiv.appendChild(label);
        nodeDiv.appendChild(contentDiv);
        
        if (isExpandable) {
            const childrenDiv = document.createElement('div');
            childrenDiv.className = 'tree-children';
            childrenDiv.style.display = this.expandedNodes.has(nodePath) ? 'block' : 'none';
            
            Object.entries(value).forEach(([childKey, childValue]) => {
                if(childKey !== 'name' && childKey !== 'id') {
                    childrenDiv.appendChild(this.createTreeNode(childKey, childValue, nodePath));
                }
            });
            
            nodeDiv.appendChild(childrenDiv);
            
            contentDiv.addEventListener('click', () => {
                const isExpanded = this.expandedNodes.has(nodePath);
                if (isExpanded) {
                    this.expandedNodes.delete(nodePath);
                    expander.textContent = '+';
                    childrenDiv.style.display = 'none';
                } else {
                    this.expandedNodes.add(nodePath);
                    expander.textContent = '-';
                    childrenDiv.style.display = 'block';
                }
            });
        }
        
        return nodeDiv;
    }

    updateGameStateTree(world: World): void {
        console.log('updateGameStateTree');
        const treeContent = document.getElementById('treeContent');
        if (!treeContent) return;
        
        treeContent.innerHTML = '';
        
        if (this.currentTab === 'world') {
            treeContent.appendChild(this.createTreeNode('world', world));
        }
    }

    setCurrentTab(tab: 'world' | 'gameMechanics'): void {
        this.currentTab = tab;
    }
}

export default TreeView;
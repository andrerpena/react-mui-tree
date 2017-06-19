
import * as React from 'react';
import { render } from 'react-dom';
import * as ReactMuiTree from '../src/ReactMuiTree';
require('./styles.scss');

const nodes: ReactMuiTree.IReactMuiTreeNode[] = [
    {
        key: 'node1',
        displayName: 'Node 1',
        childNodes: [
            {
                key: 'node1.1',
                displayName: 'Node 1.1',
            }
        ]
    },
    {
        key: 'node2',
        displayName: 'Node 2',
    }
];

render(
    <div>
        <ReactMuiTree.ReactMuiTree nodes={nodes} expandedNodeKey={'node1'} onClick={(n) => console.log(n)}>
        </ReactMuiTree.ReactMuiTree>
    </div >,
    document.getElementById('app_container')
);
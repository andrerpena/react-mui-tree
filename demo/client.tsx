
import * as React from 'react';
import { render } from 'react-dom';
import * as ReactMuiTree from '../src/ReactMuiTree';
require('./styles.scss');

const nodes: ReactMuiTree.IMuiTreeNode[] = [
    {
        key: 'node1',
        displayName: 'Node 1',
        children: [
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
        <ReactMuiTree.Component nodes={nodes}>
        </ReactMuiTree.Component>
    </div>,
    document.getElementById('app_container')
);
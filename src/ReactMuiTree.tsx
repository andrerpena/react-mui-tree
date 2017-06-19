import * as React from 'react';

/**
 * Node structure
 */
export interface IReactMuiTreeNode {
    key: string;
    displayName: string;
    childNodes?: IReactMuiTreeNode[];
}

/**
 * Node props
 */
interface IReactMuiTreeNodeProps {
    expandedNodesMap: { [key: string]: boolean; };
    node: IReactMuiTreeNode;
    onClick: (node: IReactMuiTreeNode) => void;
}

/**
 * Tree props
 */
interface IReactMuiTreeProps {
    expandedNodeKey: string
    nodes: IReactMuiTreeNode[];
    onClick: (node: IReactMuiTreeNode) => void;
}

interface IReactMuiTreeState {
    /**
    * Maps whether or not a particular node key is expanded
    */
    expandedNodesMap: { [key: string]: boolean; };
}

class ReactMuiTreeNode extends React.Component<IReactMuiTreeNodeProps, {}> {
    constructor(props: IReactMuiTreeNodeProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        const { onClick, node } = this.props;
        onClick(node);
    }

    render() {
        const {
            node,
            onClick,
            expandedNodesMap,
        } = this.props;

        const childProps = {
            expandedNodesMap,
            onClick,
        };

        const children: JSX.Element[] = node.childNodes ? node.childNodes.map((node) => <ReactMuiTreeNode node={node} {...childProps} />) : null;

        const collapsed = expandedNodesMap[node.key] === false;

        return <div className="react-mui-tree-node">
            <div className="react-mui-tree-node-content" onClick={this.handleClick}>
                <div className="react-mui-tree-node-icon">
                </div>
                <div className="react-mui-tree-node-text">
                    {node.displayName}
                </div>
                <div className="react-mui-tree-node-collapse-button">
                </div>
            </div>
            <div className={`react-mui-tree-node-children ${collapsed ? "collapsed" : ''}`}>
                {children}
            </div>
        </div>
    }
}

export class ReactMuiTree extends React.Component<IReactMuiTreeProps, IReactMuiTreeState> {
    constructor(props: IReactMuiTreeProps) {
        super(props);
        this.populateParentNodesMap = this.populateParentNodesMap.bind(this);
        this.getExpandedNodesMap = this.getExpandedNodesMap.bind(this);
        this.handleOnNodeClick = this.handleOnNodeClick.bind(this);

        const { nodes, expandedNodeKey } = this.props;

        // This will populate a cache so it will be easier to know which are the parent nodes of a given node
        this.populateParentNodesMap(nodes);

        this.setState({
            expandedNodesMap: this.getExpandedNodesMap(nodes, expandedNodeKey)
        });
    }

    private handleOnNodeClick(node: IReactMuiTreeNode): void {
        if (!node) throw Error('Argument \'node\' should be truthy');
        const { nodes, onClick } = this.props;
        // determine if it's a collapse or a click
        if (node.childNodes && node.childNodes.length) {
            // it's a collapse event
            // let's check the state of the node
            const nodeExpanded = this.state.expandedNodesMap[node.key];
            let newExpandedState;
            if (nodeExpanded) {
                // we need to collapse it
                newExpandedState = { ...this.state.expandedNodesMap };
                newExpandedState[node.key] = false;
                this.setState({ expandedNodesMap: newExpandedState });
            }
            else {
                // we need to expand it
                newExpandedState = this.getExpandedNodesMap(nodes, node.key);
            }
            this.setState({ expandedNodesMap: newExpandedState });
        } else {
            onClick(node);
        }
    }

    /**
     * Maps a given key to all the parents of that key
     */
    parentNodesMap: { [key: string]: string[] }

    /**
     * Returns a map that says which nodes are expanded and collapsed
     * @param nodes The hierarchical list of nodes
     * @param expandedNodeKey The key of the expanded node
     */
    private getExpandedNodesMap(nodes: IReactMuiTreeNode[], expandedNodeKey: string): { [key: string]: boolean; } {
        if (!expandedNodeKey) throw Error('Argument \'expandedNodeKey\' should be truthy');
        if (!nodes) throw Error('Argument \'nodes\' should be truthy');

        const results: { [key: string]: boolean; } = {};
        const parents = this.parentNodesMap[expandedNodeKey];

        for (const node of nodes) {
            // the node will be expanded if it is the expandedNodeKey or one of its parents
            results[node.key] = node.key === expandedNodeKey || parents.indexOf(node.key) != -1;
        }
        return results;
    }

    /**
     * Populates the parentNodesMap property. The parentNodesMap propertyv maps a given key to all the parents of that key
     * @param nodes The hierarchical list of nodes
     * @param parentNodeKeys A list of all nodes to be added as parent node of each node
     */
    private populateParentNodesMap(nodes: IReactMuiTreeNode[], parentNodeKeys: string[] = []) {
        for (let node of nodes) {
            this.parentNodesMap[node.key] = parentNodeKeys;
            if (node.childNodes && node.childNodes.length) {
                this.populateParentNodesMap(node.childNodes, parentNodeKeys.concat(node.key));
            }
        }
    }

    render() {
        const props = {
            expandedNodesMap: this.state.expandedNodesMap,
            onClick: this.handleOnNodeClick,
        };
        const children: JSX.Element[] = this.props.nodes
            ? this.props.nodes.map((node) => <ReactMuiTreeNode node={node} {...props} />)
            : null;
        return (
            <div className="react-mui-tree">
                {children}
            </div>
        );
    }
}
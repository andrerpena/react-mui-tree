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
interface IReactMuiTreeNodeProps extends IReactMuiTreeNode {
    collapsed: boolean;
    onCollapse: (key: string, collapsed: boolean) => void
}

/**
 * Tree props
 */
interface IReactMuiTreeProps {
    expandedNodeKey: string
    nodes: IReactMuiTreeNode[];
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
        this.handleChildNodeCollapsedStateChange = this.handleChildNodeCollapsedStateChange.bind(this);
    }

    handleChildNodeCollapsedStateChange() {

    }

    render() {
        const { displayName, collapsed, onCollapse } = this.props;
        const children: JSX.Element[] = this.props.childNodes ? this.props.childNodes.map((c) => <ReactMuiTreeNode {...c} />) : null;
        return <div className="react-mui-tree-node">
            <div className="react-mui-tree-node-content">
                <div className="react-mui-tree-node-icon">
                </div>
                <div className="react-mui-tree-node-text">
                    {displayName}
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

export class Component extends React.Component<IReactMuiTreeProps, {}> {
    constructor(props: IReactMuiTreeProps) {
        super(props);
        this.populateParentNodesMap = this.populateParentNodesMap.bind(this);
        this.getInitialExpandedNodesMap = this.getInitialExpandedNodesMap.bind(this);

        this.populateParentNodesMap(props.nodes, props.expandedNodeKey);
        this.setState({
            expandedNodesMap: this.getInitialExpandedNodesMap(props.nodes, props.expandedNodeKey)
        });
    }

    /**
     * Maps a given key to all the parents of that key
     */
    parentNodesMap: { [key: string]: string[] }

    getInitialExpandedNodesMap(
        nodes: IReactMuiTreeNode[],
        expandedNodeKey: string,
        expandedNodesMap: { [key: string]: boolean; } = {}): { [key: string]: boolean; } {

            

        return expandedNodesMap;
    }

    /**
     * Populates the parentNodesMap property
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
        const children: JSX.Element[] = this.props.nodes ? this.props.nodes.map((n) => <ReactMuiTreeNode {...n} />) : null;
        return (
            <div className="react-mui-tree">
                {children}
            </div>
        );
    }
}
import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliry';
import classes from './Layout.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = (props) => {
        this.setState(
            { showSideDrawer: false }
        )
    }

    toggleButtonHandler = (props) => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={this.toggleButtonHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.showSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
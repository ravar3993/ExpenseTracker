import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Profile from './Profile'
import WalletView from './WalletView'
import ExpensesView from './ExpensesView'
import {Container} from 'react-bootstrap'
import AnalysisView from './AnalysisView';


class DashboardView extends Component {
    constructor(){
        super()
    }
    
    render() {
        let view_content
        switch(this.props.nav_key) {
            case "1":
                view_content = <AnalysisView />
                break;
            case "2":
                view_content = <ExpensesView />
                break;
            case "3":
                view_content = <WalletView />
                break;
            case "4.1":
                view_content = <Profile />
                break;
            default:
                view_content = <AnalysisView />
        }

        return (
            <>
            {view_content}
            </>
        )
    }
}
 
export default DashboardView;
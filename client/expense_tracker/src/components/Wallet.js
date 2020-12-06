import React, { PureComponent } from 'react';

class Wallet extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token')
        }
    }
    getWalletBalance = () => {
    }
    render(){
        return (
            <>
            <p>Wallet Amount : 500 </p>
            </>
        )
    }
}
 
export default Wallet;
import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import datapoint from '../datapoint';
import FindKitty from './FindKitty';
import KittyInfo from './KittyInfo';

class Browser extends Component {
  constructor(props) {
    super(props)
    this.state = { info: []}
    this.fetch = this.fetch.bind(this)
  }

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store

    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }

  // fetchRandom(){
  //   const { contracts } = this.context.drizzle;
  // }

  fetch(id) {
    //need logic for checking id format
    const { contracts } = this.context.drizzle;
    contracts.CryptoKitties.methods.getKitty(id).call((err, result) => {
      if (err) this.setState({ error: err.message })
      else {
        const newState = datapoint.getKittyInfo(result);
        this.setState({
          info: newState
        })
      }
    })
  }

  render() {
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>

        {/* Input to type in the kitty ID here */}
        <FindKitty fetch={this.fetch}/>
        
        {/* Display Kitty info here */}
        <KittyInfo info={this.state.info} error={this.state.error}/>
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;

import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS, KITTY_API_URL } from '../config';
import datapoint from '../datapoint';
import FindKitty from './FindKitty';
import Kitty from './Kitty';

class Browser extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.searchKitty = this.searchKitty.bind(this)
    this.searchRandomKitty = this.searchRandomKitty.bind(this)
    this.isLoading = this.isLoading.bind(this)
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

  isLoading(status) {
    this.setState({
      error: null,
      isLoading: status
    })
  }

  async searchRandomKitty() {
    const { contracts } = this.context.drizzle;
    const totalSupply = await contracts.CryptoKitties.methods.totalSupply().call()
    const randomId = 1 + Math.floor(Math.random() * Number(totalSupply))
    this.searchKitty(randomId)
  }

  async searchKitty(id) {
    //checking id format
    if (!this.isValidId(id)) {
      this.setState({
        error: 'Enter a number greater than 0'
      })
      return
    }
    try {
      const { contracts } = this.context.drizzle;
      const apiResponse = await fetch(`${KITTY_API_URL}${id}`)
      const apiJSON = await apiResponse.json()
      const contractResult = await contracts.CryptoKitties.methods.getKitty(id).call()
      const newState = datapoint.getKittyInfo(id, apiJSON, contractResult);
      this.setState({ 
        isLoading: false,
        error: null, 
        data: newState
      })
    } catch (e) {
      //kitten not found
      this.setState({
        isLoading: false,
        error: 'Kitten not found'
      })
    }
  }

  isValidId(id) {
    const num = parseInt(id, 10)
    return !isNaN(num) && num > 0
  }

  render() {
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>

        {/* Input to type in the kitty ID here */}
        <FindKitty 
          searchKitty={this.searchKitty}
          searchRandomKitty={this.searchRandomKitty}
          isLoading={this.isLoading}
          />
        
        {/* Display Kitty info here */}
        <Kitty result={this.state} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;

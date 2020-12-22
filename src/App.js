import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Modal from 'react-bootstrap/Modal'

class App extends Component {

  async loadBlockchainData(flag) {
    if(window.web3 !== undefined){
      if(window.ethereum){
        const web3 = new Web3(window.ethereum);
        try{
          await window.ethereum.enable();
          var accounts = await web3.eth.getAccounts();
          var firstAcc = accounts[0];
          var balance = await web3.eth.getBalance(firstAcc);
          balance =  web3.utils.fromWei(balance, "ether") + " ETH";
          this.setState({modalShow:!flag ,modalBalance:flag , balance:balance});
        } catch(e){
          console.error(e)
        }
      }
    } else {
      this.showModal(false);
      alert('No metmask installed');
    }
  }

  onClick() {
    this.setState({modalShow:true});
  }

  showModal = (flag) => {
    this.setState({modalShow:flag});
  }

  closeBalanceModal = () => {
    this.setState({modalBalance:false});
  }

  showBalanceModal = (flag) => {
    this.loadBlockchainData(flag);
  }

  checkBalance = () => {
    this.closeBalanceModal();
    this.setState({active: true});
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
    this.state = { account: '' , active:false , balance:0 , modalShow:false, modalBalance:false}
  }

  render() {
    const active = this.state.active;
    return (
      <div className="App">
      <header className="App-header">
      <div>
        { active ? (
          <div>
            <p>Your Account Balance:</p>
            <p>{this.state.balance}</p>
          </div>
        ) : (
          <button className="btn btn-primary" type="button" onClick={this.onClick}>
            Connect
          </button>
        )}
        <Modal
          show={this.state.modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h5>
              Do you want to connect with MetaMask ?
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => this.showModal(false)}>Close</button>
            <button className="btn btn-primary" onClick={() => this.showBalanceModal(true)}>Connect</button>
          </Modal.Footer>
        </Modal>

          <Modal
            show={this.state.modalBalance}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
          <Modal.Body>
            <h5>
              Check your balance ?
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => this.closeBalanceModal(false)}>Close</button>
            <button className="btn btn-primary" onClick={() => this.checkBalance()}>Check Balance</button>
          </Modal.Footer>
        </Modal>

      </div>
      </header>
      </div>
    );
  }
}

export default App;

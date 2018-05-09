import React, { Component } from 'react';
import { Panel, PanelGroup, Row, Col, Grid } from 'react-bootstrap';
import './App.css';

const apiUrl = '///localhost:3000/api'
const listTransactionsUrl = `${apiUrl}/transactions/`

const CREDIT_COLOR = 'green';
const DEBIT_COLOR = 'red';

class App extends Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    fetch(listTransactionsUrl)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((all) => {
        this.setState({
          transactions: all
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getPanelStyle = (tType) => ({
    padding: '10px',
    backgroundColor: tType === 'credit' ? CREDIT_COLOR : DEBIT_COLOR
  })

  renderTransactions = () => {
    const { transactions } = this.state;

    if (!transactions.length) {
      return <div>No transactions yet!. </div>
    }

    return (
      transactions.map((t) => (
        <Panel eventKey={t.id} key={t.id}>
            <Panel.Heading>
              <div style={this.getPanelStyle(t.type)}>
                <Panel.Title toggle>
                  <p><em>ID: </em>{t.id}</p>
                  <p><em>Type: </em>{t.type}</p>
                </Panel.Title>
              </div>
            </Panel.Heading>
            <Panel.Body collapsible>
                <p><em>Amount: </em>{t.amount}</p>
                <p><em>Effective date: </em>{t.effectiveDate}</p>
            </Panel.Body>
         </Panel>
      ))
    );
  }

  render() {
    return (
      <div className="text-center">
        <h1>Transactions List</h1>
        <Grid>
          <Row className="show-grid">
            <Col sm={12}>
              <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
                  { this.renderTransactions() }
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

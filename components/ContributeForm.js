import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

export default class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const campaign = await Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts(); // phai co await o day xxxx
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contriibute</label>

          <Input
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} type="submit" primary>
          Contribute!
        </Button>
      </Form>
    );
  }
}

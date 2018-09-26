import React, { Component } from "react"
import { Button, Form, Message, Input } from "semantic-ui-react"
import Layout from "../../../components/Layout.js"

import web3 from "../../../ethereum/web3.js"

import Campaign from "../../../ethereum/campaign.js"

import { Link, Router } from "../../../routes.js"

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  }

  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  onSubmit = async e => {
    this.setState({
      loading: true,
      errorMessage: ""
    })

    e.preventDefault()

    const { description, value, recipient } = this.state
    try {
      const campaign = await Campaign(this.props.address)
      const accounts = await web3.eth.getAccounts() // chu y: chi khi thuc hien send transaction to blochchain
      // la mat nhieu thoi gian, con get accounts thi rat nhanh
      console.log("accounts", accounts)
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0]
        })

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({
        errorMessage: err.message
      })
    }

    this.setState({
      loading: false
    })
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a request</h3>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew

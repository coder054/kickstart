import React, { Component } from "react"
import factory from "../ethereum/factory"

import { Card, Button } from "semantic-ui-react"
import Layout from "../components/Layout"
import { Link } from "../routes"

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns } // du lieu se available cho component duoi dang prop
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`campaigns/${address}`}>
            <a> View campaign </a>
          </Link>
        ),
        fluid: true
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3> Open Campaigns! </h3>

        <Link route="/campaigns/new">
          <a className="item">
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />{" "}
            {/* Chu y: khong dung </Button> xxxx */}
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default CampaignIndex // xxxx bat buoc  phai export component

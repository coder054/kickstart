import React, {Component} from 'react'
import Layout from '../../components/Layout'

import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react'


import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import {Router} from '../../routes'

class CampaignNew extends Component{
  state={
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    test: 'dddd'
  }

  onSubmit = async (e)=>{
    e.preventDefault()
    this.setState({errorMessage: ''})
    this.setState({loading: true})
    try{
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      })
      Router.pushRoute('/')

      // window.location.href = "http://localhost:3001/"

      this.setState({test: 'TESTTTTTTTTTTTTTTTTTTTT'})

    }catch(err){
      this.setState({errorMessage: err.message})
    }

    this.setState({loading: false})

  }


  render (){
    return (
      <Layout>
        <h3> Create a campaign {this.state.test} </h3>

      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
       <Form.Field>
         <label> Minimum Contribution </label>
         <Input
           label="wei"
           labelPosition="right"
           value={this.state.minimumContribution}
           onChange={e => this.setState({minimumContribution: e.target.value})}

           />
       </Form.Field>

       <Message error header="Oops!" content={this.state.errorMessage} ></Message>
       <Button loading={this.state.loading} primary type='submit'>Create!</Button>
     </Form>


      </Layout>
    )
  }
}

export default CampaignNew // xxxx bat buoc  phai export component

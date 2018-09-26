const assert = require('assert')

const ganache = require('ganache-cli')

const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')

const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach ( async ()=>{
  accounts = await web3.eth.getAccounts()

  // deploy new version to blockchain
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data: compiledFactory.bytecode})
  .send({ from: accounts[0], gas: '1000000' })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000' // xxxx hinh nhu gas chi dung khi ham do la tuong tac lam thay doi data (.send()) hoac khi deploy thi phai
  }) // .call va .send // call khi ta chi muon get info

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call() // destructuring from an array xxxx

  // tuong duong campaignAddress = await factory.methods.getDeployedCampaigns().call()[0]

  // get from already deployed Contract onblockchain
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)

} )

describe('Campaigns', ()=>{
  it('deploys a factory and a campaign', ()=>{
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  } )


  it('mark caller as the campaign manager', async ()=>{
    const manager = await campaign.methods.manager().call() // xxxx khi ta tao mot public variable, mot get method tu dong duoc tao xxxx
    assert.equal(accounts[0], manager)



  } )


  it('allow people to contribute money and mark them as approvers', async ()=>{
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '101'
    })

    const isContributor = await campaign.methods.approvers(accounts[1]).call()  // xxxx chu y approvers la bien public nen method approvers() duoc tu dong tao. Hon nua, pass tham so vao chinh la index


    assert(isContributor)

  } )


  it('allow a manger to make a payment request', async()=>{
    await campaign.methods.createRequest(
      'mua pin', '999', accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    }) // xxxx chu y, khi send transaction to function, khong nhan duoc gi lai ca (khong return gi)

    const request = await campaign.methods.requests(0).call() // xxxx chu y requests la bien public nen method requests() duoc tu dong tao. Hon nua, pass tham so vao chinh la index

    assert.equal('mua pin', request.description)
  } )


  it('process request', async ()=>{
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })

    await campaign.methods
    .createRequest('mua ram',  web3.utils.toWei('5', 'ether') , accounts[1])
    .send({
      from: accounts[0],
      gas: '1000000'
    })

    await campaign.methods
    .approveRequest(0)
    .send({
      from: accounts[0],
      gas: '1000000'
    })

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    })


    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether') // string
    balance = parseFloat(balance)


    assert(balance > 104)




  })

} )

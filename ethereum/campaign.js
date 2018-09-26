import web3 from "./web3"

import CampaignCode from "./build/Campaign.json"

const Campaign = async address => {
  return await new web3.eth.Contract(
    JSON.parse(CampaignCode.interface),
    address
  )
}
export default Campaign

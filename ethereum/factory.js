import web3 from "./web3"

import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x0Ef30b59E762A07356520997382dad21E31896Bb"
)

export default instance

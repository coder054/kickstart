pragma solidity ^0.4.17;
contract CampaignFactory{
  address[] public deployedCampaigns;
  uint public value;


  constructor () public payable {
    value = 1;
  }

  function createCampaign(uint minimum) public {
    address manager = msg.sender;
    address newCampaign = new Campaign(minimum, manager);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns () public view returns (address[]) {
    return deployedCampaigns;
  }
}


contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address=>bool) approvals;
  }

  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount; // ta khong the biet so luong cac items trong mot mapping. Cho nen phai tao mot bien moi, moi khi them item vao mapping, ta dong thoi +1 vao bien theo doi so luong
  Request[] public requests;

  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  constructor (uint minimum, address creator) public payable {
    manager = creator; // chu y neu dat ten parameter la manager thi se gay loi thu vi xxxx
    minimumContribution = minimum;
  }
  function contribute() public payable {
    // xxxx bat cu khi nao dung msg.value thi ham phai ghi la payable,
    // khi goi ham ben frontend can them value: ... Vi du
    //   await campaign.methods.contribute().send({
    //    from: accounts[0],
    //    value: web3.utils.toWei(this.state.value, "ether")
    //  });


    require (msg.value > minimumContribution);
    approvers[msg.sender] = true;
    approversCount++;
  }
  function createRequest (string description, uint value, address recipient) public payable restricted { // xem lai co can payable o day khong
    Request memory newRequest = Request({
    description: description,
    value: value,
    complete: false,
    recipient: recipient,
    approvalCount: 0
    // khong can initialise approvals vi no la type reference
    });
    requests.push(newRequest);
  }

  function approveRequest(uint index) public {
    Request storage request = requests[index];
    // require khong nhat thiet phai nam o dau function
    require(approvers[msg.sender]);
    require(request.approvals[msg.sender] != true);
    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint index) public restricted{
    Request storage request = requests[index];
    require(!request.complete);
    require(request.approvalCount > (approversCount / 2) );
    request.recipient.transfer(request.value); // recipient la mot address type nen co the dung ham transfer
    request.complete = true;
  }

  function getSummary() public view returns (uint, uint, uint, uint, address) {
    return (
        minimumContribution,
        address(this).balance,//xxxx
        requests.length,
        approversCount,
        manager
      );
  }

  function getRequestsCount() public view returns(uint){
    return requests.length;
  }

}

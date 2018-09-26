## Giới thiệu
Ý tưởng của dự án là để giải quyết ván đề của trang kickstart (một trang huy động vốn)
Người dùng của trang có thể tạo một campaign để huy động vốn (manager), bình thường những người dùng khác
sẽ contribute một lượng tiền vào campaign (approvers).
Manager sẽ tạo các request để mua các thứ cần thiết phục vụ cho campaign(trong request có thông tin mua, lượng tiền, người nhận tiền: recepient) . Các approvers sẽ quyết định có phê duyệt cho request hay không. Khi request có lượng phê duyệt lớn hơn một nửa tổng số approvers, Manager có thể finilize request, tiền sẽ được chuyển đến recepient
Ở trang kickstart bình thường, sau khi contribute vào campaign, tiền của campaign có thể được manager sử dụng sai mục đích.
Sử dụng smart contract hạn chế phần nào việc này

## Installation:

- npm install --global --production windows-build-tools
- npm install
- Open dev.bat file in project root folder, wait for server start then open http://localhost:3001/

## How to Compile

This repo already include the compiled code of contract file. If you want to re-compile run:

- node .\ethereum\compile.js

## How to deploy

- node .\ethereum\deploy.js

Then copy the address that the contract is deployed to, finally paste it into ./ethereum/factory.js

## Test
- npm run test

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FundTreasury {

    address public owner;

    mapping(address => uint256) public contributions;

    event Funded(address indexed from, uint256 amount);

    constructor(){
        /**
         * 在 Solidity 中，msg.sender 是一个全局变量，
         * 代表当前调用合约函数的账户地址。
         * 这里 owner 就是部署该合约的人
         * 此外还有msg.value (uint) 当前调用发送的以太币
         * 同时还有其他全局变量 tx block等
         */
        owner = msg.sender;
    }
    function fund() public payable {
        require(msg.value > 0, "ZERO_VALUE");
        contributions[msg.sender] += msg.value;
    }

    // 允许直接向合约转账
    receive() external payable {
        fund();
    }
}
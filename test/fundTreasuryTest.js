const {ethers, deployments, getNamedAccounts} = require('hardhat')
const {assert, expect} = require('chai')
describe('fundTreasury', () => {
    let fundTreasury, deployer
    // 在每个测试用例运行前执行
    beforeEach(async () => {
        // 部署标注了 "all" 标签的合约（并创建快照
        await deployments.fixture(["all"])
        // 获取已部署合约的信息
        const fundTreasuryDeploy = await deployments.get("FundTreasury")
        // 获取合约实例以进行交互
        fundTreasury = await ethers.getContractAt("FundTreasury", fundTreasuryDeploy.address)
        // 获取配置中的账户
        deployer = (await getNamedAccounts()).deployer

    })
    it('should fund the treasury success', async () => {
        await fundTreasury.fund({value: 1, sender: deployer})
        assert.equal(await fundTreasury.contributions(deployer), 1)
    })
    it('should fund fail when treasury equal 0', async () => {
        await expect(fundTreasury.fund({value: 0, sender: deployer})).to.be.revertedWith("ZERO_VALUE")
    });
    it('should receive success', async () => {
        const deployerSigner = await ethers.getSigner(deployer);
        await deployerSigner.sendTransaction({
            to: fundTreasury.target, // 在 Ethers v6 中，合约地址是 .target
            value: 1,
        });
        assert.equal(await fundTreasury.contributions(deployer), 1)
    });
    it('should receive fail when treasury equal 0', async () => {
        const deployerSigner = await ethers.getSigner(deployer);
        await expect(deployerSigner.sendTransaction({
            to: fundTreasury.target, // 在 Ethers v6 中，合约地址是 .target
            value: 0,
        })).to.be.revertedWith("ZERO_VALUE")
    });
})
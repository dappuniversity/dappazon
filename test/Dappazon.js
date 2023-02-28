const { expect } = require("chai")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {
    let dappazon;
    let deployer;
    let buyer;
    beforeEach(async () => {
        [deployer, buyer] = await ethers.getSigners()
        const CONTRACT = await ethers.getContractFactory("Dappazon")
        dappazon = await CONTRACT.deploy()
    })
    describe("Deployment", () => {
        it("Sets the owner", async () => {
            expect(await dappazon.getOwner()).to.equal(deployer.address)
        })
    })

    describe("Listing", () => {
        let transaction

        const ID = 1
        const NAME = "Shoes"
        const CATEGORY = "Clothing"
        const IMAGE = "https://ipfs.io/ipfs/QmTxKjWy2VZLwvpreo7LdbRZj5ym1td8sicTrXS9pfje5K?filename=download.jpg"
        const COST = tokens(1)
        const RATING = 3
        const STOCK = 5

        console.log("cost tokens " + COST);

        beforeEach(async () => {
            transaction = await dappazon.connect(deployer).list(
                ID,
                NAME,
                CATEGORY,
                IMAGE,
                COST,
                RATING,
                STOCK
            )
            await transaction.wait()
        })

        it("Returns item attributes", async () => {
            const item = await dappazon.items(ID);
            expect(item.id).to.equal(ID)
            expect(item.image).to.equal(IMAGE)
        })

        it("Emits List event", () => {
            expect(transaction).to.emit(dappazon, "List")
        })
    })

    describe("Buying", () => {
        let transaction
        let buyerTransaction

        const ID = 1
        const NAME = "Shoes"
        const CATEGORY = "Clothing"
        const IMAGE = "https://ipfs.io/ipfs/QmTxKjWy2VZLwvpreo7LdbRZj5ym1td8sicTrXS9pfje5K?filename=download.jpg"
        const COST = tokens(1)
        const RATING = 3
        const STOCK = 5

        beforeEach(async () => {
            transaction = await dappazon.connect(deployer).list(
                ID,
                NAME,
                CATEGORY,
                IMAGE,
                COST,
                RATING,
                STOCK
            )
            await transaction.wait()

            buyerTransaction = await dappazon.connect(buyer).buy(ID, { value: COST })
        })

        it("Updates the contract balance", async () => {
            const result = await ethers.provider.getBalance(dappazon.address)
            expect(result).to.equal(COST)
        })

        it("Updates buyers order count", async () => {
            const result = await dappazon.orderCount(buyer.address)
            expect(result).to.equal(1);
        })

        it("Adds the order", async () => {
            const order = await dappazon.orders(buyer.address, 1)
            expect(order.time).to.be.greaterThan(0)
            expect(order.item.name).to.equal(NAME)
        })

        it("Subtracts the stock", async () => {
            const item = await dappazon.items(ID)
            expect(item.stock).to.equal(STOCK - 1)
        })

        it("Emits Buy event", () => {
            expect(buyerTransaction).to.emit(dappazon, "List")
        })
    })

    describe("Withdrawing", () => {
        let balanceBefore
        const ID = 1
        const NAME = "Shoes"
        const CATEGORY = "Clothing"
        const IMAGE = "https://ipfs.io/ipfs/QmTxKjWy2VZLwvpreo7LdbRZj5ym1td8sicTrXS9pfje5K?filename=download.jpg"
        const COST = tokens(1)
        const RATING = 3
        const STOCK = 5

        beforeEach(async () => {
            let transaction = await dappazon.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
            await transaction.wait()

            transaction = await dappazon.connect(buyer).buy(1, { value: COST })
            await transaction.wait()

            balanceBefore = await ethers.provider.getBalance(deployer.address)

            transaction = await dappazon.connect(deployer).withdraw()
            await transaction.wait()
        })

        it("Updates the owner balance", async () => {
            const balanceAfter = await ethers.provider.getBalance(deployer.address)
            expect(balanceAfter).to.be.greaterThan(balanceBefore)
        })

        it("Updates the contract balance", async () => {
            const result = await ethers.provider.getBalance(dappazon.address)
            expect(result).to.equal(0)
        })
    })
})

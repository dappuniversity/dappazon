import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import DappazonAbi from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [dappazon, setDappazon] = useState(null)

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState(null)
  const [toggle, setToggle] = useState(null)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockChainData = async () => {
    // Connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)

    // Connect to smart Contract Create Js Version
    const dappazon = new ethers.Contract(config[network.chainId].dappazonContract.address, DappazonAbi, provider)
    setDappazon(dappazon)

    const itemsArray = []
    for (let i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1)
      itemsArray.push(item)
    }

    const electronics = itemsArray.filter((item) => item.category === 'electronics')
    const clothing = itemsArray.filter((item) => item.category === 'clothing')
    const toys = itemsArray.filter((item) => item.category === 'toys')
    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
    console.log(electronics)
    console.log(clothing)
    console.log(toys)


    // Load Products
  }

  useEffect(() => {
    loadBlockChainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Dappazon Best Sellers</h2>
      {electronics && clothing && toys && (
        <><Section title="Clothing & Jewelry" items={clothing} togglePop={togglePop} /><Section title="Electronics & Gadgets" items={electronics} togglePop={togglePop} /><Section title="Toys" items={toys} togglePop={togglePop} /></>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App;

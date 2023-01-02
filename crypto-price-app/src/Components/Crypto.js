import React,{useEffect,useState} from 'react'
import Coin from './Coin';
import axios from "axios"
import "./CSS/Crypto.css"

const Crypto = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        )
        .then(res => {
          setCoins(res.data);
        })
        .catch(error => console.log(error));
    }, []);
  
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
  return (
    <div className='coin-app'>
    <div className='coin-search'>
      <h1 className='coin-text'>Search a currency</h1>
      <form>
        <input
          className='coin-input'
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
        />
      </form>
    </div>
    {filteredCoins.map(coin => {
      return (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.total_volume}
          volume={coin.market_cap}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      );
    })}
  </div>
  )
}

export default Crypto
import React from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin';

const filterNeeded = (coins, owned) =>
  coins.filter(c => owned.find(o => o.id === c.id) === undefined);

const filterOwned = (coins, owned) =>
  coins.filter(c => owned.find(o => o.id === c.id) !== undefined);

const filterCoins = (filter, coins, owned) => {
  switch (filter) {
    case 'onlyNeeded':
      return filterNeeded(coins, owned);
    case 'onlyOwned':
      return filterOwned(coins, owned);
    default:
      return coins;
  }
};

const CoinList = ({
  coins,
  owned,
  filter,
  handleOwnedCheckboxChange,
  handleSubmit
}) => {
  const filtered = filterCoins(filter, coins, owned);

  return (
    <form onSubmit={handleSubmit}>
      {filtered.length > 0 ? (
        filtered.map(coin => (
          <Coin
            key={coin.id}
            coin={coin}
            owned={owned}
            handleOwnedCheckboxChange={handleOwnedCheckboxChange}
          />
        ))
      ) : (
        <p>No coins found</p>
      )}

      <button type="submit">Update</button>
    </form>
  );
};

CoinList.propTypes = {
  coins: PropTypes.array,
  owned: PropTypes.array,
  filter: PropTypes.string.isRequired,
  handleOwnedCheckboxChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

CoinList.defaultProps = {
  coins: [],
  owned: []
};

export default CoinList;

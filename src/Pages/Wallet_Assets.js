//Probably gonna get scrapped

/*
function updateGetPrice({ coins,CoinIds}){
    let string = "";
    let i = 0;
    console.log(coins)
    for (const coin in coins) {
      if (i === 0) {
        string += CoinIds[coin];
      } else {
        string += "%2C" + CoinIds[coin];
      }
      i++;
    }

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&per_page=${
        Object.keys(coins).length
      }&page=1&sparkline=false`
    )
      .then((res) => res.json())
      .then((data) => {
        cp_list = []
        for (let index = 0; index < data.length; index++) {
          cp_list.append(data[index].current_price);
        }
        return cp_list;
      });
  

};*/
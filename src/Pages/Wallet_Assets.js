
function updateGetPrice({ coins,CoinIds,setPortfolio,setlastPortfolio }){
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
        //return 
      });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [lastPortfolio,setlastPortfolio] = useState({})

 let  coins = localStorage.getItem("coins")
 coins = JSON.parse(coins)

  if(portfolio.length > 0){
      console.log(portfolio)
      return (
          <div>
              <h1>{lastPortfolio.Valuation}</h1>
              <h1>{lastPortfolio.Time}</h1>
              <LineChart data={portfolio} height={250} width={700}>
                <XAxis dataKey="Time" />
                <YAxis domain={["dataMin", "dataMax"]} />
                <Line dataKey="Valuation" />
              </LineChart>
          </div>
      )
  }else{
    return (
        <div>
        </div>
        
      );
      
  }

};
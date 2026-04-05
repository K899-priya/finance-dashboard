import { useEffect, useState } from "react";

export function useMarketData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NG&apikey=demo"
    )
      .then((res) => res.json())
      .then((json) => {
        const raw = json["Time Series (Daily)"];

        const formatted = Object.keys(raw || {})
          .slice(0, 10)
          .map((date) => ({
            date,
            price: parseFloat(raw[date]["4. close"]),
          }));

        setData(formatted.reverse());
      });
  }, []);

  return data;
}
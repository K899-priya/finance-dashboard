import { useEffect, useState } from "react";

export function useMarketData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NG&apikey=SEBL0KXNTE5IF06V"
    )
      .then((res) => res.json())
      .then((json) => {
        const raw = json["Time Series (Daily)"];

        if (!raw) throw new Error("No data");

        const formatted = Object.keys(raw)
          .slice(0, 10)
          .map((date) => ({
            date,
            price: parseFloat(raw[date]["4. close"]),
          }));

        setData(formatted.reverse());
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);

        setData([
          { date: "Day 1", price: 500 },
          { date: "Day 2", price: 650 },
          { date: "Day 3", price: 720 },
        ]);
      });
  }, []);

  return { data, loading, error };
}
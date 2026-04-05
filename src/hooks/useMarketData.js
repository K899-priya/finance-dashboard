import { useEffect, useState } from "react";

export function useMarketData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NG&apikey=SEBL0KXNTE5IF06V"
    )
      .then((res) => res.json())
      .then((json) => {
        const raw = json["Time Series (Daily)"];

        if (!raw) {
          // 🔥 fallback data (no error UI)
          setData([
            { date: "Mon", price: 500 },
            { date: "Tue", price: 650 },
            { date: "Wed", price: 720 },
            { date: "Thu", price: 680 },
            { date: "Fri", price: 760 },
          ]);
          setLoading(false);
          return;
        }

        const formatted = Object.keys(raw)
          .slice(0, 7)
          .map((date) => ({
            date,
            price: parseFloat(raw[date]["4. close"]),
          }));

        setData(formatted.reverse());
        setLoading(false);
      })
      .catch(() => {
    
        setData([
          { date: "Mon", price: 500 },
          { date: "Tue", price: 650 },
          { date: "Wed", price: 720 },
          { date: "Thu", price: 680 },
          { date: "Fri", price: 760 },
        ]);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
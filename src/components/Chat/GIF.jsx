import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";

const giphyFetch = new GiphyFetch("ICuYi5fMn41zxvpYortKqAV7Zz4gHb8n");

const GIF = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    if (text.length === 0) {
      //set error state to true
      setErr(true);
      return;
    }

    console.log(text);

    const apiCall = async () => {
      const res = await giphyFetch.search(text, { limit: 20 });

      setResults(res.data);
    };
    console.log(results);
    apiCall();
    //change error state back to false
    setText("");
  };
  const handleInput = (e) => {
    setText(e.target.value);
  };
  //   function GridDemo() {
  //     const fetchGifs = () => giphyFetch.search(text, { limit: 10 });
  //     return <Grid fetchGifs={fetchGifs} width={400} columns={3} gutter={6} />;
  //   }

  const fetchGifs = () => giphyFetch.search(text, { limit: 10 });

  return (
    <div className="overflow-y-auto h-full">
      <input
        className="border border-blue-200 p-2 w-full text-base outline-none rounded-lg text-gray-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search GIFs"
      />
      {/* <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button> */}
      {/* <div className="flex">
        {results.map((item) => (
          <div className="flex">
            <img src={item.url} alt="pic" />
          </div>
        ))}
      </div> */}
      {/* <GridDemo /> */}
    </div>
  );
};

export default GIF;

import { useState } from "react";
import api from "../../services/api";

const Estimate = () => {

  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<any>(null);


  const calculate = async () => {

    try {

      const response = await api.post("/estimate", {
        area,
        location
      });

      setResult(response.data);

    } catch(error) {

      console.log(error);

    }

  };


  return (
    <div>

      <h1>
        AI Cost Calculator 🏗️
      </h1>


      <input
        placeholder="Area sq.ft"
        value={area}
        onChange={(e)=>setArea(e.target.value)}
      />


      <input
        placeholder="Location"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
      />


      <button onClick={calculate}>
        Calculate
      </button>


      {result && (
        <pre>
          {JSON.stringify(result,null,2)}
        </pre>
      )}

    </div>
  );
};


export default Estimate;
import React, { useState, useEffect } from "react";
import axios from "axios"; // Use import for axios
export default function RandomFact() {
  const [Fact, setFact] = useState("");
  async function getRandomFact() {
    try {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );
      const fact = response.data.text;
      return fact;
    } catch (error) {
      console.log("Error:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    getRandomFact()
      .then((fact) => {
        setFact(fact);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // Usage example

  return (
    <strong className="text-center">
      {Fact}
      <br />
      <br />{" "}
    </strong>
  );
}


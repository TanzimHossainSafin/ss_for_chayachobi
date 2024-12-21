import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to handle form submission and call the model API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setOutputText('');

    try {
      // Replace with your model API URL (if using Hugging Face, replace with their URL)
      const response = await axios.post('http://localhost:5000/predict', {
        rm: inputText,
      });

      setOutputText(response.data.bn); // Assuming response contains the Bengali text as `bn`
    } catch (error) {
      console.error('Error calling the model API:', error);
      setOutputText('Error occurred while processing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Bengali Transliteration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputText">Enter Banglish (Romanized Bengali):</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
            rows="4"
            cols="50"
            placeholder="Enter Banglish text here..."
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Transliterate'}
          </button>
        </div>
      </form>
      {outputText && (
        <div>
          <h2>Output (Bengali):</h2>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}

export default App;

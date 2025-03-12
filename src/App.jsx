import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast library

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) characters += "0123456789";
    if (charAllowed) characters += "!@#$%^&*()";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    if (!password) {
      toast.error("No password to copy! ❌");
      return;
    }
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Password copied to clipboard! 📋");
    }).catch(() => {
      toast.error("Failed to copy! ❌");
    });
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-gray-600 text-white p-5">
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast Notifications */}
      <div className="w-full max-w-6xl p-12 md:p-16 bg-gray-800 rounded-3xl shadow-2xl backdrop-blur-lg">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-8">🔑 Password Generator</h1>

        {/* Password Display */}
        <div className="relative mb-8">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full p-5 text-2xl md:text-3xl bg-gray-700 rounded-lg outline-none border-none text-center font-mono tracking-wide"
          />
          <button
            onClick={copyPassword}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-blue-600 px-5 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Length Slider */}
          <div className="flex flex-col items-center">
            <label className="text-lg md:text-xl font-semibold">Password Length: {length}</label>
            <input
              type="range"
              min={5}
              max={30}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-4/5 mt-2"
            />
          </div>

          {/* Checkbox Options */}
          <div className="flex flex-col md:flex-row justify-between text-lg">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="h-6 w-6"
              />
              <span>Include Special Characters</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="h-6 w-6"
              />
              <span>Include Numbers</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full p-5 mt-4 bg-blue-600 text-lg md:text-xl font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

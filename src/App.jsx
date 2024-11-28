import { useCallback, useEffect, useState } from 'react'

import './App.css'

function App() {

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(7);
  const [numberAllowed, setNumberFun] = useState(false);
  const [charAllowed, setCharacterFun] = useState(false);


  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let pass = ''

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()'

    for (let i = 1; i <= length; i++) {

      let genPass = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(genPass)

    }
    setPassword(pass)
    // console.log(pass)
    // console.log(charAllowed)
    console.log(numberAllowed)

  }, [setPassword, length, numberAllowed, charAllowed])

  const copyPassword = useCallback(async () => {
    try {
      window.navigator.clipboard.writeText(password)
    } catch (error) {
      console.log(error)
    }
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <div className="flex justify-center place-content-center select-none">
        <div className="mx-auto w-3/5 p-5 min-h-60 max-h=96 mt-40 rounded-xl bg-slate-200">
          <h1 className='mx-auto text-4xl font-bold text-gray-500 my-4 '>Password Generator</h1>
          <button onClick={() => generatePassword()} className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-blue-700'>Try Another one</button>
          <label htmlFor="default" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <input type='search' id="default" className="block w-full text-2xl p-4 ps-10 text-gray-900 outline-none border-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password} readOnly />
            <button type="submit" onClick={copyPassword} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-blue-700">Copy</button>
          </div>
          <div className="btns flex flex-wrap gap-3 mt-4">
            <div className='flex gap-3'>
              <input type="range" name="rang" id="rang" min={5} max={20} value={length} onChange={(e) => { setLength(e.target.value) }} />
              <label htmlFor="rang" className=' font-bold text-orange-600'> Range: {length}</label>
            </div>
            <div className=' flex gap-2 ml-2'>
              <input type="checkbox" name="characters" id="char" onChange={() => setCharacterFun(prev => !prev)} />
              <label htmlFor="char">Character</label>
            </div>
            <div className='flex gap-2 ml-2'>
              <input type="checkbox" name="Number" id="number" onChange={() => setNumberFun(prev => !prev)} />
              <label htmlFor="number">Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

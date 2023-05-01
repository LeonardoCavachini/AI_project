import 'regenerator-runtime/runtime'
import React, {useState} from 'react'
import axios from 'axios'

const App = () => {

    const [question, setQuestion] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    const url = "http://localhost:5000/app"

    const handleData = (data) => {
        let leo
        let josi = Object.values(data)
        for (const key in data) {
            leo = key
        }
        
        const obj = {
            quest: leo,
            ans: josi[0]
        }
        setResult([
            ...result,
            obj
        ])
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(url, {
                prompt: question
            })
            setLoading(false)
            handleData(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='card'>
            <div className='card-body shadow'>
                <form>
                    <div className='form-group row'>
                        <label htmlFor='inputEmail3' className='col-sm-2 col-form-label'>Ask me something!</label>
                        <div className='col-sm-10'>
                            <input 
                            type='text'
                            className='form-control'
                            placeholder='Type here'
                            onChange={({ target }) =>setQuestion(target.value)}
                            />
                            {loading? <p>Loading...</p>:<button type='button' onClick={() => handleSubmit()}>Ask me!</button>}
                        </div>
                    </div>
                </form>
                {result.length>0? result.map((el,idx) => <div key={idx}><h1>{el.quest}</h1>,<p>{el.ans}</p></div>):''}
            </div>
        </div>
    )
}

export default App

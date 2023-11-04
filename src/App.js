import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Configuration, OpenAIApi } from 'openai';

function App() {

  const configuracion = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openAI = new OpenAIApi(configuracion);

  const [var1, setVar1] = useState('');
  const [var2, setVar2] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    setLoading(true);
    const updatedPrompt2 = 'Generar una tabla   de una matriz de consistencia tomando en cuenta "Problemas general y especificos", "objetivos general y especificos" , "hipotisis general y especificos", "variables","dimensiones" , "indicadores", y por separado en la ultima fita "diseño metodologico" como tipo te estudio, enfoque, diseño, tipo de diseño , poblacion y muestra de las siguientes variables:' + var1 + ' y ' + var2;

    try {
      const response = openAI.createCompletion({
        model: 'text-davinci-003',
        prompt: updatedPrompt2,
        temperature: 0.5,
        max_tokens: 1000,
      })
      setResult((await response).data.choices[0].text);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <main>
        <div className='container'>

          <div className='card mt-3'>
            <div className='row m-2'>
              <div className='col-md-12'>
                <h2>Generador de matriz de consistencia</h2>
                <div class="mb-1">
                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  <input type='text' className='form-control' value={var1} onChange={(e) => setVar1(e.target.value)} placeholder='Escribe var 1' />
                </div>
                <div class="mb-1">
                  <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                  <input type='text' className='form-control' value={var2} onChange={(e) => setVar2(e.target.value)} placeholder='Escribe var 2' />
                </div>
                <button type='button' className='btn btn-primary mb-3 mt-3' onClick={handleClick} disabled={loading || var2.length === 0}>{loading ? "Enviando..." : "Enviar"}</button>
              </div>
            </div>
            {
              result.length > 0 && (
                <div id='resultados' className='card'>
                  <div dangerouslySetInnerHTML={{ __html: result }} /> {/* Render the HTML */}
                </div>)
            }
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;

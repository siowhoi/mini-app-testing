import { FormEvent, useState, ChangeEvent } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('typing');
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          placeholder="Enter city name"
        />
        <br />
        <button
          disabled={answer.length === 0 || status === 'submitting'}
          type="submit"
        >
          Submit
        </button>
        {error !== null && <p className="Error">{error}</p>}
      </form>
    </>
  );
}

const submitForm = (answer: string) => {
  // Pretend it's hitting the network.
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima';
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

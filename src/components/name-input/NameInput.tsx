import { useState, ChangeEvent } from 'react';
import styles from './styles.module.css';

export default function NameInput() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFullName(`${e.target.value} ${lastName}`);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setFullName(`${firstName} ${e.target.value}`);
  };

  return (
    <div className={styles.container}>
      <h1>Let's check you in</h1>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange}></input>
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange}></input>
      </label>
      <p>{fullName}</p>
    </div>
  );
}

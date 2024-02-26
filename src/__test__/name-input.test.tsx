import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import NameInput from '../components/name-input';

describe('name input', () => {
  test('first name', () => {
    render(<NameInput />);
    const firstNameInput: HTMLInputElement =
      screen.getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'Samantha' } });
    expect(firstNameInput.value).toBe('Samantha');
  });

  test('last name', () => {
    render(<NameInput />);
    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last name:');
    fireEvent.change(lastNameInput, { target: { value: 'Kerr' } });
    expect(lastNameInput.value).toBe('Kerr');
  });

  test('full name', async () => {
    render(<NameInput />);
    const firstNameInput: HTMLInputElement =
      screen.getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'Samantha' } });

    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last name:');
    fireEvent.change(lastNameInput, { target: { value: 'Kerr' } });

    expect(await screen.findByText('Samantha Kerr')).toBeVisible();
  });
});

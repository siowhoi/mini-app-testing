import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Renders the main page', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent('City quiz');

  const cityField = screen.getByPlaceholderText('Enter city name');
  await user.type(cityField, 'London');

  await user.click(
    screen.getByRole('button', {
      name: 'Submit',
    }),
  );

  await waitFor(
    () => screen.getByText('Good guess but a wrong answer. Try again!'),
    {
      timeout: 2000,
    },
  );
  expect(
    await screen.findByText('Good guess but a wrong answer. Try again!'),
  ).toBeVisible();
});

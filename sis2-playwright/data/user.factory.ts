import { randomUUID } from 'node:crypto';

export const createUser = () => {
  const password = process.env.TEST_PASSWORD;

  if (!password) {
    throw new Error(
      'Set TEST_PASSWORD locally or add the GitHub Actions secret TEST_PASSWORD.'
    );
  }

  return {
    firstName: 'Test',
    lastName: 'Student',
    dob: '2000-01-01',
    houseNumber: '10',
    country: 'KZ',
    postalCode: '050000',
    phone: '77010000000',
    email: `sis2-${randomUUID()}@example.com`,
    password,
  };
};

export type User = ReturnType<typeof createUser>;
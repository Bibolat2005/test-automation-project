import { randomUUID } from 'node:crypto';
export const createUser = () => ({
  firstName: 'Test', lastName: 'Student', dob: '2000-01-01',
  houseNumber: '10',
  country: 'KZ', postalCode: '050000', phone: '77010000000',
  email: `sis2-${randomUUID()}@example.com`, password: 'Study!2026Strong',
});
export type User = ReturnType<typeof createUser>;

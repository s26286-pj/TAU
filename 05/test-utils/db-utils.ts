import { User } from '../src/users/users.entity';
import { DataSource } from 'typeorm';


export const initializeDatabase = async (dataSource: DataSource) => {
  // Clear all tables
  await dataSource.synchronize(true); // Drops and recreates the schema
  // Seed initial data if needed
  const userRepository = dataSource.getRepository(User);
  await userRepository.save([
    { "id": 1, "name": "Jan Kowalski", "email": "jan@kowalski.pl" },
    { "id": 2, "name": "Anna Nowak", "email": "anna@nowak.pl" }
  ]);
};
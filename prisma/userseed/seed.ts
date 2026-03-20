import { v4 as uuidv4 } from "uuid"

type UserCreateInput = {
  id: string
  name: string
  email: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export const seedUsers: UserCreateInput[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "john.doe@example.com"
  },
  {
    id: uuidv4(),
    name: "Jane Doe",
    email: "jane.doe@example.com"
  },
  {
    id: uuidv4(),
    name: "Bob Smith",
    email: "bob.smith@example.com"
  },
  {
    id: uuidv4(),
    name: "Alice Johnson",
    email: "alice.johnson@example.com"
  }
]
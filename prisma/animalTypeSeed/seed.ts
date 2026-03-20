type AnimalTypeCreateInput = {
  id: number
  label: string
  active: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export const seedAnimalTypes: AnimalTypeCreateInput[] = [
  {
    id: 1,
    label: "Cachorro",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    label: "Gato",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
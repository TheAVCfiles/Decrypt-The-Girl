// Mock Prisma client for development without database connection
const mockPrisma = {
  lead: {
    create: async () => ({ id: 'mock-id' }),
    findMany: async () => [],
    findUnique: async () => null,
    count: async () => 0,
    deleteMany: async () => ({ count: 0 }),
  },
  recruiter: {
    create: async () => ({ id: 'mock-id' }),
    findMany: async () => [],
    findUnique: async () => null,
    deleteMany: async () => ({ count: 0 }),
  },
  $disconnect: async () => {},
}

export const prisma = mockPrisma as any
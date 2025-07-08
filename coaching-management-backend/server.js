const app = require('./app');
const { PrismaClient } = require('./generated/prisma');

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Test DB
async function connectDB() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');
  } catch (error) {
    console.error(' Database connection failed:', error);
    process.exit(1);
  }
}


process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
   console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((error) => {
  console.error(' Failed to start server:', error);
  process.exit(1);
});
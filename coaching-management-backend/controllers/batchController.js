const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Predefined batch options
const PREDEFINED_BATCHES = [
  'HSC 2025 A',
  'HSC 2025 B', 
  'HSC 2026 A',
  'SSC 2025 A',
  'JSC 2025 A'
];

// Get all batches
exports.getBatches = async (req, res) => {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        students: true,
        _count: {
          select: { students: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      message: 'Batches fetched successfully',
      batches
    });
  } catch (err) {
    console.error('Get batches error:', err);
    res.status(500).json({ error: 'Server error fetching batches' });
  }
};

// Create new batch
exports.createBatch = async (req, res) => {
  const { name } = req.body;
  
  try {
    if (!name) {
      return res.status(400).json({ message: 'Batch name is required' });
    }

    // Validate that the batch name is from predefined options
    if (!PREDEFINED_BATCHES.includes(name)) {
      return res.status(400).json({ 
        message: 'Invalid batch name. Please choose from predefined options.',
        availableOptions: PREDEFINED_BATCHES
      });
    }

    // Check if batch with same name already exists
    const existingBatch = await prisma.batch.findFirst({
      where: { name }
    });

    if (existingBatch) {
      return res.status(400).json({ message: 'Batch with this name already exists' });
    }

    const batch = await prisma.batch.create({
      data: { name }
    });

    res.status(201).json({
      message: 'Batch created successfully',
      batch
    });
  } catch (err) {
    console.error('Create batch error:', err);
    res.status(500).json({ error: 'Server error creating batch' });
  }
};

// Get predefined batch options for dropdown
exports.getBatchOptions = async (req, res) => {
  try {
    res.json({
      message: 'Batch options fetched successfully',
      options: PREDEFINED_BATCHES
    });
  } catch (err) {
    console.error('Get batch options error:', err);
    res.status(500).json({ error: 'Server error fetching batch options' });
  }
};
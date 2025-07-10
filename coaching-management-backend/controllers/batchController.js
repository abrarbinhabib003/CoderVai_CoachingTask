const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Get all batches
exports.getBatches = async (req, res) => {
  console.log('📚 Fetching all batches (testing mode - no auth required)');

  try {
    const allbatches = await prisma.batch.findMany({
      include: {
        _count: {
          select: { students: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const batches = allbatches.map(batch => ({
      id: batch.id,
      name: batch.name,
      createdAt: batch.createdAt,
      updatedAt: batch.updatedAt,
      studentCount: batch._count.students,
    }));

    console.log(' Batches fetched successfully:', batches.length);
    res.json({ message: 'Batches fetched successfully', batches });
  } catch (err) {
    console.error(' Get batches error:', err);
    res.status(500).json({ error: 'Server error fetching batches' });
  }
};

// Get single batch by ID
exports.getBatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await prisma.batch.findUnique({
      where: { id: parseInt(id) },
      include: {
        students: true,
      },
    });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.json({ message: 'Batch retrieved successfully', batch });
  } catch (err) {
    console.error('Get batch by ID error:', err);
    res.status(500).json({ error: 'Server error fetching batch' });
  }
};

// Create new batch
exports.createBatch = async (req, res) => {
  const { name } = req.body;

  console.log('Creating new batch:', { name, userId: req.user?.id });

  try {
    if (!name) {
      return res.status(400).json({ message: 'Batch name is required' });
    }

    const existingBatch = await prisma.batch.findFirst({ where: { name } });

    if (existingBatch) {
      return res.status(400).json({ message: 'Batch with this name already exists' });
    }

    const batch = await prisma.batch.create({ data: { name } });

    console.log(' Batch created successfully:', { id: batch.id, name: batch.name });
    res.status(201).json({ message: 'Batch created successfully', batch });
  } catch (err) {
    console.error(' Create batch error:', err);
    res.status(500).json({ error: 'Server error creating batch' });
  }
};

// Update batch by ID
exports.updateBatch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log('Updating batch:', { id, name });

  try {
    const batch = await prisma.batch.findUnique({ where: { id: parseInt(id) } });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    const updated = await prisma.batch.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    console.log(' Batch updated:', updated);
    res.json({ message: 'Batch updated successfully', batch: updated });
  } catch (err) {
    console.error('  batch update error:', err);
    res.status(500).json({ error: 'Server error updating batch' });
  }
};

// Delete batch by ID
exports.deleteBatch = async (req, res) => {
  const { id } = req.params;

  console.log(' Deleting batch:', id);

  try {
    const batch = await prisma.batch.findUnique({ where: { id: parseInt(id) } });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    await prisma.batch.delete({ where: { id: parseInt(id) } });

    console.log(' Batch deleted:', id);
    res.json({ message: 'Batch deleted successfully' });
  } catch (err) {
    console.error(' batch delete error:', err);
    res.status(500).json({ error: 'Server error deleting batch' });
  }
};
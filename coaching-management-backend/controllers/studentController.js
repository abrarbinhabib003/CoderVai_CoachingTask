const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Add student
exports.addStudent = async (req, res) => {
  const { name, roll, batchId } = req.body;
  
  try {
   
    const batch = await prisma.batch.findUnique({
      where: { id: parseInt(batchId) }
    });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

   
    const existingStudent = await prisma.student.findUnique({
      where: { roll }
    });

    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

   
    const student = await prisma.student.create({
      data: {
        name,
        roll,
        batchId: parseInt(batchId)
      },
      include: {
        batch: true
      }
    });

    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (err) {
    console.error('Add student error:', err);
    res.status(500).json({ error: 'Server error adding student' });
  }
};

// Get students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        batch: true,
        attendance: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.json({
      message: 'Students fetched successfully',
      students
    });
  } catch (err) {
    console.error('Get students error:', err);
    res.status(500).json({ error: 'Server error fetching students' });
  }
};

// Get students by batch
exports.getStudentsByBatch = async (req, res) => {
  const { batchId } = req.query;
  
  try {
    if (!batchId) {
      return res.status(400).json({ message: 'Batch ID is required' });
    }

    const students = await prisma.student.findMany({
      where: { 
        batchId: parseInt(batchId) 
      },
      include: {
        batch: true,
        attendance: {
          orderBy: {
            date: 'desc'
          }
        }
      },
      orderBy: {
        roll: 'asc'
      }
    });

    res.json({
      message: 'Students fetched successfully',
      students
    });
  } catch (err) {
    console.error('Get students by batch error:', err);
    res.status(500).json({ error: 'Server error fetching students by batch' });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const student = await prisma.student.findUnique({
      where: { 
        id: parseInt(id) 
      },
      include: {
        batch: true,
        attendance: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'Student fetched successfully',
      student
    });
  } catch (err) {
    console.error('Get student by ID error:', err);
    res.status(500).json({ error: 'Server error fetching student' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, roll, batchId } = req.body;
  
  try {
    
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

   
    if (roll && roll !== existingStudent.roll) {
      const rollConflict = await prisma.student.findUnique({
        where: { roll }
      });

      if (rollConflict) {
        return res.status(400).json({ message: 'Roll number already exists' });
      }
    }

   
    if (batchId) {
      const batch = await prisma.batch.findUnique({
        where: { id: parseInt(batchId) }
      });

      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
    }


    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(roll && { roll }),
        ...(batchId && { batchId: parseInt(batchId) })
      },
      include: {
        batch: true
      }
    });

    res.json({
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (err) {
    console.error('Update student error:', err);
    res.status(500).json({ error: 'Server error updating student' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
   
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    
    await prisma.student.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      message: 'Student deleted successfully'
    });
  } catch (err) {
    console.error('Delete student error:', err);
    res.status(500).json({ error: 'Server error deleting student' });
  }
};
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Add  new student
exports.addStudent = async (req, res) => {
  const { name, roll, batchId } = req.body;
  
  console.log('Adding new student:', { name, roll, batchId, userId: req.user?.id });
  
  try {
    // Check  batch existstence
    const batch = await prisma.batch.findUnique({
      where: { id: parseInt(batchId) }
    });

    if (!batch) {
      console.log('Batch not found:', batchId);
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check  roll number existstencew
    const existingStudent = await prisma.student.findUnique({
      where: { roll }
    });

    if (existingStudent) {
      console.log('Roll number already exists:', roll);
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    // Create new student
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

    console.log('Student added successfully:', { studentId: student.id, name: student.name, roll: student.roll });
    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (err) {
    console.error('Add student error:', err);
    res.status(500).json({ error: 'Server error adding student' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  console.log(' Fetching all students for user:', req.user?.id);
  
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

    console.log('Students fetched successfully:', students.length);
    res.json({
      message: 'Students fetched successfully',
      students
    });
  } catch (err) {
    console.error('Get students error:', err);
    res.status(500).json({ error: 'Server error fetching students' });
  }
};

// Get students by batch ID
exports.getStudentsByBatch = async (req, res) => {
  const { batchId } = req.query;
  
  console.log('Fetching students for batch:', batchId, 'by user:', req.user?.id);
  
  try {
    if (!batchId) {
      console.log('Batch ID missing in request');
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

    console.log('Students by batch fetched successfully:', students.length);
    res.json({
      message: 'Students fetched successfully',
      students
    });
  } catch (err) {
    console.error('Get students by batch error:', err);
    res.status(500).json({ error: 'Server error fetching students by batch' });
  }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  
  console.log('Fetching student by ID:', id, 'by user:', req.user?.id);
  
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
      console.log('Student not found:', id);
      return res.status(404).json({ message: 'Student not found' });
    }

    console.log('Student fetched successfully:', { id: student.id, name: student.name });
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
  
  console.log('Updating student:', { id, name, roll, batchId, userId: req.user?.id });
  
  try {
    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingStudent) {
      console.log('Student not found for update:', id);
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if new roll number conflicts with another student
    if (roll && roll !== existingStudent.roll) {
      const rollConflict = await prisma.student.findUnique({
        where: { roll }
      });

      if (rollConflict) {
        console.log(' Roll number conflict during update:', roll);
        return res.status(400).json({ message: 'Roll number already exists' });
      }
    }


    if (batchId) {
      const batch = await prisma.batch.findUnique({
        where: { id: parseInt(batchId) }
      });

      if (!batch) {
        console.log(' Batch not found for update:', batchId);
        return res.status(404).json({ message: 'Batch not found' });
      }
    }

    // Update student
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

    console.log('Student updated successfully:', { id: updatedStudent.id, name: updatedStudent.name });
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
  
  console.log('Deleting student:', id, 'by user:', req.user?.id);
  
  try {
    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingStudent) {
      console.log('Student not found for deletion:', id);
      return res.status(404).json({ message: 'Student not found' });
    }

   
    await prisma.student.delete({
      where: { id: parseInt(id) }
    });

    console.log('Student deleted successfully:', { id, name: existingStudent.name });
    res.json({
      message: 'Student deleted successfully'
    });
  } catch (err) {
    console.error('Delete student error:', err);
    res.status(500).json({ error: 'Server error deleting student' });
  }
};
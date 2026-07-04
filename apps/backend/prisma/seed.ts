import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.report.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.waterIntake.deleteMany();
  await prisma.sleepRecord.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.healthMetric.deleteMany();
  await prisma.user.deleteMany();

  // Create seed user
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-15'),
      gender: 'Male',
      height: 180,
    },
  });

  // Create sample health metrics
  await prisma.healthMetric.create({
    data: {
      userId: user.id,
      weight: 75,
      bmi: 23.1,
      heartRate: 72,
      systolic: 120,
      diastolic: 80,
      calories: 2200,
    },
  });

  // Create sample exercise
  await prisma.exercise.create({
    data: {
      userId: user.id,
      type: 'Running',
      duration: 30,
      intensity: 'High',
      calories: 300,
      notes: 'Morning jog',
      startedAt: new Date(),
    },
  });

  // Create sample sleep record
  await prisma.sleepRecord.create({
    data: {
      userId: user.id,
      duration: 480,
      quality: 'Good',
      notes: 'Slept well',
    },
  });

  // Create sample goal
  await prisma.goal.create({
    data: {
      userId: user.id,
      title: 'Lose 5kg',
      type: 'Weight',
      target: 70,
      current: 75,
      unit: 'kg',
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('✅ Database seeded successfully');
  console.log(`📧 Test user email: ${user.email}`);
  console.log('🔑 Test user password: Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mysurvey.com' },
    update: {},
    create: {
      email: 'admin@mysurvey.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  // Create demo creator user
  const creatorPassword = await bcrypt.hash('Creator123!', 12);
  const creator = await prisma.user.upsert({
    where: { email: 'creator@mysurvey.com' },
    update: {},
    create: {
      email: 'creator@mysurvey.com',
      firstName: 'John',
      lastName: 'Creator',
      password: creatorPassword,
      role: 'CREATOR',
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  // Create demo viewer user
  const viewerPassword = await bcrypt.hash('Viewer123!', 12);
  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@mysurvey.com' },
    update: {},
    create: {
      email: 'viewer@mysurvey.com',
      firstName: 'Jane',
      lastName: 'Viewer',
      password: viewerPassword,
      role: 'VIEWER',
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  // Create demo team
  const team = await prisma.team.upsert({
    where: { id: 'demo-team' },
    update: {},
    create: {
      id: 'demo-team',
      name: 'Demo Team',
      description: 'A demo team for testing purposes',
      members: {
        create: [
          {
            userId: creator.id,
            role: 'OWNER',
          },
          {
            userId: viewer.id,
            role: 'MEMBER',
          },
        ],
      },
    },
  });

  // Create demo survey
  const survey = await prisma.survey.create({
    data: {
      title: 'Customer Satisfaction Survey',
      description: 'Help us improve our services by sharing your feedback',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      createdById: creator.id,
      teamId: team.id,
      settings: {
        isPublic: true,
        allowAnonymous: true,
        requireLogin: false,
        allowMultipleResponses: false,
        showProgressBar: true,
        randomizeQuestions: false,
        theme: {
          primaryColor: '#0ea5e9',
          backgroundColor: '#ffffff',
          textColor: '#212529',
          fontFamily: 'Inter',
          borderRadius: 8,
        },
        thankYouMessage: 'Thank you for your valuable feedback!',
      },
      tags: ['customer-feedback', 'satisfaction', 'demo'],
      questions: {
        create: [
          {
            type: 'SHORT_TEXT',
            title: 'What is your name?',
            description: 'Please enter your full name',
            required: true,
            order: 1,
            config: {
              placeholder: 'Enter your name',
              maxLength: 100,
            },
          },
          {
            type: 'EMAIL',
            title: 'What is your email address?',
            description: 'We will use this to follow up if needed',
            required: true,
            order: 2,
            config: {
              placeholder: 'Enter your email',
            },
          },
          {
            type: 'SINGLE_CHOICE',
            title: 'How satisfied are you with our service?',
            description: 'Please rate your overall satisfaction',
            required: true,
            order: 3,
            config: {},
            options: {
              create: [
                { label: 'Very Satisfied', value: '5', order: 1 },
                { label: 'Satisfied', value: '4', order: 2 },
                { label: 'Neutral', value: '3', order: 3 },
                { label: 'Dissatisfied', value: '2', order: 4 },
                { label: 'Very Dissatisfied', value: '1', order: 5 },
              ],
            },
          },
          {
            type: 'MULTIPLE_CHOICE',
            title: 'Which features do you use most?',
            description: 'Select all that apply',
            required: false,
            order: 4,
            config: {},
            options: {
              create: [
                { label: 'Survey Builder', value: 'builder', order: 1 },
                { label: 'Analytics Dashboard', value: 'analytics', order: 2 },
                { label: 'Team Collaboration', value: 'collaboration', order: 3 },
                { label: 'Data Export', value: 'export', order: 4 },
                { label: 'API Integration', value: 'api', order: 5 },
              ],
            },
          },
          {
            type: 'RATING',
            title: 'Rate our customer support',
            description: 'How would you rate our customer support team?',
            required: false,
            order: 5,
            config: {
              min: 1,
              max: 5,
              step: 1,
              labels: {
                1: 'Poor',
                5: 'Excellent',
              },
            },
          },
          {
            type: 'LONG_TEXT',
            title: 'Additional Comments',
            description: 'Please share any additional feedback or suggestions',
            required: false,
            order: 6,
            config: {
              placeholder: 'Enter your comments here...',
              maxLength: 1000,
              rows: 4,
            },
          },
        ],
      },
    },
  });

  // Create demo responses
  const responses = await Promise.all([
    prisma.response.create({
      data: {
        surveyId: survey.id,
        userId: viewer.id,
        isComplete: true,
        completedAt: new Date(),
        metadata: {
          userAgent: 'Mozilla/5.0 (Demo Browser)',
          source: 'demo',
        },
        answers: {
          create: [
            {
              questionId: survey.id + '-q1',
              value: 'John Doe',
            },
            {
              questionId: survey.id + '-q2',
              value: 'john.doe@example.com',
            },
            {
              questionId: survey.id + '-q3',
              value: '4',
            },
            {
              questionId: survey.id + '-q4',
              value: ['builder', 'analytics'],
            },
            {
              questionId: survey.id + '-q5',
              value: 4,
            },
            {
              questionId: survey.id + '-q6',
              value: 'Great service overall, keep up the good work!',
            },
          ],
        },
      },
    }),
    // Add more demo responses...
  ]);

  // Create survey analytics
  await prisma.surveyAnalytics.create({
    data: {
      surveyId: survey.id,
      totalResponses: responses.length,
      completionRate: 85.5,
      averageTime: 180, // 3 minutes
      data: {
        responsesByDate: [
          { date: '2024-01-01', count: 5 },
          { date: '2024-01-02', count: 8 },
          { date: '2024-01-03', count: 12 },
        ],
        questionAnalytics: [
          {
            questionId: survey.id + '-q3',
            averageRating: 4.2,
            responseDistribution: {
              '5': 30,
              '4': 45,
              '3': 20,
              '2': 4,
              '1': 1,
            },
          },
        ],
      },
    },
  });

  console.log('✅ Database seeding completed successfully!');
  console.log(`👤 Admin user: admin@mysurvey.com / Admin123!`);
  console.log(`👤 Creator user: creator@mysurvey.com / Creator123!`);
  console.log(`👤 Viewer user: viewer@mysurvey.com / Viewer123!`);
  console.log(`📊 Demo survey created: ${survey.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

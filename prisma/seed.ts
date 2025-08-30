import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.lead.deleteMany()
  await prisma.recruiter.deleteMany()

  // Create sample recruiters
  const recruiters = await Promise.all([
    prisma.recruiter.create({
      data: {
        slug: 'sergeant-rodriguez',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        email: 'maria.rodriguez@military.gov',
        phone: '+1-555-0123',
        branch: 'Army',
        rank: 'Staff Sergeant',
        region: 'Southwest',
        specialties: ['Infantry', 'Military Intelligence', 'Cybersecurity'],
        bio: 'Staff Sergeant Rodriguez has 12 years of military experience and specializes in recruiting for technical and intelligence roles. She is passionate about helping young people find their path to service.',
        isActive: true,
      },
    }),
    prisma.recruiter.create({
      data: {
        slug: 'petty-officer-chen',
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@navy.mil',
        phone: '+1-555-0124',
        branch: 'Navy',
        rank: 'Petty Officer First Class',
        region: 'Pacific Coast',
        specialties: ['Naval Aviation', 'Nuclear Engineering', 'Information Technology'],
        bio: 'PO1 Chen served aboard aircraft carriers and now recruits for technical Navy positions. He focuses on STEM careers and advanced training opportunities.',
        isActive: true,
      },
    }),
    prisma.recruiter.create({
      data: {
        slug: 'staff-sergeant-johnson',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@usmc.mil',
        phone: '+1-555-0125',
        branch: 'Marines',
        rank: 'Staff Sergeant',
        region: 'Southeast',
        specialties: ['Infantry', 'Aviation Maintenance', 'Logistics'],
        bio: 'Staff Sergeant Johnson is a Marine Corps veteran with combat experience who now helps young people discover the leadership opportunities in the Marines.',
        isActive: true,
      },
    }),
    prisma.recruiter.create({
      data: {
        slug: 'sergeant-williams',
        firstName: 'Ashley',
        lastName: 'Williams',
        email: 'ashley.williams@us.af.mil',
        phone: '+1-555-0126',
        branch: 'Air Force',
        rank: 'Technical Sergeant',
        region: 'Midwest',
        specialties: ['Cyber Operations', 'Intelligence', 'Space Systems'],
        bio: 'Technical Sergeant Williams specializes in recruiting for Air Force cyber and space careers. She is committed to advancing diversity in technical military roles.',
        isActive: true,
      },
    }),
    prisma.recruiter.create({
      data: {
        slug: 'default-recruiter',
        firstName: 'Brandon',
        lastName: 'Thompson',
        email: 'brandon.thompson@military.gov',
        phone: '+1-555-0100',
        branch: 'Multi-Service',
        rank: 'Senior Recruiter',
        region: 'National',
        specialties: ['Leadership Development', 'Career Counseling', 'Multi-Branch Coordination'],
        bio: 'Senior Recruiter Thompson coordinates recruitment efforts across all military branches and specializes in matching candidates with their ideal service opportunities.',
        isActive: true,
      },
    }),
  ])

  // Create sample leads
  await Promise.all([
    prisma.lead.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-1001',
        branch: 'Army',
        role: 'Cybersecurity Specialist',
        experience: 'No military experience',
        recruiterId: recruiters[0].id,
        status: 'new',
        source: 'website',
      },
    }),
    prisma.lead.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@email.com',
        phone: '+1-555-1002',
        branch: 'Navy',
        role: 'Naval Aviator',
        experience: 'College ROTC',
        recruiterId: recruiters[1].id,
        status: 'contacted',
        source: 'referral',
      },
    }),
    prisma.lead.create({
      data: {
        firstName: 'Alex',
        lastName: 'Kim',
        email: 'alex.kim@email.com',
        phone: '+1-555-1003',
        branch: 'Air Force',
        role: 'Intelligence Analyst',
        experience: 'Some military experience',
        recruiterId: recruiters[3].id,
        status: 'qualified',
        source: 'social',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${recruiters.length} recruiters`)
  console.log('Default recruiter slug: default-recruiter')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
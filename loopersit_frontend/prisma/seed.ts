import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with demo data...\n');

    // Clear existing data (in correct order due to foreign keys)
    console.log('🗑️  Clearing existing data...');
    await prisma.serviceOffer.deleteMany();
    await prisma.subService.deleteMany();
    await prisma.service.deleteMany();
    await prisma.review.deleteMany();
    await prisma.page.deleteMany();
    await prisma.priceFeature.deleteMany();
    await prisma.pricing.deleteMany();
    await prisma.fAQ.deleteMany();
    await prisma.member.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.projectSummary.deleteMany();
    console.log('✅ Existing data cleared\n');

    // Services
    const services = await Promise.all([
        prisma.service.create({
            data: {
                name: 'Web Development',
                slug: 'web-development',
                description: 'We build modern, responsive websites using the latest technologies like Next.js, React, and Node.js. Our team delivers high-quality web solutions tailored to your business needs.',
                order: 1,
                offers: {
                    create: [
                        { offer: 'Custom website design', order: 1 },
                        { offer: 'Responsive mobile-first development', order: 2 },
                        { offer: 'SEO optimization included', order: 3 },
                    ]
                },
                subservices: {
                    create: [
                        { name: 'E-commerce Development', slug: 'ecommerce', description: 'Build powerful online stores with secure payment integration.', order: 1 },
                        { name: 'Landing Pages', slug: 'landing-pages', description: 'High-converting landing pages for your campaigns.', order: 2 },
                    ]
                }
            }
        }),
        prisma.service.create({
            data: {
                name: 'Mobile App Development',
                slug: 'mobile-development',
                description: 'Native and cross-platform mobile applications for iOS and Android. We use React Native and Flutter to deliver beautiful, performant apps.',
                order: 2,
                offers: {
                    create: [
                        { offer: 'iOS and Android apps', order: 1 },
                        { offer: 'Cross-platform development', order: 2 },
                        { offer: 'App Store submission support', order: 3 },
                    ]
                }
            }
        }),
        prisma.service.create({
            data: {
                name: 'UI/UX Design',
                slug: 'ui-ux-design',
                description: 'Create stunning user interfaces and seamless user experiences. Our design team focuses on usability, accessibility, and visual appeal.',
                order: 3,
                offers: {
                    create: [
                        { offer: 'User research & wireframing', order: 1 },
                        { offer: 'Figma/Sketch prototypes', order: 2 },
                        { offer: 'Design system creation', order: 3 },
                    ]
                }
            }
        }),
    ]);
    console.log(`✅ Created ${services.length} services`);

    // Reviews
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                name: 'John Smith',
                designation: 'CEO, TechStart Inc.',
                review: 'LoopersIT delivered an exceptional e-commerce platform for our business. Their attention to detail and commitment to quality is unmatched. Highly recommend!',
                order: 1,
            }
        }),
        prisma.review.create({
            data: {
                name: 'Sarah Johnson',
                designation: 'Marketing Director, GrowthHub',
                review: 'Working with LoopersIT was a pleasure. They understood our vision and created a website that exceeded our expectations. Great communication throughout.',
                order: 2,
            }
        }),
        prisma.review.create({
            data: {
                name: 'Michael Chen',
                designation: 'Founder, AppVenture',
                review: 'The mobile app they built for us is fantastic! Fast, reliable, and our users love it. The team was professional and delivered on time.',
                order: 3,
            }
        }),
    ]);
    console.log(`✅ Created ${reviews.length} reviews`);

    // Pages
    const pages = await Promise.all([
        prisma.page.create({
            data: {
                title: 'About Us',
                slug: 'about',
                linkOnFooter: true,
                content: '<h2>Who We Are</h2><p>LoopersIT is a leading software development company dedicated to helping businesses succeed in the digital world. Founded in 2020, we have grown into a team of passionate developers, designers, and strategists.</p><h2>Our Mission</h2><p>To deliver innovative, high-quality software solutions that empower businesses to achieve their goals.</p><h2>Our Values</h2><ul><li>Excellence in everything we do</li><li>Client-focused approach</li><li>Continuous innovation</li><li>Transparency and integrity</li></ul>',
            }
        }),
        prisma.page.create({
            data: {
                title: 'Privacy Policy',
                slug: 'privacy-policy',
                linkOnFooter: true,
                content: '<h2>Privacy Policy</h2><p>At LoopersIT, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p><h3>Information We Collect</h3><p>We collect information you provide directly to us, such as when you fill out a contact form or request a quote.</p><h3>How We Use Your Information</h3><p>We use your information to respond to your inquiries, provide services, and improve our offerings.</p>',
            }
        }),
        prisma.page.create({
            data: {
                title: 'Terms of Service',
                slug: 'terms',
                linkOnFooter: true,
                content: '<h2>Terms of Service</h2><p>By using our services, you agree to these terms. Please read them carefully.</p><h3>Services</h3><p>LoopersIT provides software development, design, and consulting services as described on our website.</p><h3>Payment Terms</h3><p>Payment terms are outlined in individual project agreements. We accept bank transfers and major credit cards.</p>',
            }
        }),
    ]);
    console.log(`✅ Created ${pages.length} pages`);

    // Pricing
    const pricing = await Promise.all([
        prisma.pricing.create({
            data: {
                name: 'Starter',
                priceRange: '$500 - $2,000',
                order: 1,
                features: {
                    create: [
                        { feature: 'Single page website', order: 1 },
                        { feature: 'Responsive design', order: 2 },
                        { feature: 'Basic SEO setup', order: 3 },
                        { feature: '2 revision rounds', order: 4 },
                        { feature: '1 month support', order: 5 },
                    ]
                }
            }
        }),
        prisma.pricing.create({
            data: {
                name: 'Professional',
                priceRange: '$2,000 - $10,000',
                order: 2,
                features: {
                    create: [
                        { feature: 'Multi-page website or app', order: 1 },
                        { feature: 'Custom design & branding', order: 2 },
                        { feature: 'Advanced SEO & analytics', order: 3 },
                        { feature: 'CMS integration', order: 4 },
                        { feature: '5 revision rounds', order: 5 },
                        { feature: '3 months support', order: 6 },
                    ]
                }
            }
        }),
        prisma.pricing.create({
            data: {
                name: 'Enterprise',
                priceRange: '$10,000+',
                order: 3,
                features: {
                    create: [
                        { feature: 'Full-scale web application', order: 1 },
                        { feature: 'Custom features & integrations', order: 2 },
                        { feature: 'Dedicated project manager', order: 3 },
                        { feature: 'Priority support & SLA', order: 4 },
                        { feature: 'Unlimited revisions', order: 5 },
                        { feature: '12 months support', order: 6 },
                        { feature: 'Training & documentation', order: 7 },
                    ]
                }
            }
        }),
    ]);
    console.log(`✅ Created ${pricing.length} pricing plans`);

    // FAQs
    const faqs = await Promise.all([
        prisma.fAQ.create({
            data: {
                question: 'How long does it take to build a website?',
                answer: 'The timeline depends on the complexity of the project. A simple landing page can be completed in 1-2 weeks, while a full-featured web application may take 2-4 months. We provide detailed timelines during our initial consultation.',
                order: 1,
            }
        }),
        prisma.fAQ.create({
            data: {
                question: 'What technologies do you use?',
                answer: 'We specialize in modern web technologies including React, Next.js, Node.js, Python, and PostgreSQL. For mobile apps, we use React Native and Flutter. We choose the best tech stack based on your project requirements.',
                order: 2,
            }
        }),
        prisma.fAQ.create({
            data: {
                question: 'Do you provide ongoing maintenance?',
                answer: 'Yes! We offer maintenance packages that include security updates, bug fixes, performance monitoring, and feature enhancements. Our support plans range from basic to premium depending on your needs.',
                order: 3,
            }
        }),
        prisma.fAQ.create({
            data: {
                question: 'How do we communicate during the project?',
                answer: 'We use a combination of tools including Slack for daily communication, weekly video calls for progress updates, and project management tools like Trello or Jira for task tracking. You will have direct access to your development team.',
                order: 4,
            }
        }),
    ]);
    console.log(`✅ Created ${faqs.length} FAQs`);

    // Team Members
    const members = await Promise.all([
        prisma.member.create({
            data: {
                role: 'leader',
                name: 'Alex Rahman',
                designation: 'CEO & Founder',
                linkedin: 'https://linkedin.com/in/alexrahman',
                github: 'https://github.com/alexrahman',
                order: 1,
            }
        }),
        prisma.member.create({
            data: {
                role: 'leader',
                name: 'Emily Zhang',
                designation: 'CTO',
                linkedin: 'https://linkedin.com/in/emilyzhang',
                github: 'https://github.com/emilyzhang',
                order: 2,
            }
        }),
        prisma.member.create({
            data: {
                role: 'member',
                name: 'David Kim',
                designation: 'Senior Frontend Developer',
                linkedin: 'https://linkedin.com/in/davidkim',
                github: 'https://github.com/davidkim',
                order: 3,
            }
        }),
        prisma.member.create({
            data: {
                role: 'member',
                name: 'Priya Sharma',
                designation: 'UI/UX Designer',
                linkedin: 'https://linkedin.com/in/priyasharma',
                order: 4,
            }
        }),
        prisma.member.create({
            data: {
                role: 'member',
                name: 'James Wilson',
                designation: 'Backend Developer',
                github: 'https://github.com/jameswilson',
                order: 5,
            }
        }),
    ]);
    console.log(`✅ Created ${members.length} team members`);

    // Portfolio
    const portfolios = await Promise.all([
        prisma.portfolio.create({
            data: {
                title: 'E-Commerce Platform for FashionHub',
                duration: '3 months',
                detail: 'Built a full-featured e-commerce platform with product catalog, shopping cart, secure payments via Stripe, order management, and admin dashboard. The site handles 10,000+ daily visitors.',
                link: 'https://fashionhub.example.com',
                order: 1,
            }
        }),
        prisma.portfolio.create({
            data: {
                title: 'Healthcare Management App',
                duration: '4 months',
                detail: 'Developed a HIPAA-compliant healthcare management application for a medical clinic chain. Features include patient records, appointment scheduling, telemedicine integration, and billing.',
                order: 2,
            }
        }),
        prisma.portfolio.create({
            data: {
                title: 'Real Estate Listing Platform',
                duration: '2 months',
                detail: 'Created a modern real estate platform with property listings, virtual tours, mortgage calculator, and agent profiles. Integrated with MLS data feeds for automatic updates.',
                link: 'https://realestate.example.com',
                order: 3,
            }
        }),
        prisma.portfolio.create({
            data: {
                title: 'Food Delivery Mobile App',
                duration: '5 months',
                detail: 'Built iOS and Android apps for a food delivery startup. Features real-time order tracking, restaurant management, driver app, and customer loyalty program.',
                order: 4,
            }
        }),
    ]);
    console.log(`✅ Created ${portfolios.length} portfolio items`);

    // Project Summary / Statistics
    const stats = await Promise.all([
        prisma.projectSummary.create({
            data: {
                figure: '150+',
                detail: 'Projects Completed',
                order: 1,
            }
        }),
        prisma.projectSummary.create({
            data: {
                figure: '50+',
                detail: 'Happy Clients',
                order: 2,
            }
        }),
        prisma.projectSummary.create({
            data: {
                figure: '5+',
                detail: 'Years Experience',
                order: 3,
            }
        }),
        prisma.projectSummary.create({
            data: {
                figure: '15+',
                detail: 'Team Members',
                order: 4,
            }
        }),
    ]);
    console.log(`✅ Created ${stats.length} statistics`);

    console.log('\n✨ Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

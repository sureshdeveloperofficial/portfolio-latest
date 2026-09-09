import './globals.css';

export const metadata = {
    title: 'Suresh Shanmugasundaram — Software Engineer & Freelancer | Full-Stack & Scalable Systems',
    description: 'Software Engineer & Freelancer with 3 years of experience building scalable backend microservices, resilient APIs, and high-performance web applications with Node.js, NestJS, TypeScript, React, Next.js, and AI.',
    keywords: ['Suresh Shanmugasundaram', 'Software Engineer', 'Freelancer', 'Freelance Developer', 'Full-Stack Developer', 'Node.js', 'NestJS', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'CQRS', 'Coimbatore'],
    authors: [{ name: 'Suresh Shanmugasundaram' }],
    openGraph: {
        title: 'Suresh Shanmugasundaram — Software Engineer & Freelancer',
        description: 'Software Engineer & Freelancer available for high-impact contracts, full-time engineering roles, and scalable web solutions.',
        url: 'https://suresh-shanmugasundaram-portfolio.vercel.app',
        siteName: 'Suresh Shanmugasundaram Portfolio',
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

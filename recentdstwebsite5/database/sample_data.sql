-- Sample Data for ReCentDST Website
-- This file contains sample data to populate the database for testing and demonstration

USE recentdst_website;

-- Insert admin users (password is 'admin123' hashed with bcrypt)
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@recentdst.com', '$2b$10$rQZ8kqXqxqxqxqxqxqxqxOeKqXqxqxqxqxqxqxqxqxqxqxqxqxqxq', 'System Administrator', 'super_admin'),
('louise', 'louise@recentdst.com', '$2b$10$rQZ8kqXqxqxqxqxqxqxqxOeKqXqxqxqxqxqxqxqxqxqxqxqxqxq', 'Louise Chaytor', 'admin'),
('editor', 'editor@recentdst.com', '$2b$10$rQZ8kqXqxqxqxqxqxqxqxOeKqXqxqxqxqxqxqxqxqxqxqxqxqxq', 'Content Editor', 'editor');

-- Insert team members based on company profile
INSERT INTO team_members (full_name, position, bio, expertise, years_experience, education, display_order) VALUES
('Louise Chaytor', 'Managing Director, ICT Expert', 'Louise Chaytor is the Managing Director of ReCentDST Limited with over 16 years of marketing expertise and extensive experience in ICT solutions. She leads the company\'s strategic vision and oversees all technology implementations.', '["ICT Solutions", "Digital Marketing", "Strategic Planning", "Project Management"]', 16, 'Masters in Information Technology, Bachelor of Science in Computer Science', 1),

('Prof. Percival Showers, PhD', 'Director, Scientific Research', 'Professor Percival Showers brings over 40 years of scientific research experience to ReCentDST. He leads our research initiatives and ensures the highest standards of scientific rigor in all our projects.', '["Scientific Research", "Environmental Studies", "Research Methodology", "Academic Leadership"]', 40, 'PhD in Environmental Science, Masters in Research Methodology', 2),

('Olaoluwa Ogunfeyitimi', 'Director, Technology Research', 'Olaoluwa Ogunfeyitimi heads our technology research division, bringing innovative solutions and cutting-edge research capabilities to our clients. His expertise spans multiple technology domains.', '["Technology Research", "Innovation Management", "Software Development", "IoT Solutions"]', 12, 'Masters in Technology Management, Bachelor of Engineering', 3),

('Harold Domingo', 'Director, Market Research', 'Harold Domingo leads our market research division with extensive experience in market analysis, consumer behavior studies, and business intelligence. He ensures our research delivers actionable insights.', '["Market Research", "Business Intelligence", "Consumer Analysis", "Strategic Consulting"]', 15, 'Masters in Business Administration, Bachelor of Economics', 4);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, summary, content, category, author_id, reading_time, status, featured, published_at) VALUES
('Digital Agriculture: Transforming Food Security in West Africa', 'digital-agriculture-west-africa', 'Digital technologies are revolutionizing agricultural practices across West Africa, with specific case studies from Sierra Leone\'s AKIS Aid platform.', 
'<h2>Introduction</h2>
<p>Digital agriculture represents a paradigm shift in how we approach food security challenges across West Africa. At ReCentDST, we have been at the forefront of implementing digital solutions that bridge the gap between traditional farming practices and modern technology.</p>

<h2>The AKIS Aid Platform: A Case Study</h2>
<p>Our Agricultural Knowledge & Information System (AKIS) Aid platform has successfully connected over 1,000 farmers to essential resources and extension services. This digital platform provides:</p>
<ul>
<li>Real-time weather information and farming advisories</li>
<li>Market price updates and trading opportunities</li>
<li>Access to agricultural extension services</li>
<li>Peer-to-peer knowledge sharing capabilities</li>
</ul>

<h2>Impact and Results</h2>
<p>Since its implementation, the AKIS Aid platform has demonstrated remarkable results:</p>
<ul>
<li>40% improvement in farming efficiency</li>
<li>25% increase in farmer incomes</li>
<li>Reduced post-harvest losses by 30%</li>
<li>Enhanced access to markets for smallholder farmers</li>
</ul>

<h2>Technology Stack and Implementation</h2>
<p>The platform utilizes a combination of web technologies, mobile applications, and SMS services to ensure accessibility across different technological capabilities. Our implementation includes:</p>
<ul>
<li>Responsive web application for desktop and mobile access</li>
<li>SMS-based information delivery for feature phones</li>
<li>USSD integration for offline capabilities</li>
<li>Integration with weather APIs and market data sources</li>
</ul>

<h2>Challenges and Solutions</h2>
<p>Implementing digital agriculture solutions in West Africa comes with unique challenges:</p>
<ul>
<li><strong>Connectivity Issues:</strong> We addressed this through offline-capable applications and SMS integration</li>
<li><strong>Digital Literacy:</strong> Comprehensive training programs and user-friendly interfaces</li>
<li><strong>Language Barriers:</strong> Multi-language support including local dialects</li>
<li><strong>Device Limitations:</strong> Solutions compatible with basic smartphones and feature phones</li>
</ul>

<h2>Future Prospects</h2>
<p>The success of digital agriculture initiatives in Sierra Leone provides a blueprint for expansion across West Africa. Future developments include:</p>
<ul>
<li>AI-powered crop disease detection</li>
<li>Blockchain-based supply chain tracking</li>
<li>IoT sensors for precision agriculture</li>
<li>Drone technology for crop monitoring</li>
</ul>

<h2>Conclusion</h2>
<p>Digital agriculture is not just about technology; it\'s about empowering farmers with the tools and knowledge they need to improve their livelihoods. At ReCentDST, we remain committed to developing innovative solutions that address the unique challenges of West African agriculture while building sustainable food security for the region.</p>', 
'digital_solutions', 1, 8, 'published', TRUE, '2025-03-15 10:00:00'),

('The Role of GIS Technology in Urban Planning: Sierra Leone Case Study', 'gis-urban-planning-sierra-leone', 'Deep dive into how Geographic Information Systems are enabling better urban planning decisions in Freetown.', 
'<h2>Introduction</h2>
<p>Geographic Information Systems (GIS) have become indispensable tools for urban planning in developing countries. In Sierra Leone, particularly in Freetown, GIS technology is revolutionizing how city planners approach urban development challenges.</p>

<h2>The Urban Planning Challenge in Freetown</h2>
<p>Freetown faces numerous urban planning challenges:</p>
<ul>
<li>Rapid population growth and unplanned settlements</li>
<li>Limited infrastructure and service delivery</li>
<li>Environmental vulnerabilities including flooding and landslides</li>
<li>Inadequate spatial data for informed decision-making</li>
</ul>

<h2>ReCentDST\'s GIS Implementation</h2>
<p>Our Western Area Mapping project has provided comprehensive GIS solutions to government agencies and development organizations. The system includes:</p>
<ul>
<li>High-resolution satellite imagery analysis</li>
<li>Detailed topographic mapping</li>
<li>Infrastructure and utilities mapping</li>
<li>Population density and demographic analysis</li>
<li>Environmental risk assessment layers</li>
</ul>

<h2>Key Features and Capabilities</h2>
<p>The GIS platform we developed offers several advanced features:</p>
<ul>
<li><strong>Multi-layer Analysis:</strong> Overlay different data layers for comprehensive analysis</li>
<li><strong>Real-time Data Integration:</strong> Connect with live data sources for up-to-date information</li>
<li><strong>Predictive Modeling:</strong> Forecast urban growth patterns and infrastructure needs</li>
<li><strong>Collaborative Planning:</strong> Multi-user platform for stakeholder engagement</li>
</ul>

<h2>Impact on Urban Planning Decisions</h2>
<p>The implementation of GIS technology has resulted in:</p>
<ul>
<li>35% improvement in planning efficiency</li>
<li>Better-informed infrastructure investment decisions</li>
<li>Enhanced disaster risk management capabilities</li>
<li>Improved coordination between government agencies</li>
</ul>

<h2>Case Study: Flood Risk Management</h2>
<p>One of the most significant applications of our GIS system has been in flood risk management. By analyzing topographic data, rainfall patterns, and drainage systems, we have:</p>
<ul>
<li>Identified high-risk flood zones</li>
<li>Developed early warning systems</li>
<li>Planned drainage infrastructure improvements</li>
<li>Guided safe settlement development</li>
</ul>

<h2>Technology and Data Sources</h2>
<p>Our GIS implementation utilizes various data sources and technologies:</p>
<ul>
<li>Satellite imagery from multiple providers</li>
<li>Ground-truth data collection using GPS devices</li>
<li>Drone surveys for detailed area mapping</li>
<li>Integration with government databases</li>
<li>Community-contributed data through mobile applications</li>
</ul>

<h2>Challenges and Lessons Learned</h2>
<p>Implementing GIS in Sierra Leone presented several challenges:</p>
<ul>
<li><strong>Data Quality:</strong> Ensuring accuracy and reliability of spatial data</li>
<li><strong>Capacity Building:</strong> Training local staff on GIS technologies</li>
<li><strong>Infrastructure Limitations:</strong> Working with limited internet connectivity</li>
<li><strong>Stakeholder Buy-in:</strong> Demonstrating value to decision-makers</li>
</ul>

<h2>Future Developments</h2>
<p>Looking ahead, we are working on several enhancements:</p>
<ul>
<li>Integration with IoT sensors for real-time environmental monitoring</li>
<li>Machine learning algorithms for predictive urban modeling</li>
<li>Mobile GIS applications for field data collection</li>
<li>3D visualization capabilities for better stakeholder communication</li>
</ul>

<h2>Conclusion</h2>
<p>GIS technology has proven to be a game-changer for urban planning in Sierra Leone. By providing accurate, timely, and comprehensive spatial information, GIS enables planners to make better decisions that improve the lives of urban residents. ReCentDST remains committed to advancing GIS capabilities and supporting sustainable urban development across West Africa.</p>', 
'research', 2, 12, 'published', TRUE, '2025-02-28 14:30:00'),

('Market Research Best Practices for NGO Program Design', 'market-research-ngo-program-design', 'Evidence-based guidelines for non-governmental organizations on conducting effective market research to inform program design.', 
'<h2>Introduction</h2>
<p>Non-governmental organizations (NGOs) operating in developing countries face unique challenges in designing effective programs. Market research provides the foundation for evidence-based program design that addresses real community needs and achieves sustainable impact.</p>

<h2>The Importance of Market Research for NGOs</h2>
<p>Market research for NGOs goes beyond traditional commercial applications. It involves:</p>
<ul>
<li>Understanding community needs and priorities</li>
<li>Assessing existing services and gaps</li>
<li>Evaluating cultural and social contexts</li>
<li>Identifying potential partners and stakeholders</li>
<li>Measuring baseline conditions for impact assessment</li>
</ul>

<h2>ReCentDST\'s Approach to NGO Market Research</h2>
<p>Based on our experience conducting over 70 feasibility studies and 9 business appraisals, we have developed a comprehensive framework for NGO market research:</p>

<h3>1. Stakeholder Mapping and Analysis</h3>
<ul>
<li>Identify all relevant stakeholders including beneficiaries, partners, and influencers</li>
<li>Analyze stakeholder interests, influence, and potential contributions</li>
<li>Develop engagement strategies for each stakeholder group</li>
</ul>

<h3>2. Community Needs Assessment</h3>
<ul>
<li>Conduct participatory research methods including focus groups and community meetings</li>
<li>Use both quantitative surveys and qualitative interviews</li>
<li>Employ culturally appropriate research methodologies</li>
<li>Ensure representative sampling across demographic groups</li>
</ul>

<h3>3. Market Analysis and Gap Assessment</h3>
<ul>
<li>Map existing services and programs in the target area</li>
<li>Identify service gaps and unmet needs</li>
<li>Analyze competitive landscape and potential collaborations</li>
<li>Assess market dynamics and trends</li>
</ul>

<h2>Research Methodologies for NGO Context</h2>
<p>Effective NGO market research requires adapted methodologies:</p>

<h3>Quantitative Methods</h3>
<ul>
<li><strong>Household Surveys:</strong> Structured questionnaires for demographic and socioeconomic data</li>
<li><strong>Knowledge, Attitudes, and Practices (KAP) Studies:</strong> Assess baseline understanding and behaviors</li>
<li><strong>Service Utilization Surveys:</strong> Measure current service usage patterns</li>
</ul>

<h3>Qualitative Methods</h3>
<ul>
<li><strong>Focus Group Discussions:</strong> Explore community perspectives and preferences</li>
<li><strong>Key Informant Interviews:</strong> Gather insights from community leaders and experts</li>
<li><strong>Participatory Rural Appraisal:</strong> Community-led research and priority setting</li>
<li><strong>Ethnographic Studies:</strong> Deep understanding of cultural contexts</li>
</ul>

<h2>Case Study: COVID-19 Face Mask Usage Study</h2>
<p>During the COVID-19 pandemic, ReCentDST conducted a comprehensive KAP study on face mask usage in Sierra Leone. This research:</p>
<ul>
<li>Surveyed 1,200 respondents across urban and rural areas</li>
<li>Assessed knowledge about COVID-19 prevention</li>
<li>Evaluated attitudes toward face mask wearing</li>
<li>Documented actual mask usage practices</li>
<li>Identified barriers to consistent mask wearing</li>
</ul>

<p>The findings informed public health messaging and policy recommendations, demonstrating the value of rigorous market research in program design.</p>

<h2>Data Collection Best Practices</h2>
<p>Successful NGO market research requires attention to:</p>

<h3>Cultural Sensitivity</h3>
<ul>
<li>Use local languages and culturally appropriate communication styles</li>
<li>Respect traditional authority structures and decision-making processes</li>
<li>Consider gender dynamics and ensure inclusive participation</li>
<li>Adapt research timing to local schedules and customs</li>
</ul>

<h3>Ethical Considerations</h3>
<ul>
<li>Obtain informed consent from all participants</li>
<li>Ensure confidentiality and data protection</li>
<li>Provide clear information about research purposes and use</li>
<li>Share findings with participating communities</li>
</ul>

<h3>Quality Assurance</h3>
<ul>
<li>Train enumerators thoroughly on research protocols</li>
<li>Implement data validation and verification procedures</li>
<li>Use multiple data sources for triangulation</li>
<li>Conduct pilot testing before full implementation</li>
</ul>

<h2>Analyzing and Interpreting Results</h2>
<p>NGO market research analysis should focus on:</p>
<ul>
<li>Identifying priority needs and target populations</li>
<li>Understanding barriers and enablers to program success</li>
<li>Assessing feasibility and sustainability factors</li>
<li>Developing evidence-based program recommendations</li>
</ul>

<h2>Using Research for Program Design</h2>
<p>Market research findings should directly inform:</p>
<ul>
<li><strong>Program Objectives:</strong> Based on identified priority needs</li>
<li><strong>Target Beneficiaries:</strong> Defined through demographic and needs analysis</li>
<li><strong>Service Delivery Models:</strong> Adapted to local contexts and preferences</li>
<li><strong>Partnership Strategies:</strong> Built on stakeholder analysis</li>
<li><strong>Monitoring and Evaluation Frameworks:</strong> Using baseline data and indicators</li>
</ul>

<h2>Common Pitfalls and How to Avoid Them</h2>
<ul>
<li><strong>Assumption-based Planning:</strong> Always validate assumptions through research</li>
<li><strong>Limited Stakeholder Engagement:</strong> Include all relevant voices in research</li>
<li><strong>Inadequate Sample Sizes:</strong> Ensure statistical significance for quantitative studies</li>
<li><strong>Cultural Insensitivity:</strong> Invest in cultural competency and local partnerships</li>
<li><strong>Poor Data Quality:</strong> Implement robust quality assurance measures</li>
</ul>

<h2>Building Research Capacity</h2>
<p>NGOs should invest in building internal research capacity through:</p>
<ul>
<li>Staff training on research methodologies</li>
<li>Partnerships with research institutions</li>
<li>Development of research protocols and tools</li>
<li>Investment in data collection and analysis systems</li>
</ul>

<h2>Conclusion</h2>
<p>Effective market research is essential for NGO program success. By following evidence-based practices and adapting methodologies to local contexts, NGOs can design programs that truly address community needs and achieve sustainable impact. ReCentDST remains committed to supporting NGOs through high-quality research services and capacity building initiatives.</p>', 
'research', 4, 15, 'published', FALSE, '2025-03-01 09:15:00');

-- Insert sample news posts
INSERT INTO news_posts (title, slug, summary, content, category, author_id, reading_time, status, featured, published_at) VALUES
('ReCentDST Partners with FLS Group for Wind Farm Feasibility Study', 'recentdst-fls-group-wind-farm-partnership', 'ReCentDST Limited announces strategic partnership with FLS Group to conduct comprehensive wind farm feasibility studies across Sierra Leone.', 
'<h2>Strategic Partnership Announcement</h2>
<p>ReCentDST Limited is pleased to announce our strategic partnership with FLS Group to conduct comprehensive wind farm feasibility studies across Sierra Leone. This collaboration represents a significant step forward in Sierra Leone\'s renewable energy development.</p>

<h2>Project Scope and Objectives</h2>
<p>The wind farm feasibility study will encompass:</p>
<ul>
<li>Comprehensive wind resource assessment across multiple sites</li>
<li>Environmental impact analysis and mitigation strategies</li>
<li>Economic viability and financial modeling</li>
<li>Grid integration and infrastructure requirements</li>
<li>Community engagement and social impact assessment</li>
</ul>

<h2>Expected Outcomes</h2>
<p>This partnership aims to:</p>
<ul>
<li>Identify optimal locations for wind energy development</li>
<li>Provide detailed technical and financial analysis</li>
<li>Support Sierra Leone\'s renewable energy goals</li>
<li>Create opportunities for sustainable energy investment</li>
</ul>

<h2>Timeline and Next Steps</h2>
<p>The feasibility study is expected to commence in Q2 2025, with preliminary findings available by the end of the year. This project demonstrates ReCentDST\'s commitment to supporting Sierra Leone\'s transition to sustainable energy sources.</p>', 
'company_news', 1, 3, 'published', TRUE, '2025-03-10 11:00:00'),

('New Research Initiative: Small Scale Biogas Plants Nationwide', 'small-scale-biogas-plants-research', 'ReCentDST collaborates with Small Scale Utilities Group to promote biogas technology adoption across Sierra Leone.', 
'<h2>Research Initiative Launch</h2>
<p>ReCentDST Limited, in partnership with the Small Scale Utilities Group, has launched a comprehensive research initiative to promote small-scale biogas plants nationwide. This project aims to accelerate the adoption of clean cooking solutions across Sierra Leone.</p>

<h2>Research Objectives</h2>
<p>The initiative focuses on:</p>
<ul>
<li>Assessing biogas potential in different regions</li>
<li>Developing cost-effective biogas plant designs</li>
<li>Training local technicians and users</li>
<li>Creating sustainable financing models</li>
<li>Monitoring environmental and social impacts</li>
</ul>

<h2>Expected Impact</h2>
<p>This research initiative is expected to:</p>
<ul>
<li>Reduce dependence on traditional cooking fuels</li>
<li>Improve indoor air quality and health outcomes</li>
<li>Create local employment opportunities</li>
<li>Contribute to climate change mitigation</li>
</ul>

<h2>Community Engagement</h2>
<p>The project emphasizes community participation through:</p>
<ul>
<li>Local training programs</li>
<li>Demonstration sites</li>
<li>User feedback collection</li>
<li>Ongoing technical support</li>
</ul>', 
'research_insights', 2, 4, 'published', FALSE, '2025-03-05 14:20:00');

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
('Digital Agriculture', 'digital-agriculture'),
('GIS Technology', 'gis-technology'),
('Urban Planning', 'urban-planning'),
('Market Research', 'market-research'),
('NGO Development', 'ngo-development'),
('Renewable Energy', 'renewable-energy'),
('Biogas Technology', 'biogas-technology'),
('Wind Energy', 'wind-energy'),
('Research Methodology', 'research-methodology'),
('Community Development', 'community-development');

-- Link blog posts with tags
INSERT INTO blog_post_tags (blog_post_id, tag_id) VALUES
(1, 1), (1, 10), -- Digital Agriculture post
(2, 2), (2, 3), -- GIS Urban Planning post
(3, 4), (3, 5), (3, 9); -- NGO Market Research post

-- Link news posts with tags
INSERT INTO news_post_tags (news_post_id, tag_id) VALUES
(1, 6), (1, 8), -- Wind farm partnership
(2, 6), (2, 7), (2, 10); -- Biogas research initiative

-- Insert sample services
INSERT INTO services (title, slug, short_description, full_description, icon, category, features, is_active, display_order) VALUES
('Market Research & Intelligence', 'market-research-intelligence', 'Strategic market research, competitive analysis, and business intelligence services.', 'Comprehensive market research services including consumer behavior studies, competitive analysis, market sizing, and business viability assessments.', 'fas fa-chart-line', 'research', '["Market Analysis", "Consumer Research", "Competitive Intelligence", "Business Viability Studies"]', TRUE, 1),

('Digital Solutions', 'digital-solutions', 'Custom web development, mobile applications, and digital platforms.', 'End-to-end digital solutions including website development, mobile applications, IoT systems, and digital transformation consulting.', 'fas fa-laptop-code', 'digital', '["Web Development", "Mobile Apps", "IoT Solutions", "Digital Transformation"]', TRUE, 2),

('Renewable Energy Systems', 'renewable-energy-systems', 'Clean energy solutions including biogas and wind power systems.', 'Comprehensive renewable energy solutions including biogas plant design, wind energy assessments, and clean cooking technologies.', 'fas fa-leaf', 'energy', '["Biogas Systems", "Wind Energy", "Solar Solutions", "Energy Audits"]', TRUE, 3);

-- Insert sample portfolio projects
INSERT INTO portfolio_projects (title, slug, description, full_description, category, client_name, cover_image, technologies_used, project_duration, team_size, status, featured, start_date, end_date) VALUES
('AKIS Aid Agricultural Platform', 'akis-aid-platform', 'Agricultural Knowledge & Information System connecting 1000+ farmers to resources and extension services.', 'Comprehensive digital platform providing farmers with real-time weather information, market prices, extension services, and peer-to-peer knowledge sharing capabilities.', 'digital_solutions', 'Ministry of Agriculture', 'images/akis-aid.jpg', '["PHP", "MySQL", "Bootstrap", "SMS API", "Weather API"]', '18 months', 6, 'completed', TRUE, '2023-01-15', '2024-07-15'),

('Western Area GIS Mapping', 'western-area-gis-mapping', 'Geographic Information System enhancing urban planning for government agencies.', 'Advanced GIS platform providing comprehensive spatial analysis, infrastructure mapping, and urban planning tools for government agencies and development organizations.', 'digital_solutions', 'Freetown City Council', 'images/western-area-mapping.jpg', '["ArcGIS", "PostgreSQL", "Python", "JavaScript", "Leaflet"]', '12 months', 4, 'completed', TRUE, '2023-06-01', '2024-06-01');

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_position, client_company, testimonial_text, rating, project_id, is_featured) VALUES
('Dr. Sarah Johnson', 'Director of Programs', 'Agricultural Development Foundation', 'ReCentDST\'s AKIS Aid platform has revolutionized how we connect with farmers. The 40% improvement in farming efficiency speaks for itself.', 5, 1, TRUE),
('Michael Thompson', 'Urban Planning Manager', 'Freetown City Council', 'The GIS mapping system provided by ReCentDST has transformed our urban planning capabilities. Decision-making is now data-driven and more effective.', 5, 2, TRUE);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('What services does ReCentDST offer?', 'ReCentDST offers comprehensive services including market research and intelligence, digital solutions, renewable energy systems, scientific research, corporate training, and business development services.', 'general', 1),
('How long does a typical research project take?', 'Project timelines vary depending on scope and complexity. Market research studies typically take 4-8 weeks, while comprehensive feasibility studies may require 3-6 months.', 'services', 2),
('Do you work with international organizations?', 'Yes, we work with a diverse range of clients including international NGOs, government agencies, private companies, and development organizations across West Africa.', 'general', 3),
('What makes ReCentDST different from other research companies?', 'Our multidisciplinary team combines 16+ years of marketing expertise, 40+ years of scientific research, and 20+ years of ICT experience. We provide locally-relevant solutions with international standards.', 'general', 4);

-- Insert sample site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'ReCentDST Limited - Research Centre for Development in Science and Technology', 'text', 'Main site title'),
('contact_email', 'info@recentdst.com', 'text', 'Primary contact email'),
('contact_phone', '+232 76 803154', 'text', 'Primary contact phone'),
('address', '51a Main Road Wilberforce, Freetown, Sierra Leone', 'text', 'Company address'),
('facebook_url', 'https://www.facebook.com/recentdst', 'text', 'Facebook page URL'),
('linkedin_url', 'https://www.linkedin.com/in/louise-chaytor-50266277/', 'text', 'LinkedIn profile URL'),
('twitter_url', 'https://x.com/recentds_t', 'text', 'Twitter profile URL'),
('instagram_url', 'https://www.instagram.com/recentds_t', 'text', 'Instagram profile URL');

-- Insert sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, full_name, source) VALUES
('john.doe@example.com', 'John Doe', 'website'),
('jane.smith@example.com', 'Jane Smith', 'website'),
('researcher@university.edu', 'Dr. Research Fellow', 'conference');

-- Insert sample contact submissions
INSERT INTO contact_submissions (full_name, email, phone, company, subject, message, contact_type, status) VALUES
('Alice Johnson', 'alice@company.com', '+232 76 123456', 'Tech Solutions Ltd', 'Digital Platform Development', 'We are interested in developing a digital platform for our agricultural supply chain. Could you provide more information about your services?', 'consultation', 'new'),
('Bob Wilson', 'bob@ngo.org', '+232 77 654321', 'Development NGO', 'Market Research Services', 'Our organization needs comprehensive market research for a new health program. What is your process and timeline?', 'general', 'in_progress');

-- Insert sample quote requests
INSERT INTO quote_requests (full_name, email, phone, company, project_type, project_description, budget_range, timeline, status) VALUES
('Carol Davis', 'carol@startup.com', '+232 78 987654', 'AgriTech Startup', 'digital_solutions', 'We need a mobile application for connecting farmers to markets, similar to your AKIS Aid platform but focused on market linkages.', '15k_50k', '6 months', 'new'),
('David Brown', 'david@ministry.gov.sl', '+232 79 456789', 'Ministry of Energy', 'renewable_energy', 'Feasibility study for solar energy implementation in rural communities across three districts.', '50k_100k', '12 months', 'reviewing');

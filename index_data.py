
def get_skills():
    return [
        {
            "title": "Exploratory Data Analysis",
            "description": "Uncovering patterns and insights through comprehensive data cleaning, manipulation, and statistical analysis."
        },
        {
            "title": "Data Visualization",
            "description": "Communicating insights through clear, compelling charts and graphs using Python, Matplotlib, and Seaborn."
        },
        {
            "title": "Web Development",
            "description": "Full-stack development using Python Flask, HTML, CSS, and JavaScript, demonstrated by this portfolio."
        },
        {
            "title": "QA Testing",
            "description": "Conducting Manual QA testing for Management Information Systems and optimizing bug reporting workflows."
        },
        {
            "title": "Spreadsheet Mastery",
            "description": "Advanced proficiency in Excel and Google Sheets, leveraging AI to improve workflows, specialized in VLOOKUP and multi-dataset QUERY manipulation.",
            "id": "ss-card",
            "dropdown_id": "ss-dropdown",
            "dropdown_items": [
                {
                    "text": "1. VLOOKUP and QUERY",
                    "subtext": "(Click to view project)",
                    "link": "https://docs.google.com/spreadsheets/d/1nHLe3EgyBqxjKtO1FdYFaQbFSzSxvnpsF4z1tDfYr_w/edit?usp=sharing"
                },
                {
                    "text": "2. QA Bug Logs Structure",
                    "subtext": "(Click to view project)",
                    "link": "https://docs.google.com/spreadsheets/d/1dzfcWt7wnZmojssD76lOyCIr3W2dlEuwhAfNmpGFTRk/edit?usp=sharing"
                }
            ]
        },
        {
            "title": "Prompt Engineering",
            "description": "Leveraging generative AI to streamline workflows and optimize complex task execution."
        },
        {
            "title": "Version Control",
            "description": "Utilizing Git and GitHub for efficient source code management, project versioning, and collaboration."
        },
        {
            "title": "n8n Workflow Automation",
            "description": "Designing complex automated workflows and custom node integrations to connect platforms and automate repetitive tasks."
        }
    ]


def get_about_content():
    return {
        "eyebrow": "About Me",
        "title": "I like building useful things that make work a little easier.",
        "intro": [
            "I am an IT professional who enjoys finding better ways to do things, especially when a process feels too manual, messy, or time-consuming. Most of the work in this portfolio comes from that mindset: make it clearer, make it easier, and make it more useful.",
            "Lately, I have been working on school system projects, testing workflows, automation, and data-related tasks. I enjoy building things that people can actually use, whether that means organizing information better, speeding up repetitive work, or helping turn raw data into something easier to understand.",
            "Outside of tech, I also love playing guitar. I have joined a few contests over the years and have been lucky enough to win some of them, which taught me a lot about discipline, creativity, and showing up with confidence."
        ],
        "chips": [
            "Data Work",
            "Visuals & Reports",
            "Testing & QA",
            "Automation",
            "Web Projects",
            "AI-Assisted Work",
            "Claude Code"
        ],
        "spotlights": [
            {
                "title": "Useful Systems",
                "text": "I like building systems that solve real day-to-day problems, especially when they help people keep things organized and easier to manage."
            },
            {
                "title": "Less Manual Work",
                "text": "A lot of my work focuses on cutting down repetitive tasks through simple automation, cleaner tracking, and better workflows."
            },
            {
                "title": "Clear Data Stories",
                "text": "When I work with data, I want the result to be easy to explain, easy to present, and actually helpful for the people looking at it."
            },
            {
                "title": "Always Learning",
                "text": "I am still growing, and that is a big part of how I work. I keep learning new tools based on what a project needs and what will genuinely help."
            },
            {
                "title": "Creative Side",
                "text": "I also enjoy music and playing guitar, and joining contests has helped me grow more confident, creative, and comfortable performing under pressure."
            }
        ],
        "placeholders": [
            {
                "label": "About Photo",
                "caption": "",
                "image": "images/about/about.jpg",
                "alt": "Hanz de la Cruz"
            },
            {
                "label": "Project / Work Photo",
                "caption": "A workspace or project photo can be added here when you are ready."
            }
        ]
    }

def get_services():
    return [
        {
            "title": "Data Insights",
            "description": "I mainly do collection, cleaning and interpretation of data to provide insightful information for businesses."
        },
        {
            "title": "Web Solutions",
            "description": "Building responsive, user-friendly websites and web applications tailored to your specific business needs."
        },
        {
            "title": "Quality Assurance",
            "description": "Ensuring robust software performance through rigorous testing and efficient bug tracking workflows."
        },
        {
            "title": "Process Automation",
            "description": "Architecting sophisticated n8n workflows and AI-driven systems to streamline business operations and optimize complex data processes."
        },
        {
            "title": "Data Storytelling",
            "description": "Transforming complex data into clear, interactive dashboards that drive strategic decision-making."
        },
        {
            "title": "Machine Learning",
            "description": "Experienced in training ML models, evaluating performance metrics, and identifying optimal algorithms for specific datasets.",
            "id": "ml-card",
            "dropdown_id": "ml-dropdown",
            "dropdown_items": [
                {
                    "text": "1. Reddit Scraping (PRAW API)",
                    "subtext": "(Click to view project)",
                    "link": "https://colab.research.google.com/drive/1yZxknpAbuI1djAGUyNtsXpZd2tLAHxbn?usp=sharing"
                },
                {
                    "text": "2. ML Model Evaluation & Analysis",
                    "subtext": "(Click to view project)",
                    "link": "https://colab.research.google.com/drive/1SAKjZ0P1YuQ7oliU7AXvKfwwF5pw1zmZ?usp=sharing"
                },
                {
                    "text": "3. Customer Segmentation (K-Means)",
                    "subtext": "(Click to view project)",
                    "link": "https://colab.research.google.com/drive/1QwFY_uxqNcCzrk34NncbaI488VwBy9nt?usp=sharing"
                }
            ]
        }
    ]

def get_certifications():
    return [
        {
            "title": "Google AI Essentials",
            "image": "images/Certifications/Google_AI.png",
            "description": "A hands-on program by Google experts focusing on generative AI applications, prompt engineering, and responsible AI use to enhance productivity across various industries."
        },
        {
            "title": "Data Science Essentials",
            "image": "images/Certifications/Data_Science_Essentials_with_Python_certificate_hanzuriel-delacruz-students-isatu-edu-ph_83c2913b-ed-1.png",
            "description": "An introductory course covering the full data science lifecycle using Python, including data cleaning, analysis, visualization, and storytelling with real-world datasets."
        },
        {
            "title": "Python Essentials 1",
            "image": "images/Certifications/Python_Essentials_1_certificate_hdlcruz03-gmail-com_92673056-d0fd-4640-84a8-31dac583bf20-1.png",
            "description": "A foundational course on Python programming, covering data types, control flow, lists, and functions, preparing learners for entry-level software development and data analysis."
        },
        {
            "title": "Apply AI Customer Reviews",
            "image": "images/Certifications/ApplyAIAnalyzeCustomerReviewsv220251115-29-fesq-1.png",
            "description": "Focuses on transforming customer feedback into actionable insights through thematic analysis and sentiment scoring using AI tools and large language models."
        },
        {
            "title": "Intro to Cyber Security",
            "image": "images/Certifications/I2CSUpdate20251116-30-5l7rjf-1.png",
            "description": "Explores the cybersecurity landscape, covering trends, threats, and organizational protection, designed to provide a solid understanding of digital security principles."
        },
        {
            "title": "DevOps Basics",
            "image": "images/Certifications/DevOps_Basics.png",
            "description": "Covers fundamental DevOps practices, including continuous integration/deployment (CI/CD), infrastructure as code, and cloud-native development principles."
        }
    ]

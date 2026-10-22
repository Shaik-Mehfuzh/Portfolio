import { Project, SkillItem, TimelineEntry } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Shaik Mehfuzh',
  preferredName: 'Shaik Mehfuzh',
  title: 'AI & ML Developer · Systems Builder',
  headline: 'Building Intelligence. Shaping What’s Next.',
  subtext:
    'I explore artificial intelligence, machine learning, and software engineering to transform complex ideas into practical, thoughtful digital experiences.',
  education: 'B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
  institution: 'Chaitanya Bharathi Institute of Technology (CBIT), Proddatur',
  location: 'Andhra Pradesh, India',
  cgpa: '8.7 / 10',
  currentYear: 'Third Year (Undergraduate)',
  statusText: 'Available for Summer 2026 / Fall 2026 AI/ML Internships & Engineering Roles',
  email: 'mehfuzhshaik@gmail.com',
  github: 'https://github.com/Shaik-Mehfuzh',
  linkedin: 'https://www.linkedin.com/in/mehfuzh-shaik-a88b53348',
  bio: `I am a Computer Science & Engineering undergraduate specializing in Artificial Intelligence and Machine Learning at Chaitanya Bharathi Institute of Technology (CBIT). With an 8.7 CGPA and practical internship experience, my work spans machine learning predictive modeling, computer vision pipelines, and data storytelling. I focus on building technology that solves real human challenges rather than pursuing complexity for its own sake.`,
  coreValues: [
    {
      title: 'Metrics Over Hype',
      description: 'Evaluating models rigorously on validation distributions, F1 scores, and real-world edge cases.',
    },
    {
      title: 'Human-Centered AI',
      description: 'Designing intelligent tools (like Operix AI) that augment human judgment and safety rather than displacing operators.',
    },
    {
      title: 'End-to-End Ownership',
      description: 'From raw data wrangling and ETL in Python/SQL to high-performance inference pipelines and modern UI interfaces.',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'wine-quality-prediction',
    title: 'Wine Quality Prediction Engine',
    subtitle: 'Machine Learning Classification & Physicochemical Feature Analysis',
    category: 'ai-ml',
    categoryLabel: 'Machine Learning',
    status: 'Completed',
    statusColor: 'emerald',
    problem:
      'Subjective sensory wine evaluation is inherently noisy, expensive, and inconsistent across commercial batches. Wine producers need a reliable mathematical method to predict product quality ratings directly from objective physicochemical laboratory measurements.',
    solution:
      'Engineered an end-to-end supervised machine learning pipeline analyzing 11 physicochemical properties (alcohol, volatile acidity, sulphates, citric acid, pH, residual sugars). Implemented exploratory data analysis, outlier remediation, and benchmarked multiple classifiers with cross-validation.',
    whatIBuilt:
      'Full Python/Scikit-learn pipeline featuring exploratory data correlation analysis, hyperparameter-tuned Random Forest and Gradient Boosting models, and a feature importance visualizer demonstrating that alcohol content and volatile acidity are the primary drivers of vintage quality.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Random Forest'],
    metrics: [
      { label: 'Evaluation F1-Score', value: '88.4%' },
      { label: 'Physicochemical Features', value: '11 Factors' },
      { label: 'Key Driver Identified', value: 'Alcohol & Acidity' },
    ],
    highlights: [
      'Comprehensive correlation matrix revealing inverse relationship between volatile acidity and quality perception.',
      'Hyperparameter grid search tuning to balance precision and recall on high-grade vs. average-grade batches.',
      'Modular prediction script with real-time parameter inference evaluation.',
    ],
    githubUrl: 'https://github.com/Shaik-Mehfuzh',
    architectureDetails:
      'Data Ingestion -> Missing Value & Outlier Check -> Standard Scaler Normalization -> Train/Test Stratified Split -> Ensemble Classifier -> ROC-AUC & Confusion Matrix Validation.',
    hasInteractiveDemo: true,
  },
  {
    id: 'face-recognition-attendance',
    title: 'Face Recognition Attendance System',
    subtitle: 'Real-Time Edge Computer Vision & Automated Audit Logging',
    category: 'vision',
    categoryLabel: 'Computer Vision',
    status: 'Completed',
    statusColor: 'emerald',
    problem:
      'Traditional classroom and workplace roll calls waste valuable minutes, suffer from manual record errors, and are vulnerable to proxy attendance by peers.',
    solution:
      'Built a frictionless computer vision attendance system that captures live video frames, detects facial boundaries, extracts mathematical facial embeddings, compares Euclidean distances against an authorized registry, and logs timestamps automatically with anti-duplicate cooldown windows.',
    whatIBuilt:
      'An OpenCV and Python video processing pipeline with Haar Cascade / facial landmark localization, high-accuracy embedding matching, and automated CSV/database record synchronization.',
    technologies: ['Python', 'OpenCV', 'Face Recognition Embeddings', 'NumPy', 'SQLite / CSV', 'Computer Vision'],
    metrics: [
      { label: 'Processing Speed', value: '< 180ms / face' },
      { label: 'Anti-Proxy Rate', value: '100% Zero-Proxy' },
      { label: 'Privacy Vector Storage', value: 'Vectors Only (No Raw Images)' },
    ],
    highlights: [
      'Robust lighting and angle normalization to handle real-world room illumination variations.',
      'Anti-duplicate timestamp throttling preventing multi-scan record spam for the same individual.',
      'Privacy-conscious vector storage: raw photos are not permanently stored once 128-d facial embeddings are generated.',
    ],
    githubUrl: 'https://github.com/Shaik-Mehfuzh',
    architectureDetails:
      'Video Stream -> Frame Capture -> Grayscale & Histogram Equalization -> Face Detector -> 128-D Embedding Generator -> Vector Distance Matcher -> Deduplicated Timestamp Logger.',
    hasInteractiveDemo: true,
  },
  {
    id: 'operix-ai',
    title: 'Operix AI — Industrial Copilot',
    subtitle: 'Human-Centered Edge AI for Shopfloor Workers & Ergonomics',
    category: 'ai-ml',
    categoryLabel: 'Industrial AI Concept',
    status: 'Prototype',
    statusColor: 'amber',
    problem:
      'Modern factory automation often surveils or isolates assembly workers rather than empowering them. Shopfloor technicians face repetitive strain injuries, ambiguous maintenance manuals, and zero real-time assistive guidance.',
    solution:
      'Operix AI is a worker-first industrial AI platform combining lightweight edge vision for ergonomic posture assistance with an LLM-powered technical knowledge retrieval assistant that translates complex SOPs into clear, actionable steps.',
    whatIBuilt:
      'Concept architecture and working prototype interface demonstrating real-time ergonomic risk scoring (REBA/RULA principles) and conversational diagnostic troubleshooting for industrial machinery.',
    technologies: ['Python', 'Edge Computer Vision', 'Ergonomic Pose Analysis', 'LLM Integration', 'FastAPI', 'UI Prototyping'],
    metrics: [
      { label: 'Platform Philosophy', value: 'Worker Empowerment' },
      { label: 'Target Latency', value: 'Real-Time On-Device' },
      { label: 'Readiness Stage', value: 'Working Prototype' },
    ],
    highlights: [
      'Designed to assist rather than replace: prioritizes worker safety, joint fatigue reduction, and technician autonomy.',
      'Context-aware machinery diagnosis using indexed operational manuals and fault code trees.',
      'Low-bandwidth edge design capable of running without constant cloud dependency.',
    ],
    githubUrl: 'https://github.com/Shaik-Mehfuzh',
    architectureDetails:
      'Camera Input -> Lightweight Pose Topology -> Ergonomic Joint Angle Vector Calculation -> Alert Daemon + LLM Diagnostic Retrieval Assistant.',
    hasInteractiveDemo: true,
  },
  {
    id: 'factory-telemetry-analytics',
    title: 'Factory Telemetry & Downtime Analytics',
    subtitle: 'Tableau Business Intelligence & Industrial Process Optimization',
    category: 'analytics',
    categoryLabel: 'Data Analytics',
    status: 'Completed',
    statusColor: 'emerald',
    problem:
      'Manufacturing assembly lines generate massive operational logs across shifts. Plant supervisors lacked a centralized visual dashboard to pinpoint micro-stoppages, bottleneck stations, and high scrap rates.',
    solution:
      'Developed an interactive Tableau analytics dashboard fed by Python-cleaned production datasets. Modeled Overall Equipment Effectiveness (OEE), Pareto fault distributions, and shift-over-shift downtime variance.',
    whatIBuilt:
      'Executive and engineering Tableau dashboards integrating Pareto downtime frequency curves, mean time between failures (MTBF), and interactive filtering by line section, operator shift, and defect typology.',
    technologies: ['Tableau', 'Python (Pandas, NumPy)', 'SQL', 'Data Modeling', 'Statistical Process Control'],
    metrics: [
      { label: 'Downtime Drivers Visualized', value: 'Top 5 Faults' },
      { label: 'OEE Visibility', value: 'Availability & Yield' },
      { label: 'Data Cleaning Pipeline', value: 'Automated Python ETL' },
    ],
    highlights: [
      'Pareto 80/20 analysis pinpointed mechanical feed jams as 64% of total line stoppage duration.',
      'Dynamic shift comparison filters enabling managers to identify preventative maintenance intervals.',
      'Streamlined raw CSV/SQL telemetry tables into clean normalized data models.',
    ],
    githubUrl: 'https://github.com/Shaik-Mehfuzh',
    architectureDetails:
      'Raw Machine Logs -> Python ETL Normalization -> Structured SQL Tables -> Tableau Data Source Connection -> Interactive KPI Visualizations.',
    hasInteractiveDemo: true,
  },
  {
    id: 'generative-ai-workflows',
    title: 'Generative AI & LLM Systems',
    subtitle: 'Retrieval Augmented Generation & Structured Knowledge Extraction',
    category: 'gen-ai',
    categoryLabel: 'Generative AI',
    status: 'In Progress',
    statusColor: 'sky',
    problem:
      'Raw LLMs suffer from hallucination and lack grounded domain facts when answering technical questions across academic textbooks and technical documentation.',
    solution:
      'Prototyping modular RAG (Retrieval-Augmented Generation) pipelines utilizing embedding models, vector chunking strategies, and prompt engineering protocols for deterministic, cited technical answers.',
    whatIBuilt:
      'Experimental notebook implementations connecting prompt templates, multi-document chunking, and modern LLM APIs (Gemini & open models) for interactive technical research query answering.',
    technologies: ['Python', 'Gemini API', 'Prompt Engineering', 'Vector Embeddings', 'LangChain Patterns'],
    metrics: [
      { label: 'Grounding Strategy', value: 'Document Chunking' },
      { label: 'Prompt Architecture', value: 'Few-Shot & Chain-of-Thought' },
      { label: 'Focus', value: 'Hallucination Minimization' },
    ],
    highlights: [
      'Experimentation with contextual prompt anchors to prevent hallucinated citations.',
      'Comparison between dense vector similarity and keyword semantic search filters.',
      'Active exploration of multimodal document understanding.',
    ],
    githubUrl: 'https://github.com/Shaik-Mehfuzh',
    architectureDetails:
      'Document Parsing -> Semantic Chunking -> Vector Indexing -> Query Embedding Match -> Synthesizing Grounded Answer.',
    hasInteractiveDemo: false,
  },
];

export const SKILLS: SkillItem[] = [
  // AI & ML
  { id: 'scikit-learn', name: 'Scikit-learn', category: 'AI & Machine Learning', evidence: 'Wine Quality Prediction Pipeline (RF & Gradient Boosting)', highlight: true, relatedProject: 'wine-quality-prediction' },
  { id: 'ml-algorithms', name: 'Supervised & Unsupervised Learning', category: 'AI & Machine Learning', evidence: 'Classification, Regression, Clustering, Decision Trees, Ensembles', highlight: true, relatedProject: 'wine-quality-prediction' },
  { id: 'model-eval', name: 'Model Evaluation & Tuning', category: 'AI & Machine Learning', evidence: 'Cross-Validation, Precision-Recall, F1-Score, ROC-AUC, Grid Search', highlight: false },
  
  // Computer Vision
  { id: 'opencv', name: 'OpenCV', category: 'Computer Vision', evidence: 'Face Recognition Attendance System & Frame Preprocessing', highlight: true, relatedProject: 'face-recognition-attendance' },
  { id: 'face-embeddings', name: 'Facial Landmark & Embeddings', category: 'Computer Vision', evidence: '128-D Euclidean Vector Extraction & Real-time Matching', highlight: true, relatedProject: 'face-recognition-attendance' },
  { id: 'image-processing', name: 'Image Processing & Filtering', category: 'Computer Vision', evidence: 'Grayscale transforms, histogram equalization, edge detection', highlight: false },
  
  // Data Analytics
  { id: 'tableau', name: 'Tableau Desktop', category: 'Data Analytics & Visualization', evidence: 'Factory Telemetry & Downtime Analysis Dashboards', highlight: true, relatedProject: 'factory-telemetry-analytics' },
  { id: 'pandas-numpy', name: 'Pandas & NumPy', category: 'Data Analytics & Visualization', evidence: 'High-volume data wrangling, cleaning, and matrix computation', highlight: true },
  { id: 'data-viz', name: 'Matplotlib & Seaborn', category: 'Data Analytics & Visualization', evidence: 'Correlation heatmaps, distribution plots, and outlier boxplots', highlight: false },
  
  // Languages
  { id: 'python', name: 'Python', category: 'Programming Languages', evidence: 'Primary language for ML, CV, ETL, and backend scripting', highlight: true },
  { id: 'sql', name: 'SQL', category: 'Programming Languages', evidence: 'Relational querying, aggregation, filtering, and data extraction', highlight: false },
  { id: 'c-cpp', name: 'C / C++', category: 'Programming Languages', evidence: 'Core programming foundations, memory management, and data structures', highlight: false },
  { id: 'javascript-ts', name: 'JavaScript & TypeScript', category: 'Programming Languages', evidence: 'Interactive frontend development and typed web applications', highlight: false },
  
  // Software & Web
  { id: 'react', name: 'React & Modern Frontend', category: 'Software Engineering', evidence: 'Component architecture, responsive state management, and modern hooks', highlight: true },
  { id: 'git', name: 'Git & GitHub', category: 'Software Engineering', evidence: 'Version control, branch management, and collaborative development', highlight: false },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Software Engineering', evidence: 'Fluid responsive design systems, liquid glass, and editorial styling', highlight: false },
  
  // Generative AI
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'Generative AI & Tools', evidence: 'Few-shot prompting, chain-of-thought, structured JSON extraction', highlight: true },
  { id: 'gemini-api', name: 'Gemini API & LLM Tooling', category: 'Generative AI & Tools', evidence: 'API orchestration, multimodal understanding, and assistant logic', highlight: true },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'cbit-education',
    year: '2023 — Present',
    title: 'B.Tech in Computer Science & Engineering (AI & ML)',
    organization: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    location: 'Proddatur, Andhra Pradesh',
    type: 'education',
    typeLabel: 'Degree Education',
    description:
      'Pursuing an undergraduate degree focused on Artificial Intelligence, Machine Learning, Deep Neural Networks, Data Structures, and Software Engineering.',
    keyPoints: [
      'Maintained academic excellence with a cumulative CGPA of 8.7 / 10.',
      'Active participant in departmental technical clubs, coding challenges, and hackathon teams.',
      'Coursework: Machine Learning, Artificial Intelligence, Design & Analysis of Algorithms, Database Management Systems, Object Oriented Programming.',
    ],
    tags: ['CGPA: 8.7/10', 'AI & ML Major', 'Undergraduate'],
    status: 'Ongoing',
  },
  {
    id: '3skill-internship',
    year: '2024',
    title: 'Artificial Intelligence & Machine Learning Intern',
    organization: '3Skill',
    type: 'internship',
    typeLabel: 'Practical Internship',
    description:
      'Completed a focused internship working on real-world machine learning workflows, data preprocessing methodologies, algorithm selection, and model validation.',
    keyPoints: [
      'Engineered supervised classification pipelines and performed rigorous exploratory data analysis on real datasets.',
      'Collaborated on computer vision experiments and feature extraction techniques.',
      'Gained practical experience bridging academic theory with deployable production logic.',
    ],
    tags: ['AI/ML Internship', 'Scikit-learn', 'Data Wrangling', 'Model Training'],
    status: 'Completed',
  },
  {
    id: 'hackathon-sih',
    year: '2024',
    title: 'Smart India Hackathon (SIH) & MSME Hackathons',
    organization: 'National Level Innovation Competitions',
    type: 'hackathon',
    typeLabel: 'Hackathon Innovation',
    description:
      'Participated in premier technical hackathons solving problem statements involving industrial automation, societal needs, and intelligent system workflows.',
    keyPoints: [
      'Ideated and presented the Operix AI concept — emphasizing worker safety and ergonomic assistance in factory environments.',
      'Designed technical architecture diagrams, user interaction flows, and pitch presentations under competitive deadlines.',
      'Strengthened cross-functional collaboration and rapid prototyping skills.',
    ],
    tags: ['SIH', 'MSME Hackathon', 'Rapid Prototyping', 'Operix AI'],
    status: 'Completed',
  },
  {
    id: 'certifications',
    year: '2023 — 2025',
    title: 'Technical Credentials & Continuous Learning',
    organization: 'NPTEL, Google & Industry Platforms',
    type: 'certification',
    typeLabel: 'Certifications & Training',
    description:
      'Committed to expanding technical depth through verified coursework in Machine Learning, Generative AI, and Data Analytics.',
    keyPoints: [
      'Coursework credentials in Machine Learning and Algorithm Foundations (NPTEL).',
      'Google-affiliated technical pathways and Generative AI fundamentals.',
      'Tableau Desktop and Data Storytelling training.',
    ],
    tags: ['NPTEL Coursework', 'Generative AI', 'Tableau', 'Google AI Fundamentals'],
    status: 'Completed',
  },
];

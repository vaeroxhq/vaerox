/**
 * Research Assets — canonical registry of datasets, evaluation corpora,
 * annotation pipelines, and benchmark resources the VÆRØX lab has
 * evaluated, prepared, or built pipelines around. Assets are first-class
 * entities and cross-reference research, journal entries, projects,
 * benchmarks, and experiments through the unified graph.
 *
 * Authenticity rule: unknown fields render as "Not Yet Documented."
 * Nothing on this page is fabricated.
 */

export const NYD = "Not Yet Documented.";

export type DatasetCategory =
  | "Medical AI Research"
  | "Agricultural AI Research"
  | "Industrial Vision Research"
  | "Earth Observation Research"
  | "Computer Vision Research"
  | "Lab Research";

export type DatasetTask = string;

export type Dataset = {
  slug: string;
  name: string;
  overview: string;
  domain: string;
  tasks: DatasetTask[];
  source: string;
  purpose: string;
  size?: string;
  annotationTypes: string[];
  workPerformed: string[];
  skills: string[];
  engineeringNotes: string;
  futureWork: string[];
  category: DatasetCategory;
  status: "Reviewed" | "Prepared" | "Instrumented" | "Baselined";
  currentStage: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced" | "Research-grade";
  researchNotes: string[];
  relatedTechnologies: string[];
  relatedPapers: string[];
  updated: string; // ISO
  tags: string[];
  // Cross-references
  researchRefs: string[];   // research slugs
  journalRefs: string[];    // journal slugs
  projectRefs: string[];    // project slugs
  benchmarkRefs: string[];  // benchmark slugs
  experimentRefs: string[]; // reserved
};

export const DATASETS: Dataset[] = [
  {
    slug: "lmod-cataract-1k",
    name: "LMOD-Cataract-1K Surgical Analysis",
    overview:
      "Ophthalmic surgical video corpus used to design a defensible ML challenge around cataract surgery scene understanding — with reproducible splits, honest metrics, and leakage-free grading.",
    domain: "Medical Computer Vision",
    tasks: ["Ophthalmic Surgical Scene Understanding"],
    source: "Hugging Face — LMOD / Cataract-1K corpus",
    purpose:
      "Design a defensible ML challenge around ophthalmic surgical video: reproducible splits, honest evaluation metrics, and leakage-free grading of scene understanding predictions.",
    size: "1,000 annotated cataract surgery clips",
    annotationTypes: [
      "Frame-level class labels",
      "Surgical phase segments",
      "Instrument presence flags",
      "Derived surgical complexity labels",
    ],
    workPerformed: [
      "Image classification exploration",
      "Challenge pipeline design",
      "Derived surgical complexity labels",
      "prepare.py",
      "grade.py",
      "Hidden evaluation pipeline",
      "Macro F1 evaluation",
      "RMSE evaluation",
      "Train/Test split creation",
      "Data leakage mitigation",
    ],
    skills: [
      "Medical Imaging",
      "Computer Vision",
      "Image Classification",
      "Feature Engineering",
      "Challenge Engineering",
      "Evaluation Metrics",
      "Python",
      "PyTorch",
    ],
    engineeringNotes:
      "Grading was intentionally split from preparation so the hidden test set could evolve without leaking targets. Macro F1 was chosen over accuracy to prevent class-imbalance shortcuts; RMSE captures ordinal error on derived complexity labels.",
    futureWork: [
      "Baseline vision-transformer submission against Macro F1",
      "Publish challenge kit (prepare.py + grade.py) as a standalone repo",
    ],
    category: "Medical AI Research",
    status: "Instrumented",
    currentStage: "Challenge pipeline instrumented; awaiting first external baseline.",
    difficulty: "Research-grade",
    researchNotes: [
      "Class imbalance across surgical phases is the dominant failure mode for naïve baselines.",
      "Leakage risk sits in per-patient clip overlap — splits must be patient-disjoint, not clip-disjoint.",
    ],
    relatedTechnologies: ["PyTorch", "Hugging Face Datasets", "NumPy", "scikit-learn"],
    relatedPapers: [NYD],
    updated: "2026-05-18",
    tags: ["Medical", "Video", "Classification", "Challenge"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
  {
    slug: "paddy-disease",
    name: "Paddy Disease Classification",
    overview:
      "Rice leaf disease corpus used to evaluate compact vision baselines for smallholder-scale disease triage and to specify a Macro-F1 challenge that resists class-imbalance shortcuts.",
    domain: "Agricultural AI",
    tasks: ["Rice Leaf Disease Classification"],
    source: "Kaggle — Paddy Doctor",
    purpose:
      "Evaluate a compact vision baseline for smallholder-scale rice disease triage and specify a Macro-F1 challenge that resists class-imbalance shortcuts.",
    size: "~10,400 field images across 10 disease classes",
    annotationTypes: ["Single-label class", "Variety metadata", "Age metadata"],
    workPerformed: [
      "Dataset exploration",
      "Image preprocessing",
      "Data augmentation planning",
      "Challenge workflow",
      "Documentation",
      "Evaluation design",
    ],
    skills: [
      "CNN",
      "Vision Transformers",
      "Agricultural AI",
      "Image Classification",
    ],
    engineeringNotes:
      "Field images vary heavily in lighting and framing; augmentation planning prioritised color-jitter and random-crop over synthetic distortions that break domain realism.",
    futureWork: [
      "Ship a compact ViT baseline with Macro-F1 report",
      "Cross-validate augmentation policy against held-out varieties",
    ],
    category: "Agricultural AI Research",
    status: "Prepared",
    currentStage: "Dataset prepared; challenge workflow specified; baseline pending.",
    difficulty: "Intermediate",
    researchNotes: [
      "Variety metadata is a confound — models can shortcut disease prediction through variety when splits are careless.",
    ],
    relatedTechnologies: ["PyTorch", "timm", "Albumentations"],
    relatedPapers: [NYD],
    updated: "2026-04-11",
    tags: ["Agriculture", "Classification", "Imbalance"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
  {
    slug: "wireseg-36k",
    name: "WireSeg-36K",
    overview:
      "Industrial wire-segmentation corpus reviewed for challenge feasibility — annotation quality, mask fidelity, and depth-consistency across scenes.",
    domain: "Industrial Computer Vision",
    tasks: ["Wire Segmentation", "Depth Estimation"],
    source: "Public industrial vision release",
    purpose:
      "Assess feasibility of a wire-segmentation challenge — annotation quality, mask fidelity, and depth-consistency across scenes.",
    size: "36,000 labeled frames with per-pixel masks",
    annotationTypes: ["Semantic masks (PNG)", "JSON scene metadata", "Depth maps"],
    workPerformed: [
      "Dataset analysis",
      "JSON annotation review",
      "Documentation",
      "Challenge feasibility analysis",
      "Annotation pipeline review",
    ],
    skills: [
      "Semantic Segmentation",
      "Depth Estimation",
      "Dataset Engineering",
      "Annotation Processing",
    ],
    engineeringNotes:
      "Mask fidelity is high on thick wire regions but degrades on sub-pixel strands; any challenge metric must weight boundary IoU or tolerate one-pixel dilations to remain honest.",
    futureWork: [
      "Publish annotation-quality audit",
      "Prototype boundary-aware IoU grader",
    ],
    category: "Industrial Vision Research",
    status: "Reviewed",
    currentStage: "Feasibility review complete; pipeline not yet instrumented.",
    difficulty: "Advanced",
    researchNotes: [
      "Depth maps and semantic masks are not always temporally aligned across the 36K frames — cross-check before training.",
    ],
    relatedTechnologies: ["OpenCV", "PyTorch", "NumPy"],
    relatedPapers: [NYD],
    updated: "2026-03-27",
    tags: ["Industrial", "Segmentation", "Depth"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
  {
    slug: "bigearthnet",
    name: "BigEarthNet",
    overview:
      "Sentinel-2 multi-spectral corpus reviewed for reproducible multi-label land-cover evaluation — with a focus on storage budget and version-parity between v1 and v2.",
    domain: "Remote Sensing",
    tasks: ["Satellite Image Classification", "Multi-label Land Cover"],
    source: "TU Berlin — BigEarthNet v1 / v2",
    purpose:
      "Compare v1 and v2 releases, quantify storage footprint against practical challenge budgets, and select a subset suitable for reproducible multi-label evaluation.",
    size: "~590k Sentinel-2 patches (multi-spectral)",
    annotationTypes: ["Multi-label CLC nomenclature", "Geospatial metadata"],
    workPerformed: [
      "Dataset comparison",
      "Storage analysis",
      "Challenge planning",
      "Version comparison",
    ],
    skills: [
      "Remote Sensing",
      "Large-scale ML",
      "Satellite Vision",
    ],
    engineeringNotes:
      "Full corpus exceeds practical challenge budgets; v2 label revisions shift several minority classes and cannot be used interchangeably with v1 metrics.",
    futureWork: [
      "Select stratified subset with fixed storage budget",
      "Publish v1↔v2 label diff for reproducibility",
    ],
    category: "Earth Observation Research",
    status: "Reviewed",
    currentStage: "Version and storage analysis complete; subset selection pending.",
    difficulty: "Advanced",
    researchNotes: [
      "Multi-label metrics on satellite imagery are sensitive to label prior — mean-average-precision beats Macro-F1 for this corpus.",
    ],
    relatedTechnologies: ["rasterio", "GDAL", "PyTorch"],
    relatedPapers: [NYD],
    updated: "2026-02-19",
    tags: ["Remote Sensing", "Multi-label", "Sentinel-2"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
  {
    slug: "cloth-object-geometry",
    name: "Cloth / Object Geometry Dataset",
    overview:
      "Multi-task computer-vision corpus spanning counting, keypoint detection, and continuous regression — used to prototype a submission format with a DINOv2-based baseline others can honestly beat.",
    domain: "Computer Vision",
    tasks: [
      "Object Counting",
      "Keypoint Detection",
      "Regression",
      "Structured Prediction",
    ],
    source: "Internal challenge corpus",
    purpose:
      "Prototype a multi-task submission format spanning counting, keypoints, and regression — with a DINOv2-based baseline that others can beat honestly.",
    size: "~8k labeled scenes across cloth and rigid objects",
    annotationTypes: [
      "Object counts",
      "2D keypoints",
      "Continuous regression targets",
    ],
    workPerformed: [
      "Baseline prediction pipeline",
      "Submission generation",
      "DINOv2 exploration",
      "Structured prediction",
      "Regression workflow",
    ],
    skills: [
      "Vision Transformers",
      "Keypoint Detection",
      "Regression",
      "Multi-task Learning",
      "Structured Prediction",
    ],
    engineeringNotes:
      "DINOv2 features gave a clean lift on keypoints without task-specific pre-training, but regression heads needed per-task loss balancing to avoid one head dominating gradient signal.",
    futureWork: [
      "Publish multi-task submission schema",
      "Ablate DINOv2-S vs. DINOv2-B on counting head",
    ],
    category: "Computer Vision Research",
    status: "Baselined",
    currentStage: "Baseline shipped; submission schema being generalised.",
    difficulty: "Research-grade",
    researchNotes: [
      "Structured prediction outputs are easier to grade if the submission schema commits to a single tensor layout up-front.",
    ],
    relatedTechnologies: ["PyTorch", "DINOv2", "timm"],
    relatedPapers: [NYD],
    updated: "2026-06-02",
    tags: ["Vision", "Multi-task", "DINOv2", "Baseline"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
];

export const DATASET_CATEGORIES: DatasetCategory[] = [
  "Medical AI Research",
  "Agricultural AI Research",
  "Industrial Vision Research",
  "Earth Observation Research",
  "Computer Vision Research",
  "Lab Research",
];

/**
 * Planned research asset categories. These are deliberately empty and
 * marked "Planned" — no fabricated content lives under them.
 */
export type PlannedCategory = {
  name: string;
  rationale: string;
};

export const PLANNED_CATEGORIES: PlannedCategory[] = [
  { name: "Synthetic Data Generation",         rationale: "Programmatic corpora for controlled ablations." },
  { name: "Reinforcement Learning Datasets",   rationale: "Offline RL traces and evaluation environments." },
  { name: "Financial Time Series",             rationale: "Long-horizon market and macro series." },
  { name: "Retrieval-Augmented Generation",    rationale: "Retrieval corpora and evaluation suites for RAG." },
  { name: "Multi-Agent Evaluation Suites",     rationale: "Structured tasks for agent-vs-agent benchmarking." },
  { name: "Autonomous Driving",                rationale: "Perception, prediction, and planning corpora." },
  { name: "Robotics",                          rationale: "Manipulation and locomotion datasets." },
  { name: "Document Intelligence",             rationale: "OCR, layout, and structured-extraction corpora." },
  { name: "Medical NLP",                       rationale: "Clinical text, coding, and de-identification." },
  { name: "Speech AI",                         rationale: "ASR, diarisation, and paralinguistic corpora." },
];

export function findDataset(slug: string): Dataset | undefined {
  return DATASETS.find((d) => d.slug === slug);
}

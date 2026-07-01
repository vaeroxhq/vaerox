/**
 * Datasets & Research Assets — canonical registry of engineering
 * artifacts the lab has evaluated, prepared, or built pipelines
 * around. Datasets are first-class entities and cross-reference
 * research, journal entries, projects, benchmarks, and experiments
 * through the unified graph.
 */

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
  domain: string;
  tasks: DatasetTask[];
  source: string;
  purpose: string;
  size?: string;
  annotationTypes: string[];
  workPerformed: string[];
  skills: string[];
  category: DatasetCategory;
  status: "Reviewed" | "Prepared" | "Instrumented" | "Baselined";
  updated: string; // ISO
  tags: string[];
  // Cross-references (optional; empty until matching entities exist)
  researchRefs: string[];   // research slugs
  journalRefs: string[];    // journal slugs
  projectRefs: string[];    // project slugs
  benchmarkRefs: string[];  // benchmark slugs
  experimentRefs: string[]; // reserved — no experiment registry yet
};

export const DATASETS: Dataset[] = [
  {
    slug: "lmod-cataract-1k",
    name: "LMOD-Cataract-1K Surgical Analysis",
    domain: "Medical Computer Vision",
    tasks: ["Ophthalmic Surgical Scene Understanding"],
    source: "LMOD / Cataract-1K corpus",
    purpose:
      "Design a defensible ML challenge around ophthalmic surgical video: reproducible splits, honest evaluation metrics, and leakage-free grading of scene understanding predictions.",
    size: "1,000 annotated cataract surgery clips",
    annotationTypes: [
      "Frame-level class labels",
      "Surgical phase segments",
      "Instrument presence flags",
    ],
    workPerformed: [
      "Explored image classification workflows",
      "Designed ML challenge pipelines",
      "Created challenge labels",
      "Built prepare.py",
      "Built grade.py",
      "Evaluated Macro F1",
      "Evaluated RMSE",
      "Created hidden evaluation splits",
      "Addressed data leakage",
      "Designed challenge validation pipeline",
    ],
    skills: [
      "Medical Imaging",
      "Image Classification",
      "Feature Engineering",
      "Dataset Preparation",
      "Evaluation Metrics",
      "Challenge Engineering",
    ],
    category: "Medical AI Research",
    status: "Instrumented",
    updated: "2026-05-18",
    tags: ["Medical", "Video", "Classification", "Challenge"],
    researchRefs: [],
    journalRefs: [],
    projectRefs: [],
    benchmarkRefs: [],
    experimentRefs: [],
  },
  {
    slug: "paddy-disease-classification",
    name: "Paddy Disease Classification",
    domain: "Agricultural AI",
    tasks: ["Rice Leaf Disease Classification"],
    source: "Kaggle — Paddy Doctor",
    purpose:
      "Evaluate a compact vision baseline for smallholder-scale rice disease triage and specify a Macro-F1 challenge that resists class-imbalance shortcuts.",
    size: "~10,400 field images across 10 disease classes",
    annotationTypes: ["Single-label class", "Variety metadata", "Age metadata"],
    workPerformed: [
      "Dataset exploration",
      "Challenge planning",
      "Image preprocessing",
      "Data augmentation",
      "Documentation",
      "Macro F1 evaluation",
    ],
    skills: [
      "CNN",
      "Vision Transformers",
      "Image Classification",
      "Plant Disease Detection",
    ],
    category: "Agricultural AI Research",
    status: "Prepared",
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
    domain: "Industrial Computer Vision",
    tasks: ["Wire Segmentation", "Depth Estimation"],
    source: "Public industrial vision release",
    purpose:
      "Assess feasibility of a wire-segmentation challenge — annotation quality, mask fidelity, and depth-consistency across scenes.",
    size: "36,000 labeled frames with per-pixel masks",
    annotationTypes: ["Semantic masks (PNG)", "JSON scene metadata", "Depth maps"],
    workPerformed: [
      "Dataset review",
      "Annotation analysis",
      "JSON inspection",
      "Dataset documentation",
      "Challenge feasibility",
    ],
    skills: [
      "Semantic Segmentation",
      "Depth Estimation",
      "Dataset Engineering",
      "Annotation Processing",
    ],
    category: "Industrial Vision Research",
    status: "Reviewed",
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
    domain: "Remote Sensing",
    tasks: ["Satellite Image Classification", "Multi-label Land Cover"],
    source: "TU Berlin — BigEarthNet v1 / v2",
    purpose:
      "Compare v1 and v2 releases, quantify storage footprint against practical challenge budgets, and select a subset suitable for reproducible multi-label evaluation.",
    size: "~590k Sentinel-2 patches (multi-spectral)",
    annotationTypes: ["Multi-label CLC nomenclature", "Geospatial metadata"],
    workPerformed: [
      "Dataset evaluation",
      "Version comparison",
      "Storage analysis",
      "Challenge planning",
    ],
    skills: [
      "Remote Sensing",
      "Multi-label Classification",
      "Large Dataset Management",
    ],
    category: "Earth Observation Research",
    status: "Reviewed",
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
    name: "Cloth / Object Geometry Challenge",
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
      "Submission design",
      "Baseline implementation",
      "DINOv2 exploration",
      "Prediction templates",
      "Regression pipeline",
    ],
    skills: [
      "Keypoint Detection",
      "Regression",
      "Vision Transformers",
      "Multi-task Learning",
      "Structured Prediction",
    ],
    category: "Computer Vision Research",
    status: "Baselined",
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

export function findDataset(slug: string): Dataset | undefined {
  return DATASETS.find((d) => d.slug === slug);
}

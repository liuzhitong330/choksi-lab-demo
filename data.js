window.UNIVERSITY_LAB_DEMO_DATA = {
  defaultTarget: "Entry gate",
  stages: [
    { id: "entry", name: "G1/G0-like", subtitle: "precursor", genes: "CCND1 · CDK4/6", x: 90 },
    { id: "amplification", name: "S-like", subtitle: "stages I–II", genes: "CCNE1 · CDK1", x: 235 },
    { id: "maturation", name: "G2/M-like", subtitle: "stages II–III", genes: "CCNB1", x: 380 },
    { id: "terminal", name: "G1/G0-like", subtitle: "stage IV", genes: "mature cilia", x: 525 }
  ],
  targets: {
    "Entry gate": {
      stage: "entry",
      score: 9.4,
      evidence: "causal",
      title: "Does CDK4/6 open the multiciliated-cell fate program before centriole amplification?",
      perturbation: "Time-windowed ribociclib or palbociclib during early ALI differentiation; include matched DMSO and a delayed-inhibitor arm.",
      primary: "MYB and FOXJ1-positive cell fraction, followed by CEP43-positive centriole amplification and acetylated-tubulin-positive cilia.",
      controls: "Nuclear density/viability, non-ciliated epithelial fractions, batch-balanced vehicle controls, and a washout arm.",
      rule: "Advance if early treatment selectively lowers MYB/FOXJ1 and downstream ciliation without a comparable loss of nuclei or other epithelial states.",
      readout: "The published experiments give this plan a strong causal anchor: both CDK4/6 inhibitors reduced multiciliated-cell differentiation, and cyclin D1 overexpression moved the phenotype in the opposite direction.",
      components: { evidence: 3.0, tractability: 2.8, information: 1.8, speed: 1.8 }
    },
    "Replication guardrail": {
      stage: "amplification",
      score: 9.0,
      evidence: "causal",
      title: "Does E2F7 suppress DNA synthesis while preserving the centriole-building program?",
      perturbation: "E2f7 CRISPR knockout with non-targeting guides; add an sgRNA-resistant E2F7 rescue if editing efficiency supports it.",
      primary: "EdU incorporation in FOXJ1-positive cells, paired with replication-gene expression and CEP164/CCP110 or DEUP1 structural staging.",
      controls: "Two independent guides, non-targeting controls, editing QC, cell density, and rescue; score EdU and centriole phenotypes in the same culture batch.",
      rule: "Advance if E2f7 loss raises EdU or replication signatures specifically in the differentiating MCC lineage and rescue restores normal maturation.",
      readout: "This design tests the paper's central guardrail directly and separates aberrant S-like activity from a simple failure to initiate differentiation.",
      components: { evidence: 3.0, tractability: 2.5, information: 2.0, speed: 1.5 }
    },
    "Stage handoff": {
      stage: "amplification",
      score: 7.2,
      evidence: "mixed",
      title: "Is CDK1 relocalization a functional switch between amplification and maturation?",
      perturbation: "Short, stage-restricted CDK1 perturbation after MYB induction, paired with localization-resolved immunofluorescence rather than continuous inhibition.",
      primary: "Nuclear-to-cytoplasmic CDK1 ratio, DEUP1/CEP43/CEP164 staging, and FOXJ1-positive lineage abundance across matched time points.",
      controls: "DMSO, untreated time course, nuclear density, EdU, and a broad toxicity readout to separate a stage switch from essential CDK1 effects.",
      rule: "Prioritize a deeper perturbation only if CDK1 localization predicts a reproducible structural transition before overt cilia formation.",
      readout: "The temporal signal is strong enough for a focused pilot, but the published evidence is more descriptive than the CDK4/6 and E2F7 results; the design therefore begins with localization and timing.",
      components: { evidence: 1.8, tractability: 2.3, information: 1.8, speed: 1.3 }
    },
    "Terminal competence": {
      stage: "maturation",
      score: 6.6,
      evidence: "descriptive",
      title: "Does the cyclin B1-positive window mark a reversible checkpoint for basal-body maturation?",
      perturbation: "Quantitative time course first; perturb only after defining the cyclin B1-positive stage II–III window relative to centriole markers.",
      primary: "Cyclin B1 intensity, centriole number/morphology, CEP164 acquisition, and acetylated-tubulin-positive cilia per cell.",
      controls: "Stage-matched vehicle controls, blinded image scoring, nuclear density, and an entry-stage marker to exclude upstream differentiation delay.",
      rule: "Advance to perturbation if cyclin B1 consistently precedes appendage acquisition or ciliogenesis within single-cell stage trajectories.",
      readout: "Cyclin B1 is reported in stages II–III, but causality is not established. A quantitative staging pass limits risk before committing a primary-culture perturbation.",
      components: { evidence: 1.4, tractability: 2.5, information: 1.5, speed: 1.2 }
    }
  }
};

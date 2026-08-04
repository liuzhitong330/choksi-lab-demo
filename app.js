(function () {
  "use strict";
  const data = window.UNIVERSITY_LAB_DEMO_DATA;
  if (!data) return;

  const names = Object.keys(data.targets);
  const input = document.getElementById("target-select");
  const form = document.getElementById("target-form");
  const datalist = document.getElementById("target-options");
  const suggestions = document.getElementById("suggestions");
  const comparison = document.getElementById("comparison");
  const svg = document.getElementById("hero-viz");
  const readout = document.getElementById("readout");
  const planGrid = document.getElementById("plan-grid");

  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.textContent = name;
    chip.addEventListener("click", () => render(name));
    suggestions.appendChild(chip);
  });

  function svgElement(tag, attributes, text) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    return element;
  }

  function draw(activeStage) {
    svg.replaceChildren();
    svg.appendChild(svgElement("text", { x: 300, y: 30, "text-anchor": "middle", class: "svg-kicker" }, "MULTICILIATION-CYCLE DECISION MAP"));
    svg.appendChild(svgElement("line", { x1: 90, y1: 145, x2: 525, y2: 145, class: "cycle-line" }));
    data.stages.forEach((stage, index) => {
      const isActive = stage.id === activeStage;
      const group = svgElement("g", { class: isActive ? "stage active" : "stage", transform: `translate(${stage.x} 145)` });
      group.appendChild(svgElement("circle", { cx: 0, cy: 0, r: isActive ? 23 : 16 }));
      group.appendChild(svgElement("text", { x: 0, y: 47, "text-anchor": "middle", class: "stage-name" }, stage.name));
      group.appendChild(svgElement("text", { x: 0, y: 66, "text-anchor": "middle", class: "stage-subtitle" }, stage.subtitle));
      group.appendChild(svgElement("text", { x: 0, y: -36, "text-anchor": "middle", class: "stage-gene" }, stage.genes));
      svg.appendChild(group);
      if (index < data.stages.length - 1) {
        svg.appendChild(svgElement("path", { d: `M ${stage.x + 45} 139 l 12 6 -12 6`, class: "cycle-arrow" }));
      }
    });
    const guardrail = svgElement("g", { class: activeStage === "amplification" ? "guardrail active" : "guardrail" });
    guardrail.appendChild(svgElement("path", { d: "M 235 225 C 235 275, 355 275, 355 225", class: "guardrail-path" }));
    guardrail.appendChild(svgElement("text", { x: 295, y: 292, "text-anchor": "middle", class: "guardrail-label" }, "E2F7 limits DNA replication during the S-like program"));
    svg.appendChild(guardrail);
  }

  function planItem(label, value) {
    const item = document.createElement("div");
    item.className = "plan-item";
    const heading = document.createElement("div");
    heading.className = "plan-label";
    heading.textContent = label;
    const body = document.createElement("p");
    body.textContent = value;
    item.append(heading, body);
    return item;
  }

  function render(name) {
    const target = data.targets[name];
    if (!target) {
      readout.textContent = `${name} is not in this demo. Choose one of the suggested decisions.`;
      return;
    }
    input.value = name;
    draw(target.stage);
    readout.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = target.title;
    readout.append(strong, document.createTextNode(` ${target.readout}`));

    planGrid.replaceChildren(
      planItem("Perturbation", target.perturbation),
      planItem("Primary readouts", target.primary),
      planItem("Controls", target.controls),
      planItem("Go / no-go rule", target.rule)
    );
    document.getElementById("metric-three").textContent = target.score.toFixed(1);
    document.getElementById("metric-three-label").textContent = `${name.toLowerCase()} priority / 10`;
    comparison.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.name === name ? "true" : "false");
    });
  }

  names.forEach((name) => {
    const target = data.targets[name];
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.name = name;
    button.setAttribute("aria-pressed", "false");
    const nameCell = document.createElement("span");
    nameCell.textContent = name;
    const track = document.createElement("span");
    track.className = "comparison-track";
    const fill = document.createElement("span");
    fill.className = "comparison-fill";
    fill.style.width = `${target.score * 10}%`;
    track.appendChild(fill);
    const evidence = document.createElement("span");
    evidence.className = `evidence evidence-${target.evidence}`;
    evidence.textContent = target.evidence;
    button.append(nameCell, track, evidence);
    button.addEventListener("click", () => render(name));
    comparison.appendChild(button);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render(input.value.trim());
  });
  input.addEventListener("change", () => render(input.value.trim()));
  render(data.defaultTarget);
}());

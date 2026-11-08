import * as THREE from "three";

/**
 * Creates a high-res dynamic canvas texture for 3D skill cubes and badges
 */
export function createTextBadgeTexture({
  text,
  category = "",
  bgColor = "#1e293b",
  textColor = "#ffffff",
  accentColor = "#38bdf8",
  width = 512,
  height = 512,
}) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 18;
  ctx.strokeRect(9, 9, width - 18, height - 18);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  if (category) {
    ctx.fillStyle = accentColor;
    ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(category.toUpperCase(), width / 2, 90);
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fontSize = text.length > 10 ? 46 : text.length > 7 ? 58 : 72;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;
  ctx.fillText(text, width / 2, height / 2 + (category ? 15 : 0));

  ctx.shadowColor = "transparent";

  ctx.fillStyle = accentColor;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(width / 2 + (i - 2) * 24, height - 60, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Creates high-res billboard texture with title, subtitle, and badges
 */
export function createBillboardTexture({
  title,
  subtitle,
  tag,
  accentColor = "#06b6d4",
  width = 1024,
  height = 512,
}) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#0b1120");
  grad.addColorStop(1, "#030712");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  if (tag) {
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.roundRect(50, 45, 300, 50, 25);
    ctx.fill();

    ctx.fillStyle = "#030712";
    ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(tag.toUpperCase(), 200, 78);
  }

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.font = "bold 64px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(title, 55, 175);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "normal 32px -apple-system, BlinkMacSystemFont, sans-serif";
  const words = subtitle.split(" ");
  let line = "";
  let y = 235;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > width - 120 && n > 0) {
      ctx.fillText(line, 55, y);
      line = words[n] + " ";
      y += 42;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 55, y);

  ctx.fillStyle = accentColor;
  ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("▶ DRIVE CLOSER TO INSPECT", 55, height - 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Creates Smash Karts style arena ground texture:
 * Asphalt track, red & white rumble curbs, checkered start grid, and racing lines!
 */
export function createFloorTexture() {
  if (typeof document === "undefined") return null;

  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Rich asphalt track surface
  ctx.fillStyle = "#0a0f1d";
  ctx.fillRect(0, 0, size, size);

  // Subtle hexagonal grid texture
  ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
  ctx.lineWidth = 2;
  const step = 64;
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, x);
    ctx.lineTo(size, x);
    ctx.stroke();
  }

  // Neon track dots at intersections
  ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
  for (let x = 0; x <= size; x += step) {
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Smash Karts Racing Border Curbs (Alternating Red and White rumble strips)
  const curbThick = 28;
  const segmentLen = 48;

  const drawRumbleEdge = (x1, y1, x2, y2, isHoriz) => {
    const len = isHoriz ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
    const count = Math.ceil(len / segmentLen);

    for (let i = 0; i < count; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#ef4444" : "#ffffff";
      if (isHoriz) {
        ctx.fillRect(x1 + i * segmentLen, y1, segmentLen, curbThick);
      } else {
        ctx.fillRect(x1, y1 + i * segmentLen, curbThick, segmentLen);
      }
    }
  };

  // Outer track rumble strips
  drawRumbleEdge(0, 0, size, 0, true);
  drawRumbleEdge(0, size - curbThick, size, size - curbThick, true);
  drawRumbleEdge(0, 0, 0, size, false);
  drawRumbleEdge(size - curbThick, 0, size - curbThick, size, false);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Creates Smash Karts style Checkered Finish/Start line
 */
export function createCheckeredTexture() {
  if (typeof document === "undefined") return null;

  const width = 512;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const sq = 32;
  for (let x = 0; x < width; x += sq) {
    for (let y = 0; y < height; y += sq) {
      ctx.fillStyle = (x / sq + y / sq) % 2 === 0 ? "#ffffff" : "#0f172a";
      ctx.fillRect(x, y, sq, sq);
    }
  }

  // Fluorescent yellow border
  ctx.strokeStyle = "#facc15";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Smash Karts style Mystery Box / Power-Up Cube Texture ("?")
 */
export function createMysteryBoxTexture() {
  if (typeof document === "undefined") return null;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Golden glow gradient
  const grad = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "#fde047");
  grad.addColorStop(0.7, "#eab308");
  grad.addColorStop(1, "#ca8a04");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Border & rivets
  ctx.strokeStyle = "#854d0e";
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, size - 12, size - 12);

  // Corner rivets
  ctx.fillStyle = "#422006";
  [22, size - 22].forEach((x) => {
    [22, size - 22].forEach((y) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Center Question Mark
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 130px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 8;
  ctx.fillText("?", size / 2, size / 2 + 6);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 3D Docker Shipping Container Texture
 */
export function createDockerContainerTexture() {
  if (typeof document === "undefined") return null;

  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Docker Royal Blue base
  ctx.fillStyle = "#0284c7";
  ctx.fillRect(0, 0, width, height);

  // Corrugated steel vertical ribs
  const ribWidth = 32;
  for (let x = 0; x < width; x += ribWidth) {
    ctx.fillStyle = x % (ribWidth * 2) === 0 ? "rgba(0, 0, 0, 0.22)" : "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(x, 0, ribWidth, height);
  }

  // Steel container frame
  ctx.strokeStyle = "#0369a1";
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Docker Emblem & Text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 76px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🐳 DOCKER & K8S CLOUD", width / 2, 180);

  ctx.fillStyle = "#e0f2fe";
  ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("CONTAINER ORCHESTRATION & CI/CD PIPELINE", width / 2, 260);

  ctx.fillStyle = "#fef08a";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("MULTI-STAGE BUILDS • K8S PODS & SERVICES • GITHUB ACTIONS", width / 2, 340);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

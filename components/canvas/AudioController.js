// Web Audio API Synthesizer for Bruno Simon style portfolio
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.engineGain = null;
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineRunning = false;
    this.lastCrashTime = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  unlock() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    if (!this.engineRunning && !this.isMuted) {
      this.startEngine();
    }
  }

  setMute(mute) {
    this.isMuted = mute;
    if (this.isMuted) {
      this.stopEngine();
    } else {
      this.unlock();
      this.startEngine();
    }
  }

  startEngine() {
    if (!this.ctx || this.engineRunning || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.04, now);

      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc1.type = "sawtooth";
      this.engineOsc1.frequency.setValueAtTime(45, now);

      this.engineOsc2 = this.ctx.createOscillator();
      this.engineOsc2.type = "triangle";
      this.engineOsc2.frequency.setValueAtTime(90, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(260, now);

      this.engineOsc1.connect(filter);
      this.engineOsc2.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc1.start();
      this.engineOsc2.start();
      this.engineRunning = true;
    } catch (e) {
      console.warn("Error starting engine sound:", e);
    }
  }

  stopEngine() {
    if (!this.engineRunning) return;
    try {
      if (this.engineOsc1) {
        this.engineOsc1.stop();
        this.engineOsc1.disconnect();
      }
      if (this.engineOsc2) {
        this.engineOsc2.stop();
        this.engineOsc2.disconnect();
      }
      if (this.engineGain) {
        this.engineGain.disconnect();
      }
    } catch (e) {}
    this.engineRunning = false;
  }

  updateEngine(speedNorm, isAccelerating) {
    if (!this.ctx || !this.engineRunning || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const baseFreq = 42 + speedNorm * 85 + (isAccelerating ? 25 : 0);
      this.engineOsc1.frequency.setTargetAtTime(baseFreq, now, 0.08);
      this.engineOsc2.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.08);

      const vol = 0.02 + speedNorm * 0.04 + (isAccelerating ? 0.02 : 0);
      this.engineGain.gain.setTargetAtTime(vol, now, 0.1);
    } catch (e) {}
  }

  playHorn() {
    if (!this.ctx || this.isMuted) return;
    this.unlock();

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(392, now); // G4
      osc2.frequency.setValueAtTime(523.25, now); // C5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.36);
      osc2.stop(now + 0.36);
    } catch (e) {}
  }

  playCrash(intensity = 1) {
    if (!this.ctx || this.isMuted) return;
    const now = Date.now();
    if (now - this.lastCrashTime < 120) return; // Debounce
    this.lastCrashTime = now;

    try {
      const audioNow = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "square";
      osc.frequency.setValueAtTime(110, audioNow);
      osc.frequency.exponentialRampToValueAtTime(30, audioNow + 0.18);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, audioNow);

      const volume = Math.min(0.12, 0.03 * intensity);
      gain.gain.setValueAtTime(volume, audioNow);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioNow + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(audioNow);
      osc.stop(audioNow + 0.22);
    } catch (e) {}
  }

  playZoneChime() {
    if (!this.ctx || this.isMuted) return;
    this.unlock();

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.07;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.06, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.32);
      });
    } catch (e) {}
  }
}

export const soundManager = typeof window !== "undefined" ? new SoundSystem() : null;

"use client";

import { createElement, useEffect, useRef, useState } from "react";

import heartModel from "@/assets/heart.glb";
import { Heart } from "./Heart";

const MODEL_VIEWER_SCRIPT =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";

function loadModelViewer() {
  if (customElements.get("model-viewer")) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-model-viewer="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SCRIPT;
    script.dataset.modelViewer = "true";
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

interface HeartModel3DProps {
  className?: string;
  src?: string;
  fallbackSize?: number;
  autoRotate?: boolean;
  rotationPerSecond?: string;
}

export function HeartModel3D({
  className = "",
  src = heartModel,
  fallbackSize = 72,
  autoRotate = false,
  rotationPerSecond = "45deg",
}: HeartModel3DProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadModelViewer()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !ready) return;

    const onError = () => setFailed(true);
    viewer.addEventListener("error", onError);
    return () => viewer.removeEventListener("error", onError);
  }, [ready]);

  if (failed || !ready) {
    return <Heart size={fallbackSize} className="h-full w-full !animate-none" />;
  }

  return createElement("model-viewer", {
    ref: viewerRef,
    className: `heart-model-3d h-full w-full ${className}`.trim(),
    src,
    alt: "Сердце",
    ...(autoRotate
      ? { "auto-rotate": "", "rotation-per-second": rotationPerSecond }
      : {}),
    "interaction-prompt": "none",
    "touch-action": "pan-y",
    exposure: "1",
    "shadow-intensity": "0",
  });
}

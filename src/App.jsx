import React from 'react'
import { useState,Suspense,useEffect,useCallback,useLayoutEffect,lazy } from 'react'
import { Canvas,useThree,useFrame,useLoader } from '@react-three/fiber';
import { Preload , useTextures, Text,PerformanceMonitor} from '@react-three/drei';
import * as THREE from "three";
import posthog from "posthog-js";
// import "./style/main.scss";


posthog.init(import.meta.env.VITE_POSTHOG_KEY,{
  api_host : import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: "identify_only",
} )


import { TextureLoader} from "three";

const preloaderBrowserImage = (path) => {
   if(typeof window === "undefined") return;
   const img = new Image();
   img.src = path;
}

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
const isWeakCPU = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency <= 4;
const isLowRAM = typeof navigator.deviceMemory !== 'undefined' && navigator.deviceMemory <= 4;
const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 450;
const isLowEnd = isMobileDevice || isWeakCPU || isLowRAM || isSmallScreen;
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;


const App = () => {
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}

export default App

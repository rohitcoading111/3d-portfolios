import React from 'react'
import { useState,Suspense,useEffect,useCallback,useLayoutEffect,lazy } from 'react'
import { Canvas,useThree,useFrame,useLoader } from '@react-three/fiber';
import { Preload , useTextures, Text,PerformanceMonitor, usePerformanceMonitor} from '@react-three/drei';
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


if(isLowEnd){
  const CORE_TEXTURE = [...ENTRANCE_TEXTURES, ...CORRIDOR_TEXTURES, ...UI_TEXTURES, ...IMAGE_ASSESTS];
  const filteredCore = filterTexturesByDevice(CORE_TEXTURE,supportsHover);
  const filteredAbout = filterTexturesByDevice(ABOUT_TEXTURES,supportsHover);


  filteredCore.forEach(path => useTexture.preload(path));
  filteredAbout.forEach(path => useLoader.preload(TextureLoader, path));
} else {
    const filteredALL = filterTexturesByDevice(PRELOAD_ALL,supportsHover);
    const filteredLoader = filterTexturesByDevice(PRELOAD_LOADER,supportsHover);

    filteredALL.forEach(path => useTexture.preload(path));
    filteredLoader.forEach(path => useLoader.preload(TextureLoader, path));
}

const FONT_URL = "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2bKodukmMEVuLyfAZ9hjp-Ek-_EeA.woff";

const GlobalAudioEnabler = () => {
  const { enableAudio} = useAudio();
  useEffect(()=>{
     const handleUserInteraction = () => enableAudio();
     window.addEventListener('click', handleUserInteraction, { once: true });
     window.addEventListener('touchstart', handleUserInteraction, { once: true }); 
     window.addEventListener('keydown', handleUserInteraction, { once: true }); 
     return () => {
          window.removeEventListener('click', handleUserInteraction);
          window.removeEventListener('touchstart', handleUserInteraction); 
          window.removeEventListener('keydown', handleUserInteraction); 
     }
  },[enableAudio]);
  return null;
}

const PaperSceneBackground = () => {
  const { scene } = useThree();
  const texture = useTexture("/textures/paper-texture.webp");
  useeffect(()=>{
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;

    return()=>{
      scene.background = null;
    }
  },[scene,texture])
  return null;
}

function DocumentMwtaBridge() {
   useDocumentMeta();
   const { initialRoom, deeplinkHandle, hasEntered, teleportTo,markEntered } = useScene();
   useeffect(()=> {
    if(initialRoom && hasEntered && !deeplinkHandle.current){
       deeplinkHandle.current = true;
       setTimeout(()=>{
          teleportTo(initialRoom);
          markEntered();
       },300);
    }
   },[initialRoom,hasEntered,teleportTo,deeplinkHandle])
}


function AppContent(){
   const [isLoaded, setIsLoaded] = useState(false);
   const [sceneReady, setsceneReady] = useState(false);


   const {settings,downgradeTier, tier} = usePerformanceMonitor();

   useeffect(()=> {
     initAudio();
   },[]);

   const handleSceneReady = useCallback(()=> {
     requestAnimationFrame(()=> {
       setsceneReady(true);
     })
   },[]);

   return(
    <>
    </>
   )
}

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CosmicBackdrop from "./components/CosmicBackdrop";
import MusicButton from "./components/MusicButton";
import CinematicOpenTransition from "./components/CinematicOpenTransition";
import IntroScene from "./components/IntroScene";
import PhotoScene from "./components/PhotoScene";
import GreetingScene from "./components/GreetingScene";
import LetterScene from "./components/LetterScene";
import GalleryScene from "./components/GalleryScene";
import FinaleScene from "./components/FinaleScene";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { MEDIA } from "./data/content";

type Scene = "intro" | "photo" | "greeting" | "letter" | "gallery" | "finale";

const sceneVariants = {
  initial: { opacity: 0, scale: 1.02, filter: "blur(10px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
};

export default function App() {
  const [scene, setScene] = useState<Scene>("intro");
  const [burst, setBurst] = useState(false);
  const music = useBackgroundMusic(MEDIA.music);

  const handleOpenGift = useCallback(() => {
    void music.tryPlay();
    setBurst(true);
    setTimeout(() => setScene("photo"), 750);
    setTimeout(() => setBurst(false), 1900);
  }, [music]);

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full text-[#f5f0ff]">
      <CosmicBackdrop />

      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.div
            key="intro"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <IntroScene onOpen={handleOpenGift} />
          </motion.div>
        )}

        {scene === "photo" && (
          <motion.div
            key="photo"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhotoScene onContinue={() => setScene("greeting")} />
          </motion.div>
        )}

        {scene === "greeting" && (
          <motion.div
            key="greeting"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <GreetingScene onContinue={() => setScene("letter")} />
          </motion.div>
        )}

        {scene === "letter" && (
          <motion.div
            key="letter"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <LetterScene onContinue={() => setScene("gallery")} />
          </motion.div>
        )}

        {scene === "gallery" && (
          <motion.div
            key="gallery"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <GalleryScene onContinue={() => setScene("finale")} />
          </motion.div>
        )}

        {scene === "finale" && (
          <motion.div
            key="finale"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <FinaleScene
              onReplay={() => setScene("intro")}
              onReopenLetter={() => setScene("letter")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{burst && <CinematicOpenTransition />}</AnimatePresence>

      {scene !== "intro" && (
        <MusicButton isPlaying={music.isPlaying} blocked={music.blocked} onToggle={music.toggle} />
      )}
    </div>
  );
}

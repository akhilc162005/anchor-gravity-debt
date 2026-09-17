import HeroSequence from "@/components/HeroSequence";
import CircularAbilitiesGallery from "@/components/ui/circular-abilities-gallery";
import OriginStory from "@/components/OriginStory";

import CommunicationCenter from "@/components/CommunicationCenter";

export default function Home() {
  return (
    <>
      <HeroSequence />
      <CircularAbilitiesGallery />
      <OriginStory />
      <CommunicationCenter />
    </>
  );
}

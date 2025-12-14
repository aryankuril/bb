import ZoomParallax from "@/app/components/ZoomParallax";
import AutoDragImageCubetest from "../components/test/AutoDragImageCubetest";

export default function Page() {
  return (
    <>
      <ZoomParallax />

      <AutoDragImageCubetest
        size={350}
        autoRotate={true}
        rotationSpeed={20}
        frontImage="/images/teams/team1.webp"
        backImage="/images/teams/team2.webp"
        rightImage="/images/teams/team5.webp"
        leftImage="/images/teams/team8.jpg"
        topImage="/images/teams/team8.jpg"
        bottomImage="/images/teams/team10.jpg"
      />
    </>
  );
}

// import { useEffect, useState } from "react";
// import { Dimensions } from "react-native";

// type OrientationType = "PORTRAIT" | "LANDSCAPE";

// export function useOrientation() {
//   const [orientation, setOrientation] = useState<OrientationType>("PORTRAIT");

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener(
//       "change",
//       ({ window: { width, height } }) => {
//         if (width < height) {
//           setOrientation("PORTRAIT");
//         } else {
//           setOrientation("LANDSCAPE");
//         }
//       }
//     );
//     return () => subscription?.remove();
//   }, []);

//   return orientation;
// }

// useOrientation.tsx
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT' or 'LANDSCAPE'
 */
export function useOrientation(): "PORTRAIT" | "LANDSCAPE" {
  // State to hold the connection status
  const [orientation, setOrientation] = useState<"PORTRAIT" | "LANDSCAPE">(
    isPortrait() ? "PORTRAIT" : "LANDSCAPE"
  );

  const callback = () =>
    setOrientation(isPortrait() ? "PORTRAIT" : "LANDSCAPE");
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", callback);
    return () => {
      sub.remove();
    };
  }, []);

  return orientation;
}

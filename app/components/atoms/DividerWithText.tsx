// import React from "react";

// const DividerWithText = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.line} />
//       <span style={styles.text}>or</span>
//       <div style={styles.line} />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     alignItems: "center",
//     // alignContent: "center",
//     width: "100%",
//   },
//   line: {
//     flex: 1,
//     height: "1px",
//     backgroundColor: "#000",
//   },
//   text: {
//     margin: "0 10px", // Space around the text
//     lineHeight: "1", // Ensure the text line height doesn't push it down
//     display: "flex",
//     alignItems: "center", // Center the text within the span
//   },
// };

// export default DividerWithText;
import React from "react";

const DividerWithText = () => {
  return (
    <div className="flex items-center w-full my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <div className="flex-shrink-0 mx-4 flex items-center">
        <span className="text-gray-500 leading-none">or</span>
      </div>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};
export default DividerWithText;

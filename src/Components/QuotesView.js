import React from "react";

export default props => {
  const styles = {
    container: {
      minHeight: "85vh"
    }
  };

  return (
    <div style={styles.container}>
      <p>This is where all the quotes will be displayed!</p>
    </div>
  );
};

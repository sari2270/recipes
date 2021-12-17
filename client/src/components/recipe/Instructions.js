const Instructions = ({ instructions }) => {
  return (
    <>
      <hr />
      <h3>Instructions</h3>
      <hr />
      <ol>
        {instructions.map(({ instruction }, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </>
  );
};

export default Instructions;

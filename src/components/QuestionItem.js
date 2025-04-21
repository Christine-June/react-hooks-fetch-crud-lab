import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleChange = (e) => {
    onUpdate(id, parseInt(e.target.value));
  };

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}

export default QuestionItem;

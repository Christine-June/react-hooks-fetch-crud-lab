import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (e, index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = e.target.value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...formData,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => onAddQuestion(data));
  };

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
          />
        </label>
        {formData.answers.map((ans, i) => (
          <label key={i}>
            Answer {i + 1}:
            <input type="text" value={ans} onChange={(e) => handleChange(e, i)} />
          </label>
        ))}
        <label htmlFor="correctIndex">
          Correct Answer Index:
          <select
            id="correctIndex"
            value={formData.correctIndex}
            onChange={(e) =>
              setFormData({ ...formData, correctIndex: parseInt(e.target.value) })
            }
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
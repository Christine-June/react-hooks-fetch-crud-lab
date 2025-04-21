import React from "react";

function QuestionList({ questions, onDelete, onUpdate }) {
  const handleSelectChange = (id, e) => {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then(() => onUpdate(id, newIndex));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDelete(id));
  };

  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h4>{q.prompt}</h4>
            <ul>
              {q.answers.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={q.correctIndex}
                onChange={(e) => handleSelectChange(q.id, e)}
              >
                {q.answers.map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
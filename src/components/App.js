import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateCorrectAnswer = (id, newCorrectIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctIndex: newCorrectIndex } : q
      )
    );
  };

  return (
    <main>
      <AdminNavBar />
      <button onClick={() => setShowQuestions((s) => !s)}>
        {showQuestions ? "Hide Questions" : "View Questions"}
      </button>
      <QuestionForm onAddQuestion={addQuestion} />
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
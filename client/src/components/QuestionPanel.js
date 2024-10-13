import React, { useState } from 'react';
import { Input, Button, Form, Slider } from 'antd';
import axios from 'axios';

function QuestionPanel({ chapterId }) {
  const [question, setQuestion] = useState('');
  const [gradeLevel, setGradeLevel] = useState(7); // Default grade level
  const [answer, setAnswer] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  // Handle form submission
  function handleSubmit() {
    axios
      .post(`${API_URL}/question`, { chapterId: chapterId, question: question, gradeLevel: gradeLevel })
      .then(function (response) {
        setAnswer(response.data.answer);
      })
      .catch(function (error) {
        console.error('Error fetching answer:', error);
      });
  }

  return (
    <div>
      <Form>
        <Form.Item>
          <Input.TextArea
            placeholder="Enter your question"
            value={question}
            onChange={function (e) {
              setQuestion(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label={`Grade Level: ${gradeLevel}`}>
          {/* Grade Level Slider */}
          <Slider
            min={1}
            max={12}
            value={gradeLevel}
            onChange={setGradeLevel}
            tooltipVisible
            marks={{ 1: '1st', 6: '6th', 12: '12th' }}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Form>
      <div style={{ marginTop: '20px' }}>
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default QuestionPanel;

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL;

function SubjectDropdown({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(function () {
    axios.get(`${API_URL}/subjects`).then(function (response) {
      setSubjects(response.data);
    });
  }, []);

  return React.createElement(
    Select,
    {
      placeholder: 'Select a subject',
      style: { width: '100%' },
      onChange: onSelectSubject,
    },
    subjects.map(function (subject) {
      return React.createElement(
        Option,
        { key: subject._id, value: subject._id },
        subject.name
      );
    })
  );
}

export default SubjectDropdown;

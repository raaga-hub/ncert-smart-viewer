import React, { useState } from 'react';
import { Layout } from 'antd';
import SubjectDropdown from './components/SubjectDropdown';
import ChapterList from './components/ChapterList';
import PdfViewer from './components/PdfViewer';
import QuestionPanel from './components/QuestionPanel';

const { Sider, Content } = Layout;

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  return React.createElement(
    Layout,
    { style: { height: '100vh' } },
    React.createElement(
      Sider,
      { width: 300, style: { backgroundColor: '#fff' } },
      React.createElement(SubjectDropdown, { onSelectSubject: setSelectedSubject }),
      selectedSubject && React.createElement(ChapterList, { subjectId: selectedSubject, onChapterClick: setSelectedChapter })
    ),
    React.createElement(
      Content,
      { style: { padding: '0 24px' } },
      selectedChapter && React.createElement(PdfViewer, { chapterId: selectedChapter })
    ),
    React.createElement(
      Sider,
      { width: 400, style: { backgroundColor: '#fff' } },
      selectedChapter && React.createElement(QuestionPanel, { chapterId: selectedChapter })
    )
  );
}

export default App;

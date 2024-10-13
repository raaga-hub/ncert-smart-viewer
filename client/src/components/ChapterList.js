import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import axios from 'axios';

function ChapterList({ subjectId, onChapterClick }) {
  const [chapters, setChapters] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(function () {
    if (subjectId) {
      axios.get(`${API_URL}/chapters/${subjectId}`).then(function (response) {
        setChapters(response.data);
      });
    }
  }, [subjectId]);

  return React.createElement(
    List,
    {
      size: 'large',
      bordered: true,
      dataSource: chapters,
      renderItem: function (item) {
        return React.createElement(
          List.Item,
          { onClick: function () { onChapterClick(item._id); } },
          item.name
        );
      },
    }
  );
}

export default ChapterList;

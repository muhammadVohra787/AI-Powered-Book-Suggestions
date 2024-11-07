import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';

const SearchHistoryShow = ({ list }) => {
  const [currentList, setList] = useState([]);

  useEffect(() => {
    setList(list);
  }, [list]);

  const deleteItem = (index) => {
    setList((prevList) => prevList.filter((item) => item.index !== index));
  };

  return (
    <>
      {currentList.length === 0 ? (
        <Typography variant="h6">No history available</Typography>
      ) : (
        currentList.map((item) => (
          <div key={item.index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <IconButton onClick={() => deleteItem(item.index)} style={{ margin: 0, padding: 0 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" style={{ marginLeft: '8px', lineHeight: '1.2' }}>
              {item.term}
            </Typography>
          </div>
        ))
      )}
    </>
  );
};

export default SearchHistoryShow;

import React, { useState } from 'react';

const FileInput = () => {
  const [fileName, setFileName] = useState('No file selected');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'No file selected');
  };

  return (
    <div
      style={{
        display: 'inline-block',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Custom File Input Button */}
      <label
        style={{
          display: 'block',
          padding: '10px 20px',
          backgroundColor: '#006A67',
          color: '#fff',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = '#006A67')
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = '#006A67')
        }
      >
        Upload file
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '1px',
            height: '1px',
          }}
        />
      </label>

      {/* Display Selected File Name */}
      <p
        style={{
          marginTop: '10px',
          fontSize: '14px',
          color: '#333',
        }}
      >
        {fileName}
      </p>
    </div>
  );
};

export default FileInput;

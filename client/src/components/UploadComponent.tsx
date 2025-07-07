import React, { useState, ChangeEvent, FormEvent } from 'react'

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Selecione um arquivo primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage('Erro: ' + errorText);
        return;
      }

      const data = await response.json();
      setMessage('Upload realizado com sucesso! Conteúdo do JSON: ' + JSON.stringify(data));
    } catch (error) {
      setMessage('Erro ao enviar arquivo: ' + error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UploadComponent
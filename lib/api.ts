import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  views: string;
  status: 'Published' | 'Draft';
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDocuments = async (category?: string, query?: string) => {
  const params: any = {};
  if (category && category !== '全部文档') params.category = category;
  if (query) params.q = query;
  
  const response = await api.get<Document[]>('/documents', { params });
  return response.data;
};

export const getDocument = async (id: number) => {
  const response = await api.get<Document>(`/documents/${id}`);
  return response.data;
};

export const createDocument = async (doc: Omit<Document, 'id'>) => {
  const response = await api.post<Document>('/documents', doc);
  return response.data;
};

export const updateDocument = async (id: number, doc: Partial<Document>) => {
  const response = await api.put<Document>(`/documents/${id}`, doc);
  return response.data;
};

export const deleteDocument = async (id: number) => {
  await api.delete(`/documents/${id}`);
};

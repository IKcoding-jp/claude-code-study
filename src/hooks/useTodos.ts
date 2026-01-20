import { useState, useEffect } from 'react';
import { Todo, Priority } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

// UUID生成のシンプルな実装
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初回マウント時にlocalStorageからデータを読み込む
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  // todosが変更されるたびにlocalStorageに保存
  useEffect(() => {
    if (todos.length > 0 || loadTodos().length > 0) {
      saveTodos(todos);
    }
  }, [todos]);

  const addTodo = (
    title: string,
    description?: string,
    priority: Priority = 'medium',
    dueDate?: string,
    category?: string,
    tags: string[] = []
  ): void => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      category,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const getCategories = (): string[] => {
    const categories = todos
      .map((todo) => todo.category)
      .filter((category): category is string => !!category);
    return Array.from(new Set(categories));
  };

  const getAllTags = (): string[] => {
    const tags = todos.flatMap((todo) => todo.tags);
    return Array.from(new Set(tags));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getCategories,
    getAllTags,
  };
};

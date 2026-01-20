import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export const loadTodos = (): Todo[] => {
  try {
    const todosJson = localStorage.getItem(STORAGE_KEY);
    if (!todosJson) {
      return [];
    }
    return JSON.parse(todosJson) as Todo[];
  } catch (error) {
    console.error('TODOの読み込みに失敗しました:', error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    const todosJson = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, todosJson);
  } catch (error) {
    console.error('TODOの保存に失敗しました:', error);
    // localStorage のクォータ制限エラーの場合
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('ストレージ容量が不足しています。不要なTODOを削除してください。');
    }
  }
};

export const clearTodos = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('TODOのクリアに失敗しました:', error);
  }
};

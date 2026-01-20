import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import { Todo, Priority, SortBy, SortOrder } from './types/todo';
import styles from './App.module.css';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, getCategories, getAllTags } =
    useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | ''>('');
  const [selectedCompleted, setSelectedCompleted] = useState<'all' | 'completed' | 'active'>(
    'all'
  );
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleAddTodo = (
    title: string,
    description?: string,
    priority?: Priority,
    dueDate?: string,
    category?: string,
    tags?: string[]
  ) => {
    addTodo(title, description, priority, dueDate, category, tags);
  };

  const handleUpdateTodo = (
    title: string,
    description?: string,
    priority?: Priority,
    dueDate?: string,
    category?: string,
    tags?: string[]
  ) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, {
        title,
        description,
        priority,
        dueDate,
        category,
        tags: tags || [],
      });
      setEditingTodo(undefined);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(undefined);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedPriority('');
    setSelectedCompleted('all');
    setSelectedTag('');
  };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = [...todos];

    // フィルタリング
    if (selectedCategory) {
      filtered = filtered.filter((todo) => todo.category === selectedCategory);
    }

    if (selectedPriority) {
      filtered = filtered.filter((todo) => todo.priority === selectedPriority);
    }

    if (selectedCompleted === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (selectedCompleted === 'active') {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    if (selectedTag) {
      filtered = filtered.filter((todo) => todo.tags.includes(selectedTag));
    }

    // ソート
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'dueDate':
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          compareValue = dateA - dateB;
          break;

        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          compareValue = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;

        case 'createdAt':
          compareValue =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;

        case 'updatedAt':
          compareValue =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [todos, selectedCategory, selectedPriority, selectedCompleted, selectedTag, sortBy, sortOrder]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.appTitle}>TODO アプリ</h1>
        <p className={styles.appSubtitle}>タスクを効率的に管理しましょう</p>
      </header>

      <main className={styles.main}>
        <TodoForm
          onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
          editingTodo={editingTodo}
          onCancel={editingTodo ? handleCancelEdit : undefined}
        />

        <FilterBar
          categories={getCategories()}
          allTags={getAllTags()}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
          selectedCompleted={selectedCompleted}
          selectedTag={selectedTag}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onCategoryChange={setSelectedCategory}
          onPriorityChange={setSelectedPriority}
          onCompletedChange={setSelectedCompleted}
          onTagChange={setSelectedTag}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <div className={styles.stats}>
          <span>
            全体: {todos.length}件 | 完了: {todos.filter((t) => t.completed).length}件 |
            未完了: {todos.filter((t) => !t.completed).length}件
          </span>
          {filteredAndSortedTodos.length !== todos.length && (
            <span className={styles.filterInfo}>
              （フィルター結果: {filteredAndSortedTodos.length}件）
            </span>
          )}
        </div>

        <TodoList
          todos={filteredAndSortedTodos}
          onToggle={toggleTodo}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}

export default App;

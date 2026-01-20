export interface Todo {
  id: string;                    // UUID
  title: string;                 // タスクのタイトル
  description?: string;          // 詳細説明（オプション）
  completed: boolean;            // 完了状態
  priority: 'low' | 'medium' | 'high';  // 優先度
  dueDate?: string;              // 期限（ISO 8601形式）
  category?: string;             // カテゴリ
  tags: string[];                // タグ配列
  createdAt: string;             // 作成日時
  updatedAt: string;             // 更新日時
}

export type Priority = 'low' | 'medium' | 'high';

export interface FilterOptions {
  category?: string;
  priority?: Priority;
  completed?: boolean;
  tag?: string;
}

export type SortBy = 'dueDate' | 'priority' | 'createdAt' | 'updatedAt';

export type SortOrder = 'asc' | 'desc';

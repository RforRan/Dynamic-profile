/**
 * GitHub API Raw Data Contract
 * Sesuai spesifikasi GitHub REST API v3
 */
export interface GitHubRawRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  topics?: string[];
  default_branch: string;
}

/**
 * Transformed Portfolio Project Entity
 * Digunakan untuk rendering komponen UI kartu proyek
 */
export interface PortfolioProject {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string;
  languageColor: string;
  topics: string[];
  updatedAt: string;
  formattedDate: string;
}

/**
 * GitHub User Profile Info
 */
export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

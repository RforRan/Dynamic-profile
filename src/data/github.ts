import type { GitHubRawRepo, PortfolioProject, GitHubUserProfile } from '../types/github';
import fallbackRepos from './fallback-repos.json';

const GITHUB_USERNAME = process.env.PUBLIC_GITHUB_USERNAME || 'RforRan';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Pemetaan warna bahasa pemrograman resmi GitHub
 */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Astro: '#ff5d01',
  HTML: '#e34f26',
  CSS: '#1572b6',
  Python: '#3776ab',
  Rust: '#dea584',
  Go: '#00add8',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Dart: '#00b4ab',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  Vue: '#41b883',
  Shell: '#89e051',
  Markdown: '#083fa1',
};

/**
 * Format tanggal ISO ke format ringkas (e.g. "Nov 2026")
 */
function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

/**
 * Data Fetching Engine (Build-Time Execution)
 * Memanggil GitHub REST API v3 dengan mekanisme Graceful Degradation
 */
export async function fetchGitHubProjects(): Promise<{
  projects: PortfolioProject[];
  isFallback: boolean;
  totalCount: number;
}> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Dynamic-Developer-Portfolio-Astro-Engine',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 detik timeout

    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(
        `[Build Warning] GitHub API returned status ${response.status} (${response.statusText}). Mengaktifkan graceful fallback.`
      );
      return {
        projects: fallbackRepos as PortfolioProject[],
        isFallback: true,
        totalCount: fallbackRepos.length,
      };
    }

    const rawRepos: GitHubRawRepo[] = await response.json();

    if (!Array.isArray(rawRepos)) {
      console.warn('[Build Warning] Format respons GitHub bukan array. Mengaktifkan graceful fallback.');
      return {
        projects: fallbackRepos as PortfolioProject[],
        isFallback: true,
        totalCount: fallbackRepos.length,
      };
    }

    // FR-2: Data Filtering & Sorting Logic
    const filtered = rawRepos.filter((repo) => !repo.fork);

    // Sort: Stars (descending) -> Tie breaker: Updated At (descending)
    const sorted = filtered.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    // Batasi ke 100 repositori teratas
    const sliced = sorted.slice(0, 100);

    // Transformasi ke entity PortfolioProject
    const projects: PortfolioProject[] = sliced.map((repo) => {
      const lang = repo.language || 'Plain Text';
      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description?.trim() || 'No description provided for this repository.',
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        primaryLanguage: lang,
        languageColor: LANGUAGE_COLORS[lang] || '#94a3b8',
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        formattedDate: formatDate(repo.updated_at),
      };
    });

    return {
      projects,
      isFallback: false,
      totalCount: projects.length,
    };
  } catch (error) {
    console.warn(
      `[Build Resiliency] Kegagalan saat fetch data GitHub: ${(error as Error).message}. Menggunakan fallback lokal.`
    );
    return {
      projects: fallbackRepos as PortfolioProject[],
      isFallback: true,
      totalCount: fallbackRepos.length,
    };
  }
}

/**
 * Fetch profil ringkas pemilik repositori
 */
export async function fetchGitHubProfile(): Promise<GitHubUserProfile> {
  const fallbackProfile: GitHubUserProfile = {
    login: GITHUB_USERNAME,
    name: 'Randi',
    avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    bio: 'Software Engineer & Fullstack Developer passionate about high-performance Jamstack, web GIS, and open source.',
    public_repos: 10,
    followers: 0,
    following: 0,
  };

  const url = `https://api.github.com/users/${GITHUB_USERNAME}`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Dynamic-Developer-Portfolio-Astro-Engine',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        login: data.login || GITHUB_USERNAME,
        name: data.name || data.login || 'Randi',
        avatar_url: data.avatar_url || fallbackProfile.avatar_url,
        html_url: data.html_url || fallbackProfile.html_url,
        bio: data.bio || fallbackProfile.bio,
        public_repos: data.public_repos ?? fallbackProfile.public_repos,
        followers: data.followers ?? 0,
        following: data.following ?? 0,
      };
    }
  } catch {
    // Ignore error and return fallback
  }

  return fallbackProfile;
}


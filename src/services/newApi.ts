import axios from 'axios';
import type {TopHeadlinesResponse, Article} from '../types/news';
import {NEWS_API_KEY} from '@env';

export const api = axios.create({baseURL: 'https://newsapi.org/v2'});

api.interceptors.request.use(cfg => {
  cfg.params = {...(cfg.params || {}), apiKey: NEWS_API_KEY};
  return cfg;
});

export type Category = 'all' | 'technology' | 'sports' | 'politics';

export interface FetchParams {
  page: number;
  pageSize: number;
  q?: string;
  category?: Category;
  country?: string;
}

const DEFAULT_COUNTRY = 'us';

const POLITICS_RE = new RegExp(
  [
    'politic',
    'government',
    'election',
    'vote',
    'voting',
    'parliament',
    'congress',
    'senate',
    'minister',
    'ministry',
    'policy',
    'prime minister',
    'president',
    'white house',
    'kremlin',
    'дума',
    'правительств',
    'выбор',
    'парламент',
    'сенат',
    'президент',
    'министр',
    'политик',
  ].join('|'),
  'i',
);

const looksPolitical = (a: Article) => {
  const hay = `${a.title ?? ''} ${a.description ?? ''} ${a.content ?? ''}`;
  return POLITICS_RE.test(hay);
};

const filterPoliticsClient = (arts: Article[]) => arts.filter(looksPolitical);

const buildParams = ({
  page,
  pageSize,
  q,
  category,
  country = DEFAULT_COUNTRY,
}: FetchParams) => {
  const params: Record<string, string | number> = {page, pageSize, country};
  const baseQ = (q ?? '').trim();

  if (category && category !== 'all' && category !== 'politics') {
    params.category = category;
  }
  if (baseQ) {
    params.q = baseQ;
  }

  return params;
};

const fetchPoliticsEverything = async (
  page: number,
  pageSize: number,
  q?: string,
) => {
  const query = (q?.trim() ? `${q.trim()} ` : '') + 'politics';
  const res = await api.get<TopHeadlinesResponse>('/everything', {
    params: {
      q: query,
      page,
      pageSize,
      sortBy: 'publishedAt',

      language: 'ru',
    },
  });
  return res.data.articles ?? [];
};

export const fetchTopHeadlines = async (p: FetchParams) => {
  if (!NEWS_API_KEY) {
    throw new Error('NEWS_API_KEY is missing');
  }

  if (p.category === 'politics') {
    const top = await api.get<TopHeadlinesResponse>('/top-headlines', {
      params: {
        country: p.country ?? DEFAULT_COUNTRY,
        page: p.page,
        pageSize: p.pageSize,
      },
    });

    let articles = filterPoliticsClient(top.data.articles ?? []);

    if (articles.length < p.pageSize) {
      const extra = await fetchPoliticsEverything(p.page, p.pageSize, p.q);

      const seen = new Set(articles.map(a => a.url));
      const merged = [
        ...articles,
        ...extra.filter(a => a.url && !seen.has(a.url)),
      ];
      articles = merged.slice(0, p.pageSize);
    }

    return {
      status: 'ok',
      totalResults: articles.length,
      articles,
    } as TopHeadlinesResponse;
  }

  const res = await api.get<TopHeadlinesResponse>('/top-headlines', {
    params: buildParams(p),
  });
  return res.data;
};

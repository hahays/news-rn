import {useCallback, useEffect, useRef, useState} from 'react';
import type {Article} from '../types/news';
import {Category, fetchTopHeadlines} from '../services/newApi';

const PAGE_SIZE = 10;

export const useNewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState('');
  const [pendingQuery, setPendingQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inFlight = useRef(false);

  const load = useCallback(
    async (mode: 'init' | 'more' | 'refresh') => {
      if (inFlight.current) {
        return;
      }
      inFlight.current = true;

      try {
        setError(null);
        if (mode === 'init') {
          setLoading(true);
        }
        if (mode === 'more') {
          setLoadingMore(true);
        }
        if (mode === 'refresh') {
          setRefreshing(true);
        }

        const nextPage = mode === 'more' ? page + 1 : 1;
        const data = await fetchTopHeadlines({
          page: nextPage,
          pageSize: PAGE_SIZE,
          q: query || undefined,
          category,
          country: 'us',
        });

        setTotal(data.totalResults ?? 0);
        setPage(nextPage);
        setArticles(prev =>
          nextPage === 1 ? data.articles : [...prev, ...data.articles],
        );
      } catch (e: any) {
        setError(e?.message ?? 'Unknown error');
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
        inFlight.current = false;
      }
    },
    [page, query, category],
  );

  useEffect(() => {
    load('init');
  }, [category, load]);

  const canLoadMore = articles.length < total;

  const onSearchPress = () => {
    setQuery(pendingQuery.trim());
    setTimeout(() => load('init'));
  };

  const onChangeCategory = (c: Category) => {
    setCategory(c);
    setQuery('');
    setPendingQuery('');
  };

  return {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    onRetry: () => load('init'),
    onRefresh: () => load('refresh'),
    loadMore: () => canLoadMore && load('more'),
    canLoadMore,
    pendingQuery,
    setPendingQuery,
    onSearchPress,
    category,
    onChangeCategory,
  };
};

import type {Article} from '../types/news';

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetail: {article: Article};
};

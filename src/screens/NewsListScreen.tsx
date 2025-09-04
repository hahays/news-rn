import React from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type {Article} from '../types/news';
import {ArticleCard} from '../components/ArticleCard';
import {useNewsFeed} from '../hooks/useNewsFeed';

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};
`;
const Header = styled.View`
  padding: ${({theme}) => theme.spacing(1)}px;
  gap: ${({theme}) => theme.spacing(1)}px;
`;
const SearchRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;
const Input = styled(TextInput)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.card};
  color: ${({theme}) => theme.colors.text};
  border-radius: ${({theme}) => theme.radius.md}px;
  padding: 12px;
  border: 1px solid ${({theme}) => theme.colors.divider};
`;
const Button = styled(TouchableOpacity)`
  background-color: ${({theme}) => theme.colors.primary};
  padding: 12px 16px;
  border-radius: ${({theme}) => theme.radius.md}px;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: #001815;
  font-weight: 700;
`;
const Chips = styled.View`
  flex-direction: row;
  gap: 8px;
`;
const Chip = styled(TouchableOpacity)<{active?: boolean}>`
  padding: 8px 12px;
  border-radius: 999px;
  background-color: ${({theme, active}) =>
    active ? theme.colors.primary : theme.colors.chip};
  border: 1px solid ${({theme}) => theme.colors.divider};
`;
const ChipText = styled.Text<{active?: boolean}>`
  color: ${({theme, active}) => (active ? '#001815' : theme.colors.text)};
  font-size: 12px;
  font-weight: 700;
`;
const ErrorBox = styled.View`
  padding: 24px;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
const ErrorText = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;
const Retry = styled(Button)``;
const ListWrap = styled.View`
  flex: 1;
  padding: 0 ${({theme}) => theme.spacing(1)}px;
`;

const categories = [
  {key: 'all', label: 'Все'},
  {key: 'technology', label: 'Технологии'},
  {key: 'sports', label: 'Спорт'},
  {key: 'politics', label: 'Политика'},
] as const;

export const NewsListScreen: React.FC<any> = ({navigation}) => {
  const {
    articles,
    loading,
    loadingMore,
    refreshing,
    error,
    onRetry,
    onRefresh,
    loadMore,
    canLoadMore,
    pendingQuery,
    setPendingQuery,
    onSearchPress,
    category,
    onChangeCategory,
  } = useNewsFeed();

  const renderItem = ({item}: ListRenderItemInfo<Article>) => (
    <ArticleCard
      article={item}
      onPress={() => navigation.navigate('NewsDetail', {article: item})}
    />
  );

  return (
    <Screen>
      <Header>
        <SearchRow>
          <Input
            placeholder="Поиск по заголовкам…"
            placeholderTextColor="#64748b"
            value={pendingQuery}
            onChangeText={setPendingQuery}
            returnKeyType="search"
            onSubmitEditing={onSearchPress}
          />
          <Button onPress={onSearchPress}>
            <ButtonText>Поиск</ButtonText>
          </Button>
        </SearchRow>

        <Chips>
          {categories.map(c => (
            <Chip
              key={c.key}
              active={category === c.key}
              onPress={() => onChangeCategory(c.key as any)}>
              <ChipText active={category === c.key}>{c.label}</ChipText>
            </Chip>
          ))}
        </Chips>
      </Header>

      {error ? (
        <ErrorBox>
          <ErrorText>Ошибка: {error}</ErrorText>
          <Retry onPress={onRetry}>
            <ButtonText>Повторить</ButtonText>
          </Retry>
        </ErrorBox>
      ) : (
        <ListWrap>
          {loading && !refreshing ? (
            <ActivityIndicator style={{marginTop: 16}} />
          ) : (
            <FlatList
              data={articles}
              keyExtractor={(it, idx) => it.url + idx}
              renderItem={renderItem}
              onEndReachedThreshold={0.5}
              onEndReached={() => (canLoadMore ? loadMore() : undefined)}
              ListFooterComponent={
                loadingMore ? (
                  <ActivityIndicator style={{marginVertical: 16}} />
                ) : (
                  <View />
                )
              }
              refreshControl={
                <RefreshControl
                  tintColor="#2dd4bf"
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          )}
        </ListWrap>
      )}
    </Screen>
  );
};
